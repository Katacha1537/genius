"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './components.css';
import Link from "next/link";


const Carousel = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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

    if (!mounted) return null;

    return (
        <div className="relative mt-4">
            <h3 className="text-lg text-white font-bold text-center sm:text-left">Produtos disponíveis</h3>
            <Slider {...settings}>
                < div className="p-2 hover:cursor-pointer">
                    <Link href="/criador-de-produtos">
                        <div className="bg-transparent p-4 border-2 border-[#afafaf2f] rounded-md shadow hover:shadow-lg transition-shadow duration-300">
                            <div className="rounded mb-2 bg-[url('/assets/gerador1.svg')] bg-cover w-auto h-[173px]" />
                            <p className="text-[#e0e0e0] text-center titleForm">Criador de Produtos</p>
                        </div>
                    </Link>
                </div>
                < div className="p-2 hover:cursor-not-allowed" >
                    <div className="bg-transparent p-4 border-2 border-[#afafaf2f] rounded-md shadow hover:shadow-lg transition-shadow duration-300">
                        <div className="rounded mb-2 bg-[url('/assets/bloqueado.svg')] bg-cover w-auto h-[173px]" />
                        <p className="text-[#e0e0e0] text-center titleForm">EM BREVE</p>
                    </div>
                </div>
                < div className="p-2 hover:cursor-not-allowed" >
                    <div className="bg-transparent p-4 border-2 border-[#afafaf2f] rounded-md shadow hover:shadow-lg transition-shadow duration-300">
                        <div className="rounded mb-2 bg-[url('/assets/bloqueado.svg')] bg-cover w-auto h-[173px]" />
                        <p className="text-[#e0e0e0] text-center titleForm">EM BREVE</p>
                    </div>
                </div>
                < div className="p-2 hover:cursor-not-allowed" >
                    <div className="bg-transparent p-4 border-2 border-[#afafaf2f] rounded-md shadow hover:shadow-lg transition-shadow duration-300">
                        <div className="rounded mb-2 bg-[url('/assets/bloqueado.svg')] bg-cover w-auto h-[173px]" />
                        <p className="text-[#e0e0e0] text-center titleForm">EM BREVE</p>
                    </div>
                </div>
            </Slider >
        </div >
    );
};

export default Carousel;
