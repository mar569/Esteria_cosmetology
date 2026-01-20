import { useState, useEffect, useCallback, memo, } from 'react';
import { motion } from 'framer-motion';

interface Position {
    x: number;
    y: number;
}

const AIAssistant = memo(() => {
    const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
    const [eyeOffset, setEyeOffset] = useState<Position>({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
        let clientX: number, clientY: number;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        setMousePos({ x: clientX, y: clientY });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
        };
    }, [handleMouseMove]);

    useEffect(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const deltaX = (mousePos.x - centerX) / centerX;
        const deltaY = (mousePos.y - centerY) / centerY;

        const maxOffset = 6;
        setEyeOffset({
            x: Math.max(-maxOffset, Math.min(maxOffset, deltaX * maxOffset)),
            y: Math.max(-maxOffset, Math.min(maxOffset, deltaY * maxOffset)),
        });
    }, [mousePos]);

    return (
        <div className="fixed top-24 right-4 md:right-8 z-40">
            <div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full 
        bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20
        border-2 border-primary/30 shadow-lg
        select-none"
            >
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse" />

                {/* Лицо */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Глаза */}
                    <div className="flex gap-2.5 md:gap-3 items-center">
                        {/* Левая глаз */}
                        <div className="relative w-5 h-6 md:w-6 md:h-7 bg-background/80 rounded-full border border-primary/30 overflow-hidden shadow-inner">
                            <motion.div
                                className="absolute w-2.5 h-2.5 md:w-3 md:h-3 bg-primary rounded-full left-1/2 top-1/2"
                                style={{
                                    x: eyeOffset.x - 5,
                                    y: eyeOffset.y - 5,
                                }}
                            />

                            <div className="absolute w-1 h-1 bg-white/80 rounded-full top-1.5 left-2" />
                        </div>

                        {/* Правая глаз */}
                        <div className="relative w-5 h-6 md:w-6 md:h-7 bg-background/80 rounded-full border border-primary/30 overflow-hidden shadow-inner">
                            <motion.div
                                className="absolute w-2.5 h-2.5 md:w-3 md:h-3 bg-primary rounded-full left-1/2 top-1/2"
                                style={{
                                    x: eyeOffset.x - 5,
                                    y: eyeOffset.y - 5,
                                }}
                            />

                            <div className="absolute w-1 h-1 bg-white/80 rounded-full top-1.5 left-2" />
                        </div>
                    </div>

                    {/* Рот */}
                    <div
                        className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-4 h-1.5 md:w-5 md:h-2 bg-primary/40 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
});

AIAssistant.displayName = 'AIAssistant';

export default AIAssistant;