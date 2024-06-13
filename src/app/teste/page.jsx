'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import { PiHouseLine } from "react-icons/pi"
import { IoSettingsOutline } from "react-icons/io5";

export default function Sidebar() {
    const pathname = usePathname();
    const isDashboard = pathname === '/teste';
    const isSettings = pathname === '/settings';

    return (
        <div className="bg-[#0B060F] h-screen w-64 flex flex-col">
            <div className='w-full flex justify-center items-center mt-5'>
                <img src="https://geniusecom.io/wp-content/uploads/2023/04/Logo-light.svg" alt="Logo" className="w-32 sm:w-40 mb-0 block" />
            </div>
            {/* Perfil do usuário */}
            <div className="p-4 mt-5">
                <img
                    src="https://avatars.githubusercontent.com/u/48217381?v=4"
                    alt="Lucas Katacha"
                    className="rounded-full border-2 border-purple-500 w-32 h-32 mx-auto mb-2"
                />
                <p className="text-white text-center font-bold">Lucas Katacha</p>
            </div>

            {/* Navegação */}
            <div className="flex flex-col flex-grow mt-4">
                {/* Links de navegação */}
                <a href="/" className="sidebar-link">
                    <p
                        className={`${isDashboard ? 'border-l-4 border-purple-500 bg-[#382f3f] text-purple-500' : 'border-t border-[#382f3f] text-white'} flex items-center gap-3  px-4 py-4   hover:text-white hover:bg-purple-500 hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
                    >
                        <PiHouseLine />
                        Início
                    </p>
                </a>
                <a href="/configuracoes" className="sidebar-link">
                    <p
                        className={`${isSettings ? 'border-l-4 border-purple-500 bg-[#382f3f] text-purple-500' : 'border-t border-[#382f3f] text-white'} flex items-center gap-3  px-4 py-4   hover:text-white hover:bg-purple-500 hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
                    >
                        <IoSettingsOutline />
                        Configurações
                    </p>
                </a>
            </div>

            {/* Rodapé */}
            <div className="mt-auto p-4">
                <p className="text-gray-400 text-xs text-center">
                    © 2024 Genius.
                </p>
                <p className="text-gray-400 text-xs text-center">
                    Todos os direitos reservados.
                </p>
            </div>
        </div >
    );
}
