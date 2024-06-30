'use client'

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

import Carousel from "@/components/Carousel";
import CriadorProdutosEcom from "@/components/criadorProdutosEcom copy";
import Link from "next/link";
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

    const items = [
        <InactiveCard imageUrl={'/assets/scripts/chatecom.webp'} />,
        /*<div
            onClick={() => { navigate.push('/dashboard/scripts/chatecom') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/scripts/chatecom.webp')", backgroundSize: 'cover' }}
        />,*/
        <InactiveCard imageUrl={'/assets/scripts/zapecom.webp'} />,
        /*<div
            onClick={() => { navigate.push('/dashboard/scripts/zapecom') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/scripts/zapecom.webp')", backgroundSize: 'cover' }}
        />*/,
        <InactiveCard imageUrl={'/assets/scripts/vsl.webp'} />,
        /*<div
            onClick={() => { navigate.push('/dashboard/scripts/vsl') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/scripts/vsl.webp')", backgroundSize: 'cover' }}
        />,*/
        <InactiveCard imageUrl={'/assets/scripts/email.webp'} />,
        /*<div
            onClick={() => { navigate.push('/dashboard/scripts/email') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/scripts/email.webp')", backgroundSize: 'cover' }}
        />,*/
    ]

    const itemsGeradores = [
        <div
            onClick={() => { navigate.push('/dashboard/gerador/quebra-de-objecao') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/quebra-objecao.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/beneficios') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/beneficios.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/headline') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/headline.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/faq') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/faq.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/aida') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/aida.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/pas') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/pas.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/persona') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/personas-faq.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/persona-por-nicho') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/personas-por-nicho.webp')", backgroundSize: 'cover' }}
        />,
        <div
            onClick={() => { navigate.push('/dashboard/gerador/analogias') }}
            className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
            style={{ backgroundImage: "url('/assets/geradores/analogias.webp')", backgroundSize: 'cover' }}
        />,
    ]
    const itemsMentoria = [
        <Link href='/mentoria' prefetch={false}>
            <div
                className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
                style={{ backgroundImage: "url('/assets/mentoriaEcom.webp')", backgroundSize: 'cover' }}
            />
        </Link>,
        <Link href='/dashboard/experts' prefetch={false}>
            <div
                className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[230px] w-[135px] md:h-[450px] md:w-[248px]"
                style={{ backgroundImage: "url('/assets/expertEcom.webp')", backgroundSize: 'cover' }}
            />
        </Link>
        ,
        <span className="hidden"></span>
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
                    <div className="p-6 pt-4 pb-[120px]">
                        <CriadorProdutosEcom />
                        <Carousel items={itemsMentoria} title="MENTORIA ECOM" />
                        <Carousel items={itemsGeradores} title="GERADOR DE CONVERSÃO" />
                        <Carousel items={items} title="SCRIPTS DE VENDAS" />
                    </div>
                </div>
            </div >
        );
};

export default Dashboard;

const InactiveCard = ({ imageUrl }) => {
    return (
        <div className="relative mt-2 rounded-xl mb-2 md:mr-4 h-[230px] w-[135px] md:h-[450px] md:w-[248px] bg-cover bg-center"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'contain'  // Ajuste para conter a imagem no mobile
            }}>
            <div className="absolute inset-0 bg-[#000] opacity-60 rounded-xl"></div> {/* Camada semi-transparente */}
            <div className="absolute top-3 right-4 bg-[#C4F400] text-gray-800 text-[10px] px-4 py-2 text-xs rounded-full z-10 opacity-100">
                Em breve
            </div>
            <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                boxShadow: 'inset 0 0 15px 5px rgba(196, 244, 0, 0.5)'
            }}></div> {/* Sombra interna */}
        </div>
    );
}
