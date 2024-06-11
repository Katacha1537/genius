'use client'

import { useRouter } from "next/navigation";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import Section from "../components/Section";
import { useEffect, useState } from "react";



const Dashboard = () => {

    const navigate = useRouter()

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const handleRightClick = event => {
            event.preventDefault();
            return false;  // Adiciona return false para tentar reforçar o bloqueio.
        };

        const handleKeyDown = event => {
            if (['F12', 'I', 'C', 'J'].includes(event.key) && (event.ctrlKey && event.shiftKey)) {
                event.preventDefault();
                return false;  // Reforça a prevenção de default para teclas específicas.
            }
        };

        // Adiciona os listeners ao document
        document.addEventListener('contextmenu', handleRightClick);
        document.addEventListener('keydown', handleKeyDown);

        const detectDevToolsOpen = () => {
            const threshold = 160; // Defina um limiar de altura ou largura que você considera indicativo de DevTools abertas
            if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
                localStorage.removeItem('expiryDate')
                localStorage.removeItem('email')
                navigate.push('/'); // Redireciona para a página inicial ou qualquer outra página
            }
        };

        window.addEventListener('resize', detectDevToolsOpen);

        // Verifica a expiração do token
        const expiryDate = localStorage.getItem('expiryDate');
        if (expiryDate) {
            const currentDate = new Date();
            const expirationDate = new Date(expiryDate);
            if (currentDate > expirationDate) {
                localStorage.removeItem('expiryDate');
                localStorage.removeItem('email');
                navigate.push('/');
            }
        } else {
            navigate.push('/');
        }

        // Remove os listeners ao desmontar
        return () => {
            document.removeEventListener('contextmenu', handleRightClick);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', detectDevToolsOpen);
        };
    }, [navigate])

    if (!isClient) return <h1 className='bg-[#0B060F] w-screen h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>Carregando...</h1>;

    return (
        <div className="bg-[#0B060F] h-screen flex flex-col pb-10 sm:pb-0">
            <Header />
            <div className="flex-grow sm:bg-custom-gradient">
                <main className="p-12 pt-2 pb-2 flex flex-col justify-end h-full">
                    <Section />
                    <Carousel />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
