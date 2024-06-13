import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ items, title }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const isDragging = useRef(false);
    const [itemsToShow, setItemsToShow] = useState(4); // Número inicial de itens visíveis

    // Definindo quantos itens mostrar com base no tamanho da tela
    const updateItemsToShow = () => {
        if (window.innerWidth >= 1024) {
            setItemsToShow(4); // Desktop
        } else if (window.innerWidth >= 768) {
            setItemsToShow(3); // Tablet
        } else {
            setItemsToShow(1); // Mobile
        }
    };

    useEffect(() => {
        // Atualiza o número de itens visíveis quando a tela for redimensionada
        const handleResize = () => {
            updateItemsToShow();
        };
        window.addEventListener('resize', handleResize);
        // Define o número inicial de itens visíveis
        updateItemsToShow();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDragStart = (clientX) => {
        setDragging(true);
        setDragStartX(clientX);
        setStartIndex(currentIndex);
        isDragging.current = true;
    };

    const handleDragMove = (clientX) => {
        if (isDragging.current) {
            const dragDistance = clientX - dragStartX;
            const itemWidth = carouselRef.current.clientWidth / itemsToShow;
            const itemsDragged = Math.round(dragDistance / itemWidth);
            setCurrentIndex(startIndex - itemsDragged);
        }
    };

    const handleDragEnd = () => {
        if (isDragging.current) {
            setDragging(false);
            isDragging.current = false;
            // Verifica se currentIndex está fora dos limites e ajusta se necessário
            const maxIndex = items.length - itemsToShow;
            if (currentIndex < 0) {
                setCurrentIndex(0);
            } else if (currentIndex > maxIndex) {
                setCurrentIndex(maxIndex);
            }
        }
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX);
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        handleDragMove(touch.clientX);
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    const renderTitleWithEmphasis = (title) => {
        const parts = title.split("(Em Breve)");
        return (
            <h3 className="text-lg text-white font-bold text-center sm:text-left">
                {parts[0]}<span className="text-purple-500">(Em Breve)</span>{parts[1]}
            </h3>
        );
    };

    return (
        <div
            ref={carouselRef}
            className="relative w-full overflow-hidden mt-4"
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
        >
            {renderTitleWithEmphasis(title)}
            <div
                className="flex transition-transform duration-300"
                style={{
                    transform: `translateX(-${(Math.min(currentIndex, items.length - itemsToShow) / itemsToShow) * 100}%)`
                }}
            >
                {items.map((item, index) => (
                    <div key={index} className={`w-1/${itemsToShow === 1 ? 1 : itemsToShow} gap-4`}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
