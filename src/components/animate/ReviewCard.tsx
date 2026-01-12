
import React, { useRef } from "react";
import { Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FaVk } from "react-icons/fa";

type Review = {
    name: string;
    service: string;
    text: string;
    rating: number;
};

type ReviewCardProps = {
    review: Review;
    index: number;
    cardWidth: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index, cardWidth }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const padding = cardWidth > 300 ? '2rem' : '1rem';
    const textSize = cardWidth > 300 ? 'text-lg' : 'text-base';
    const iconSize = cardWidth > 300 ? 32 : 24;
    const starSize = cardWidth > 300 ? 'w-5 h-5' : 'w-4 h-4';

    const innerShadow = cardWidth > 300
        ? 'inset 0 4px 8px rgba(0, 0, 0, 0.), inset 0 -4px 8px rgba(255, 255, 255, 0.1)'
        : 'inset 0 2px 4px rgba(45, 82, 70, 0.45), inset 0 -20px 44px rgba(45, 82, 70, 0.55)';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden flex flex-col card "
            style={{
                padding: padding,
                width: '100%',
                minHeight: '250px',
                boxShadow: innerShadow,
            }}
        >
            <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-b from-mint-200 to-purple-200 rounded-bl-3xl opacity-50"></div>

            <div className="relative flex-grow flex flex-col">
                <FaVk className="text-blue-400 mb-4" size={iconSize} />

                <p className={`text-gray-200 mb-6 leading-relaxed flex-grow ${textSize}`}>
                    "{review.text}"
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h4 className="font-bold text-gray-300">{review.name}</h4>
                            <p className="text-gray-400 text-sm">{review.service}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className={`text-yellow-400 fill-current ${starSize}`} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewCard;
