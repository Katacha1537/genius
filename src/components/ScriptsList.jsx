"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './components.css';
import Link from "next/link";

// Carregar dinamicamente o Slider para garantir que só seja renderizado no cliente
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const ScriptsList = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    if (!isMounted) return null;

    return (
        <div className="relative">
            <h3 className="text-lg text-white font-bold text-center sm:text-left">
                Scripts (Em Breve)
            </h3>
            <Slider {...settings}>
                <InactiveCard imageUrl="/assets/scriptEcom.png" />
                <InactiveCard imageUrl="/assets/scriptEcom.png" />
                <InactiveCard imageUrl="/assets/scriptEcom.png" />
                <InactiveCard imageUrl="/assets/scriptEcom.png" />
                <InactiveCard imageUrl="/assets/scriptEcom.png" />
            </Slider>
        </div>
    );
};

const InactiveCard = ({ imageUrl }) => {
    return (
        <div className="relative mt-2 hover:cursor-not-allowed rounded-xl mb-2 h-[600px] md:h-[400px] w-[248px] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
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

export default ScriptsList;
