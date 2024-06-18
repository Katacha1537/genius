// pages/finishSignUp.js
'use client'
import { useEffect, useState } from 'react';
import { useLogin } from '@/hooks/useLogin'; // Certifique-se de que o caminho para useLogin está correto
import { useRouter } from 'next/navigation';
import ToastManager from '@/components/ToastManager';

export default function FinishSignUp({ params }) {
    const { completeLogin } = useLogin();
    const navigation = useRouter();

    const [toasts, setToasts] = useState([]);

    const addToast = (message, type) => {
        setToasts([...toasts, { message, type, id: Date.now() }]);
    };

    const removeToast = id => {
        setToasts(toasts.filter(toast => toast.id !== id));
    }

    useEffect(() => {
        console.log('searchParams:', params); // Verifique se searchParams está definido aqui
        const authKey = params.authKey;
        console.log(authKey)
        const handleCompleteLogin = async () => {
            try {
                addToast('Analizando Token', 'info')
                const completed = await completeLogin(authKey);
                addToast('Token Aprovado', 'success')
                navigation.push(completed);
            } catch (err) {
                addToast('Token Invalido', 'error')
                console.error('Erro ao completar login:', err);
                navigation.push('/');
            }
        };

        if (authKey) {
            handleCompleteLogin();
        }
    }, []);

    return (
        <div>
            <h1 className='bg-[#0B060F] w-full h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>
                <p>Carregando...</p>
                <ToastManager toasts={toasts} removeToast={removeToast} />
            </h1>
        </div>
    );
}
