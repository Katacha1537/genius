import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useFirestore } from './useFirestore';

export const useDocument = (coll, id = null, additionalQuery = {}) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const { addDocument: logError } = useFirestore('errors');

  useEffect(() => {
    if (!coll) return;

    const fetchDocument = async () => {
      try {
        if (id) {
          const unsub = onSnapshot(doc(db, coll, id), (docSnapshot) => {
            if (docSnapshot.exists()) {
              setDocument({ ...docSnapshot.data(), id: docSnapshot.id });
              setError(null);
            } else {
              setError('Dados não encontrados.');
              setDocument(undefined);
            }
          }, (err) => {
            setError(err.message);
            logError({
              error: err.message,
              documentId: id,
              collection: coll,
              where: 'useDocument',
            });
          });
          return () => unsub();
        } else if (Object.keys(additionalQuery).length > 0) {
          const docRef = collection(db, coll);
          let q = query(docRef);

          for (const key in additionalQuery) {
            q = query(q, where(key, "==", additionalQuery[key]));
          }

          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            setDocument({ ...docData, id: querySnapshot.docs[0].id });
            setError(null);
          } else {
            setError('Dados não encontrados.');
            setDocument(undefined);
          }
        }
      } catch (err) {
        setError(err.message);
        logError({
          error: err.message,
          documentId: id,
          collection: coll,
          where: 'useDocument',
        });
      }
    };

    fetchDocument();
  }, [coll, id, JSON.stringify(additionalQuery)]);

  return { document, error };
};
