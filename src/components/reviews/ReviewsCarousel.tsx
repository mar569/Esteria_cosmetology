
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, PanInfo, Transition } from 'framer-motion';
import ReviewCard from '../animate/ReviewCard';
import { Review } from '../../utils/reviewsData';

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = { type: 'spring', stiffness: 300, damping: 30 };

interface ReviewsCarouselProps {
    reviews: Review[];
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    loop?: boolean;
}

export default function ReviewsCarousel({
    reviews,

    pauseOnHover = true,
    loop = true
}: ReviewsCarouselProps) {
    const [containerWidth, setContainerWidth] = useState(0);
    const [cardWidth, setCardWidth] = useState(320);
    const trackItemOffset = cardWidth + GAP;
    const visibleCards = Math.max(1, Math.floor(containerWidth / trackItemOffset));
    const totalCards = reviews.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);

    const carouselItems = loop ? [...reviews, ...reviews.slice(0, visibleCards)] : reviews;
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {

        const newCardWidth = Math.max(280, (containerWidth - GAP * (visibleCards - 1)) / visibleCards);
        setCardWidth(Math.min(320, newCardWidth));
    }, [containerWidth, visibleCards]);

    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);


    useEffect(() => {
        x.set(-currentIndex * trackItemOffset);
    }, [currentIndex, x, trackItemOffset]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            setCurrentIndex(prev => {
                const next = prev + 1;
                if (loop && next >= totalCards) {
                    return 0;
                }
                return Math.min(next, maxIndex);
            });
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            setCurrentIndex(prev => {
                const next = prev - 1;
                if (loop && next < 0) {
                    return maxIndex;
                }
                return Math.max(next, 0);
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="carousel-container"
            style={{
                width: '100%',
                height: '500px',
                position: 'relative',
                overflow: 'hidden',

            }}
        >
            <motion.div
                className="carousel-track"
                drag="x"
                dragConstraints={{
                    left: -maxIndex * trackItemOffset,
                    right: 0
                }}
                style={{
                    display: 'flex',
                    gap: `${GAP}px`,
                    x
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -currentIndex * trackItemOffset }}
                transition={SPRING_OPTIONS}
                whileTap={{ cursor: "grabbing" }}
            >
                {carouselItems.map((review: Review, index: number) => (
                    <div
                        key={`${review.name}-${index}`}
                        className="carousel-item"
                        style={{
                            width: cardWidth,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ReviewCard review={review} index={index % totalCards} cardWidth={0} />
                    </div>
                ))}
            </motion.div>
            <div className="carousel-indicators-container">
                <div className="carousel-indicators">
                    {Array.from({ length: maxIndex + 1 }).map((_, index: number) => (
                        <motion.div
                            key={index}
                            className={`carousel-indicator ${currentIndex === index ? 'active' : 'inactive'}`}
                            animate={{
                                scale: currentIndex === index ? 1.2 : 1
                            }}
                            onClick={() => setCurrentIndex(index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
