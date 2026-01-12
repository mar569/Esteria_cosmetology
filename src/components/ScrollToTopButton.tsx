import React, { useState, useEffect } from 'react';
import { IoArrowUp } from 'react-icons/io5';


const ScrollToTopButton: React.FC = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 3200) {
            setShowScrollTop(true);
        } else {
            setShowScrollTop(false);
        }
    };

    const handleScrollToTop = () => {
        const heroElement = document.getElementById('hero');
        if (heroElement) {
            heroElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            className={`scroll-to-top-btn cursor-pointer md:top-[94%] top-[91%] left-1 rounded-full shadow-lg relative ${showScrollTop ? 'showed' : ''}`}
            aria-label="scroll top"
            type="button"
            onClick={handleScrollToTop}
            style={{ width: 40, height: 40 }}
        >
            <IoArrowUp size={24} className="text-[#03aa72] w-full" />
        </button>
    );
};

export default ScrollToTopButton;