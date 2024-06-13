"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './components.css';
import Link from "next/link";

// Carregar dinamicamente o Slider para garantir que só seja renderizado no cliente
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const ProductList = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
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
                <div className="p-2 hover:cursor-pointer">
                    <div className="rounded-xl mb-2 bg-[url('/assets/criadorEcom.png')] bg-cover w-auto h-[600px] md:h-[400px]" />
                </div>
                <div className="p-2 hover:cursor-pointer">
                    <div className="rounded-xl mb-2 bg-[url('/assets/mentoriaEcom.png')] bg-cover w-auto h-[600px] md:h-[400px]" />
                </div>
                <div className="p-2 hover:cursor-pointer">
                    <div className="rounded-xl mb-2 bg-[url('/assets/scriptEcom.png')] bg-cover w-auto h-[600px] md:h-[400px]" />
                </div>
                <div className="p-2 hover:cursor-pointer">
                    <div className="rounded-xl mb-2 bg-[url('/assets/geradoresEcom.png')] bg-cover w-auto h-[600px] md:h-[400px]" />
                </div>
                <div className="p-2 hover:cursor-pointer">
                    <div className="rounded-xl mb-2 bg-[url('/assets/expertEcom.png')] bg-cover w-auto h-[600px] md:h-[400px]" />
                </div>
            </Slider>
        </div>
    );
};

export default ProductList;
