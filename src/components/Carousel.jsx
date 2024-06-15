import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ items, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const carouselRef = useRef(null);
    const [itemsToShow, setItemsToShow] = useState(4);

    const itemWidth = window.innerWidth >= 768 ? 248 : 150;
    const itemHeight = window.innerWidth >= 768 ? null : 250;
    const itemSpacing = 16;

    const updateItemsToShow = () => {
        if (window.innerWidth >= 1024) {
            setItemsToShow(4);
        } else if (window.innerWidth >= 768) {
            setItemsToShow(3);
        } else {
            setItemsToShow(1);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            updateItemsToShow();
        };
        window.addEventListener('resize', handleResize);
        updateItemsToShow();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDragStart = (clientX) => {
        setDragging(true);
        setDragStartX(clientX);
    };

    const handleDragMove = (clientX) => {
        if (dragging) {
            const dragDistance = clientX - dragStartX;
            setDragOffset(dragDistance);
        }
    };

    const handleDragEnd = () => {
        setDragging(false);

        const totalItemWidth = itemWidth + itemSpacing;
        const itemsDragged = dragOffset / totalItemWidth;
        const newCurrentIndex = Math.round(currentIndex - itemsDragged);

        const maxIndex = Math.max(0, items.length - itemsToShow);
        const clampedIndex = Math.min(Math.max(newCurrentIndex, 0), maxIndex);

        setCurrentIndex(clampedIndex);
        setDragOffset(0);
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
        const parts = title.split('(Em Breve)');
        return (
            <h3 className="text-lg text-white font-bold text-left">
                {parts.length === 1 ? `${parts[0]}` : (
                    <div>
                        {parts[0]} <span className="text-purple-500">(Em Breve)</span>
                    </div>
                )}
            </h3>
        );
    };

    return (
        <div
            ref={carouselRef}
            className="relative w-full overflow-hidden mt-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => dragging && handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
        >
            {renderTitleWithEmphasis(title)}
            <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                    transform: `translateX(-${currentIndex * (itemWidth + itemSpacing)}px) translateX(${dragOffset * 0.9}px)`
                }}
            >
                {items.map((item, index) => (
                    <div key={index} style={{ width: itemWidth, height: itemHeight, marginRight: itemSpacing }}>
                        {item}
                    </div>
                ))}
            </div>
            <div className="block md:hidden">
                {currentIndex > 0 && (
                    <button
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
                        onClick={() => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                    >
                        <FaChevronLeft />
                    </button>
                )}
                {currentIndex < items.length - itemsToShow && (
                    <button
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
                        onClick={() => setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - itemsToShow))}
                    >
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Carousel;
