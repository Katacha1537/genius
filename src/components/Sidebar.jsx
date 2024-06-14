'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PiHouseLine } from "react-icons/pi"
import { IoSettingsOutline } from "react-icons/io5";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useUserContext } from '@/contexts/UserContext';

export default function Sidebar() {
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const isSettings = pathname === '/dashboard/configuracoes';
    const emailStorage = typeof window !== 'undefined' ? localStorage.getItem('email') || '' : ''
    const initials = emailStorage ? emailStorage.substring(0, 2).toUpperCase() : ''

    const { rerender } = useUserContext()

    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userImage, setUserImage] = useState(`https://via.placeholder.com/350x350/5C0ACD/FFFFFF?text=${initials}`);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserName(userData.nome || emailStorage);
            setUserLastName(userData.sobrenome || '');
            setUserImage(userData.imageSrc || `https://via.placeholder.com/350x350/5C0ACD/FFFFFF?text=${initials}`);
        } else {
            const fetchUserData = async () => {
                try {
                    const docRef = doc(db, 'users', emailStorage);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUserName(userData.nome || emailStorage);
                        setUserLastName(userData.sobrenome || '');
                        setUserImage(userData.imageSrc || `https://via.placeholder.com/350x350/5C0ACD/FFFFFF?text=${initials}`);
                        localStorage.setItem('userData', JSON.stringify(userData));
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                }
            };

            fetchUserData();
        }
    }, [emailStorage, initials, rerender]);

    return (
        <div className="bg-[#0B060F] hidden md:block fixed h-screen w-64 min-w-64 flex flex-col justify-between border-r border-[#382f3f]">
            {rerender && <span className="hidden"></span>}
            {console.log(rerender)}
            <div className='w-full flex justify-center items-center mt-5'>
                <a href="/dashboard" className="sidebar-link">
                    <img src="https://geniusecom.io/wp-content/uploads/2023/04/Logo-light.svg" alt="Logo" className="w-32 sm:w-40 mb-0 block" />
                </a>
            </div>
            {/* Perfil do usuário */}
            <div className="p-4 mt-5">
                <img
                    src={userImage}
                    alt={userName}
                    className="rounded-full ring-purple-500 w-24 h-24 mx-auto mb-2 ring-2 cursor-pointer"
                />
                <p className="text-white text-sm text-center font-bold">{userName} {userLastName}</p>
            </div>

            {/* Navegação */}
            <div className="flex flex-col flex-grow mt-4">
                {/* Links de navegação */}
                <a href="/dashboard" className="sidebar-link">
                    <p
                        className={`${isDashboard ? 'border-l-4 border-purple-500 bg-[#382f3f] text-purple-500' : 'border-t border-[#382f3f] text-white'} flex items-center gap-3 px-4 py-4 hover:text-white hover:bg-purple-500 hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
                    >
                        <PiHouseLine />
                        Início
                    </p>
                </a>
                <a href="/dashboard/configuracoes" className="sidebar-link">
                    <p
                        className={`${isSettings ? 'border-l-4 border-purple-500 bg-[#382f3f] text-purple-500' : 'border-t border-b border-[#382f3f] text-white'} flex items-center gap-3 px-4 py-4 hover:text-white hover:bg-purple-500 hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
                    >
                        <IoSettingsOutline />
                        Configurações
                    </p>
                </a>
            </div>
        </div>
    );
}
