// pages/finishSignUp.js
'use client'
import ToastManager from '@/components/ToastManager';
import { useLogin } from '@/hooks/useLogin'; // Certifique-se de que o caminho para useLogin está correto
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FinishSignUp({ params }) {
    const { completeLogin } = useLogin();
    const navigation = useRouter();

    const [toasts, setToasts] = useState([]);
    const [email, setEmail] = useState(decodeURIComponent(params.mail));
    const [emailNotFound, setEmailNotFound] = useState(false);

    const addToast = (message, type) => {
        setToasts([...toasts, { message, type, id: Date.now() }]);
    };

    const removeToast = id => {
        setToasts(toasts.filter(toast => toast.id !== id));
    };

    const handleCompleteLogin = async (authKey, email) => {
        try {
            addToast('Analisando Token', 'info');
            const completed = await completeLogin(authKey, email);
            addToast(completed.messageReturn, completed.typeMessage);
            navigation.push(completed.pathReturn);
        } catch (err) {
            addToast('Token Inválido', 'error');
            console.error('Erro ao completar login:', err);
            navigation.push('/');
        }
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setEmailNotFound(false); // Reset the state
        handleCompleteLogin(params.authKey, email);
    };

    useEffect(() => {
        const authKey = params.authKey;

        if (authKey) {
            if (email) {
                handleCompleteLogin(authKey, email);
            } else {
                setEmailNotFound(true);
                addToast('Email não encontrado', 'error');
                setTimeout(() => {
                    console.log('5 seconds passed');
                }, 5000);
            }
        } else {
            navigation.push('/');
        }
    }, [email]);

    return (
        <div className="bg-[#110E0F] w-full h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center">
            {emailNotFound ? (
                <form onSubmit={handleEmailSubmit}>
                    <p>Email não encontrado. Por favor, insira seu email:</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black"
                        required
                    />
                    <button type="submit" className="bg-[#C4F400] text-white px-4 py-2 mt-2">
                        Enviar
                    </button>
                </form>
            ) : (
                <p>Carregando...</p>
            )}
            <ToastManager toasts={toasts} removeToast={removeToast} />
        </div>
    );
}
