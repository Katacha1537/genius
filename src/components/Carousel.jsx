import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ items, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const carouselRef = useRef(null);
    const [itemsToShow, setItemsToShow] = useState(4);

    const itemWidth = window.innerWidth >= 768 ? 248 : 135;
    const itemHeight = window.innerWidth >= 768 ? null : 240;
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
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleDragMove = (clientX) => {
        if (dragging) {
            const dragDistance = clientX - dragStartX;
            setDragOffset(dragDistance);
        }
    };

    const handleDragEnd = () => {
        if (dragging) {
            setDragging(false);

            const totalItemWidth = itemWidth + itemSpacing;
            const itemsDragged = dragOffset / totalItemWidth;
            const newCurrentIndex = Math.round(currentIndex - itemsDragged);

            const maxIndex = Math.max(0, items.length - itemsToShow);
            const clampedIndex = Math.min(Math.max(newCurrentIndex, 0), maxIndex);

            setCurrentIndex(clampedIndex);
            setDragOffset(0);

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            handleDragMove(e.clientX);
        }
    };

    const handleMouseUp = () => {
        handleDragEnd();
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
            <div className='flex gap-2 items-center'>
                <h3 className="text-lg text-white font-bold text-left">
                    {parts.length === 1 ? `${parts[0]}` : (
                        <div>
                            {parts[0]} <span className="text-[#C4F400]">(Em Breve)</span>
                        </div>
                    )}
                </h3>
                <div className="md:flex md:gap-2 hidden">
                    <button
                        className="bg-[#83a00f] text-white p-2 rounded-full z-10"
                        onClick={() => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                    >
                        <FaChevronLeft size={10} />
                    </button>
                    <button
                        className="bg-[#83a00f] text-white p-2 rounded-full z-10"
                        onClick={() => setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - itemsToShow))}
                    >
                        <FaChevronRight size={10} />
                    </button>
                </div>
            </div>
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
            onMouseMove={(e) => dragging && handleMouseMove(e)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
                        className="absolute top-[58%] left-0 transform -translate-y-1/2 bg-[#83a00f] text-white p-2 rounded-full z-10"
                        onClick={() => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                    >
                        <FaChevronLeft />
                    </button>
                )}
                {currentIndex < items.length - itemsToShow && (
                    <button
                        className="absolute top-[58%] right-0 transform -translate-y-1/2 bg-[#83a00f] text-white p-2 rounded-full z-10"
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
