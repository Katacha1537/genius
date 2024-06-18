"use client"
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function finishSignUp({ searchParams: { authKey } }) {
    const { completeLogin, error, isPending } = useLogin()
    const navigate = useRouter()

    useEffect(async () => {
        const completed = await completeLogin(authKey)
        navigate.push(completed)
    }, [])


    return (
        <div>
            <h1 className='bg-[#0B060F] w-full h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>
                <p>Carregando...</p>
            </h1>
        </div>
    )
}
