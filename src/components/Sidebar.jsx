'use client'
import { useUserContext } from '@/contexts/UserContext';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { PiHouseLine } from "react-icons/pi";

export default function Sidebar() {
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const isSettings = pathname === '/dashboard/configuracoes';
    const emailStorage = typeof window !== 'undefined' ? localStorage.getItem('email') || '' : ''
    const initials = emailStorage ? emailStorage.substring(0, 2).toUpperCase() : ''

    const { rerender } = useUserContext()

    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userImage, setUserImage] = useState(`https://via.placeholder.com/350x350/`);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserName(userData.nome || emailStorage);
            setUserLastName(userData.sobrenome || '');
            setUserImage(userData.imageSrc || `https://via.placeholder.com/350x350/`);
        } else {
            const fetchUserData = async () => {
                try {
                    const docRef = doc(db, 'users', emailStorage);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUserName(userData.nome || emailStorage);
                        setUserLastName(userData.sobrenome || '');
                        setUserImage(userData.imageSrc || `https://via.placeholder.com/350x350/`);
                        localStorage.setItem('userData', JSON.stringify(userData));
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                }
            };

            fetchUserData();
        }
    }, [emailStorage, initials, rerender]);

    const getColor = (letter) => {
        const charCode = letter.toUpperCase().charCodeAt(0) - 64;
        if (charCode >= 1 && charCode <= 5) return '1D4FD8';
        if (charCode >= 6 && charCode <= 10) return 'ffa925';
        if (charCode >= 11 && charCode <= 15) return '7D23CE';
        if (charCode >= 16 && charCode <= 20) return '168142';
        return 'bg-red-700';
    };

    const backgroundColor = emailStorage ? getColor(emailStorage.charAt(0)) : 'bg-gray-300';

    return (
        <div className="bg-[#110E0F] hidden md:block fixed h-screen w-64 min-w-64 flex flex-col justify-between border-r border-[#382f3f]">
            {rerender && <span className="hidden"></span>}
            <div className='w-full flex justify-center items-center mt-5'>
                <a href="/dashboard" className="sidebar-link">
                    <img src="https://i.postimg.cc/NMPbb670/Logo-light.png" alt="Logo" className="w-32 sm:w-40 mb-0 block" />
                </a>
            </div>
            {/* Perfil do usuário */}
            <div className="p-4 mt-5">
                <img
                    src={`${userImage}${backgroundColor}/FFFFFF?text=${initials}`}
                    alt={initials}
                    className="rounded-full ring-[#C4F400] w-24 h-24 mx-auto mb-2 ring-2 cursor-pointer"
                />
                <p className="text-white text-sm text-center font-bold">{userName} {userLastName}</p>
            </div>

            {/* Navegação */}
            <div className="flex flex-col flex-grow mt-4">
                {/* Links de navegação */}
                <a href="/dashboard" className="sidebar-link">
                    <p
                        className={`${isDashboard ? 'border-l-4 border-[#C4F400] bg-[#3b3f2f] text-[#C4F400]' : 'border-t border-[#3b3f2f] text-white'} flex items-center gap-3 px-4 py-4 hover:text-white hover:bg-[#C4F400] hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
                    >
                        <PiHouseLine />
                        Início
                    </p>
                </a>
                <a href="/dashboard/configuracoes" className="sidebar-link">
                    <p
                        className={`${isSettings ? 'border-l-4 border-[#C4F400] bg-[#3b3f2f] text-[#C4F400]' : 'border-t border-b border-[#3b3f2f] text-white'} flex items-center gap-3 px-4 py-4 hover:text-white hover:bg-[#C4F400] hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
                    >
                        <IoSettingsOutline />
                        Configurações
                    </p>
                </a>
            </div>
        </div>
    );
}
