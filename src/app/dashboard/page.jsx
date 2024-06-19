'use client'

import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Section from "../../components/Section";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

import './page.css'
import CriadorProdutosEcom from "@/components/criadorProdutosEcom copy";
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

    const items = [
        <InactiveCard imageUrl="/assets/scripts/chatecom.webp" />,
        <InactiveCard imageUrl="/assets/scripts/zapecom.webp" />,
        <InactiveCard imageUrl="/assets/scripts/vsl.webp" />,
        <InactiveCard imageUrl="/assets/scripts/email.webp" />,
    ]

    const itemsGeradores = [
        <InactiveCard imageUrl="/assets/geradores/quebra-objecao.webp" />,
        <InactiveCard imageUrl="/assets/geradores/beneficios.webp" />,
        <InactiveCard imageUrl="/assets/geradores/headline.webp" />,
        <InactiveCard imageUrl="/assets/geradores/faq.webp" />,
        <InactiveCard imageUrl="/assets/geradores/aida.webp" />,
        <InactiveCard imageUrl="/assets/geradores/pas.webp" />,
        <InactiveCard imageUrl="/assets/geradores/personas-faq.webp" />,
        <InactiveCard imageUrl="/assets/geradores/personas-por-nicho.webp" />,
        <InactiveCard imageUrl="/assets/geradores/analogias.webp" />,
    ]
    const itemsMentoria = [
        <div onClick={() => { navigate.push('/mentoria') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-[url('/assets/mentoriaEcom.webp')] bg-cover h-[240px] w-[150px] md:h-[400px] md:w-[248px]" />,
        <div onClick={() => { navigate.push('/dashboard/experts') }} className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-[url('/assets/expertEcom.webp')] bg-cover h-[240px] w-[150px] md:h-[400px] md:w-[248px]" />,
        <span className="hidden"></span>
    ]



    return !isClient
        ?
        <h1 className='bg-[#0B060F] w-full h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>Carregando...</h1>
        :
        (
            <div className="bg-[#0B060F] flex h-screen pb-10 sm:pb-0 container-overflow">
                <Sidebar />

                <div className="w-full ml-0 md:ml-[255px]">
                    <Header />
                    <div className="p-6 pt-4 pb-2">
                        <CriadorProdutosEcom />
                        <Carousel items={itemsMentoria} title="MENTORIA ECOM" />
                        <Carousel items={items} title="SCRIPTS DE VENDAS" />
                        <Carousel items={itemsGeradores} title="GERADOR DE CONVERSÃO" />
                    </div>
                </div>
            </div >
        );
};

export default Dashboard;

const InactiveCard = ({ imageUrl }) => {
    return (
        <div className="relative mt-2 rounded-xl mb-2 md:mr-4 h-[240px] w-[150px] md:h-[400px] md:w-[248px] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="absolute inset-0 bg-[#000] opacity-60 rounded-xl"></div> {/* Camada semi-transparente */}
            <div className="absolute top-3 right-4 bg-purple-600 text-white text-[10px] px-4 py-2 text-xs rounded-full z-10 opacity-100">
                Em breve
            </div>
            <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                boxShadow: 'inset 0 0 15px 5px rgba(128, 90, 213, 0.5)'
            }}></div> {/* Sombra interna */}
        </div>
    );
}