'use client'

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";

import Carousel from "@/components/Carousel";
import './page.css';

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
                localStorage.removeItem('sessionValidityPeriod')
                localStorage.removeItem('email')
                navigate.push('/'); // Redireciona para a página inicial ou qualquer outra página
            }
        };

        window.addEventListener('resize', detectDevToolsOpen);

        // Verifica a expiração do token
        const expiryDate = localStorage.getItem('sessionValidityPeriod');
        if (expiryDate) {
            const currentDate = new Date();
            const expirationDate = new Date(expiryDate);
            if (currentDate > expirationDate) {
                localStorage.removeItem('sessionValidityPeriod');
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

    const itemsMentoria = [
        <div onClick={() => { navigate.push('/dashboard/experts/contigencia') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/contigencia.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/espionagem') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/espionagem.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/estrategias') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/estrategia.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/facebook-ads') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/facebookads.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/funil-de-vendas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/funildevendas.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/google-e-youtube-adsm') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/googleeyoutube.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/kwai-ads') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/kwai.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/pagina-de-vendas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/pagvendas.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/recuperacao-de-vendas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/recvendas.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/vsl') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/vsl.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/copywriting') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/copywriting.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/criativos') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/criativos.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/dropshipping') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/dropshipping.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/encapsulado') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/encapsulado.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/ferramentas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/ferramentas.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/hot') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/hot.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/igaming') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/igaming.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/latam') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/latam.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/tiktok') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/tiktok.webp')", backgroundSize: 'cover' }} />,
        <div onClick={() => { navigate.push('/dashboard/experts/typebot') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 md:ml-3 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]" style={{ backgroundImage: "url('/assets/experts/typebot.webp')", backgroundSize: 'cover' }} />,
    ];




    return !isClient
        ?
        <h1 className='bg-[#110E0F] w-full h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>Carregando...</h1>
        :
        (
            <div className="bg-[#110E0F] flex h-screen pb-10 sm:pb-0 container-overflow">
                <Sidebar />

                <div className="w-full ml-0 md:ml-[255px]">
                    <Header />
                    <div className="p-6 pt-4 pb-2">
                        <Carousel items={itemsMentoria} title="EXPERT'S I.A" />
                    </div>
                </div>
            </div >
        );
};

export default Dashboard;