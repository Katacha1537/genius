import { useState, useEffect, useRef } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { v4 as uuid } from 'uuid';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const isCancelled = useRef(false);

  const login = async (email) => {
    setError(null);
    setIsPending(true);
    try {
      let user = await fetchFirebaseUser(email);
      if (!user) {
        const userCreated = await createFirebaseUser(email);
        if (!userCreated) {
          setError('Erro ao criar usuário no banco de dados.');
          setIsPending(false);
          return;
        }
        user = { email };
      }

      const authKey = uuid();
      user.authKey = authKey;

      await setDoc(doc(db, 'users', email), user);

      window.localStorage.setItem('emailForSignIn', email);
      window.localStorage.setItem('email', email);

      const emailSend = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          authKey
        }),
      })

      if (emailSend) {
        setIsPending(false);
        setError(null);
      } else {
        setIsPending(false);
        setError('Erro ao enviar email');
        console.error('Erro ao enviar email');
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const createFirebaseUser = async (email) => {
    try {
      await setDoc(doc(db, 'users', email), { email });
      return true;
    } catch (error) {
      console.error('Erro ao criar usuário no Firebase:', error);
      return false;
    }
  };

  const fetchFirebaseUser = async (email) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', email));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('Erro ao buscar o usuário no Firebase:', error);
      return null;
    }
  };

  const removeAuthKey = async (email) => {
    try {
      const userRef = doc(db, 'users', email);
      await setDoc(userRef, { authKey: null }, { merge: true });
    } catch (error) {
      console.error('Erro ao remover authKey:', error);
    }
  };

  const completeLogin = async (authKey, email) => {
    setError(null);
    setIsPending(true);
    try {
      const user = await fetchFirebaseUser(email);
      if (user && user.authKey === authKey) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        localStorage.setItem('sessionValidityPeriod', expiryDate.toISOString());
        localStorage.removeItem('emailForSignIn')

        removeAuthKey(email)

        setIsPending(false);
        setError(null);

        return {
          pathReturn: '/dashboard',
          messageReturn: 'Token Aprovado',
          typeMessage: 'success'
        }
      } else {
        console.error('Chave de autenticação inválida');
        return {
          pathReturn: '/',
          messageReturn: 'Token Inválido',
          typeMessage: 'error'
        }
      }
    } catch (err) {
      if (!isCancelled.current) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return {
    login,
    completeLogin,
    error,
    isPending
  };
};
