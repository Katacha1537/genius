'use client'
import { usePathname } from 'next/navigation';
import { IoSettingsOutline } from "react-icons/io5";
import { PiHouseLine } from "react-icons/pi";

export default function Sidebar() {
    const pathname = usePathname();
    const isDashboard = pathname === '/teste';
    const isSettings = pathname === '/settings';

    return (
        <div className="bg-[#110E0F] h-screen w-64 flex flex-col">
            <div className='w-full flex justify-center items-center mt-5'>
                <img src="https://i.postimg.cc/NMPbb670/Logo-light.png" alt="Logo" className="w-32 sm:w-40 mb-0 block" />
            </div>
            {/* Perfil do usuário */}
            <div className="p-4 mt-5">
                <img
                    src="https://avatars.githubusercontent.com/u/48217381?v=4"
                    alt="Lucas Katacha"
                    className="rounded-full border-2 border-[#C4F400] w-32 h-32 mx-auto mb-2"
                />
                <p className="text-white text-center font-bold">Lucas Katacha</p>
            </div>

            {/* Navegação */}
            <div className="flex flex-col flex-grow mt-4">
                {/* Links de navegação */}
                <a href="/" className="sidebar-link">
                    <p
                        className={`${isDashboard ? 'border-l-4 border-[#C4F400] bg-[#382f3f] text-[#C4F400]' : 'border-t border-[#382f3f] text-white'} flex items-center gap-3  px-4 py-4   hover:text-white hover:bg-[#C4F400] hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
                    >
                        <PiHouseLine />
                        Início
                    </p>
                </a>
                <a href="/configuracoes" className="sidebar-link">
                    <p
                        className={`${isSettings ? 'border-l-4 border-[#C4F400] bg-[#382f3f] text-[#C4F400]' : 'border-t border-[#382f3f] text-white'} flex items-center gap-3  px-4 py-4   hover:text-white hover:bg-[#C4F400] hover:bg-opacity-20 cursor-pointer transition-colors duration-300`}
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
