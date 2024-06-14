'use client'

import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Section from "../../../components/Section";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

import './page.css'
import Carousel from "@/components/Carousel";
import Link from "next/link";

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

    const itemsMentoria = [
        <div onClick={() => { navigate.push('/dashboard/experts/contigencia') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-[url('/assets/experts/contigencia.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/espionagem') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/espionagem.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/estrategias') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/estrategia.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/facebook-ads') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/facebookads.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/funil-de-vendas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/funildevendas.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/google-e-youtube-adsm') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/googleeyoutube.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />, <div onClick={() => { navigate.push('/dashboard/experts/kwai-ads') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/kwai.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/pagina-de-vendas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/pagvendas.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/recuperacao-de-vendas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/recvendas.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/vsl') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/vsl.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,

        <div onClick={() => { navigate.push('/dashboard/experts/copywriting') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/copywriting.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/criativos') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/criativos.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/dropshipping') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/dropshipping.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/encapsulado') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/encapsulado.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/ferramentas') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/ferramentas.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/hot') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/hot.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/igaming') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/igaming.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/latam') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/latam.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/tiktok') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/tiktok.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts/typebot') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 ml-3 bg-[url('/assets/experts/typebot.webp')] bg-cover h-[600px] w-[350px] md:h-[400px] md:w-[248px]" />,
    ]



    return !isClient
        ?
        <h1 className='bg-[#0B060F] w-full h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>Carregando...</h1>
        :
        (
            <div className="bg-[#0B060F] flex h-screen pb-10 sm:pb-0 container-overflow">
                <Sidebar />

                <div className="w-full ml-0 md:ml-[19%]">
                    <Header />
                    <div className="p-6 pt-4 pb-2">
                        <Section titleUm='RESPOSTA MÁGICAS' titleDois='' />
                        <Carousel items={itemsMentoria} title="Agentes Monitores" />
                    </div>
                </div>
            </div >
        );
};

export default Dashboard;

const InactiveCard = ({ imageUrl }) => {
    return (
        <div className="relative mt-2 rounded-xl mb-2 mr-4 h-[600px] w-[350px] md:h-[400px] md:w-[248px] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="absolute inset-0 bg-[#000] opacity-60 rounded-xl"></div> {/* Camada semi-transparente */}
            <div className="absolute top-3 right-4 bg-purple-600 text-white text-xs px-4 py-2 rounded-full z-10 opacity-100">
                Em breve
            </div>
            <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                boxShadow: 'inset 0 0 15px 5px rgba(128, 90, 213, 0.5)'
            }}></div> {/* Sombra interna */}
        </div>
    );
}