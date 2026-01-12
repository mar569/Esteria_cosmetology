import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
    x: number;
    y: number;
}

const AIAssistant = memo(() => {
    const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
    const [eyeOffset, setEyeOffset] = useState<Position>({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const messages = useMemo(() => [
        "Здравствуйте! Я ассистент 🌿",
        "Чем могу помочь сегодня?",
        "Нажмите на чат внизу! 💬",
        "Я слежу за вами... шучу! 😄",
        "Я просто наблюдаю! 🙈",
    ], []);


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


    const handleClick = useCallback(() => {
        setIsClicked(true);
        setClickCount((prev) => prev + 1);
        setShowMessage(true);


        setTimeout(() => setIsClicked(false), 300);

        setTimeout(() => setShowMessage(false), 3000);
    }, []);

    return (
        <div className="fixed top-24 right-4 md:right-8 z-40">


            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute -left-48 md:-left-56 top-1/2 -translate-y-1/2 
            bg-card/95 backdrop-blur-sm border border-border/50 
            rounded-2xl px-4 py-2 shadow-lg max-w-[200px] md:max-w-[240px]"
                    >
                        <p className="text-sm text-foreground/90 font-medium">
                            {messages[clickCount % messages.length]}
                        </p>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                            <div className="border-8 border-transparent border-l-card/95" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <motion.button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full 
        bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20
        border-2 border-primary/30 shadow-lg
        cursor-pointer select-none
        hover:border-primary/50 hover:shadow-primary/20
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary/50"
                animate={{
                    scale: isClicked ? 0.9 : isHovered ? 1.05 : 1,
                    rotate: isClicked ? [0, -5, 5, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="AI помощник"
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
                                animate={{ scale: isClicked ? 0.5 : 1 }}
                                transition={{ duration: 0.15 }}
                            />
                            {/* Отблеск радужки */}
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
                                animate={{ scale: isClicked ? 0.5 : 1 }}
                                transition={{ duration: 0.15 }}
                            />
                            {/* отблеск */}
                            <div className="absolute w-1 h-1 bg-white/80 rounded-full top-1.5 left-2" />
                        </div>
                    </div>

                    {/* Рот */}
                    <motion.div
                        className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-4 h-1.5 md:w-5 md:h-2 bg-primary/40 rounded-full"
                        animate={{
                            scaleY: isClicked ? 2 : isHovered ? 1.3 : 1,
                            borderRadius: isClicked ? '50%' : '9999px',
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </div>

                {/* Танцующая искра */}
                <motion.div
                    className="absolute -top-1 -right-1 text-primary"
                    animate={{
                        rotate: [0, 360],
                        scale: isHovered ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 0.5 },
                    }}
                />

                {/* Летающие частицы при наведении */}
                {isHovered && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
                                initial={{ x: 0, y: 0, opacity: 0 }}
                                animate={{
                                    x: [0, (i - 1) * 20],
                                    y: [0, -30 - i * 10],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 1,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                }}
                                style={{
                                    left: '50%',
                                    bottom: '80%',
                                }}
                            />
                        ))}
                    </>
                )}
            </motion.button>


            <AnimatePresence>
                {!showMessage && clickCount === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 2 }}
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap"
                    >
                        Нажми на меня!
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
});

AIAssistant.displayName = 'AIAssistant';

export default AIAssistant;