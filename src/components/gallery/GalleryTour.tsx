import { easeInOut, motion } from 'framer-motion';
import { Phone, HandHeart } from 'lucide-react';

interface Props {
    customIndex: number;
    categoryTrigger: number;
}

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: () => ({
        opacity: 1,
        y: 0,
    }),
};

const VirtualTour = ({ customIndex, categoryTrigger }: Props) => {
    const getDelay = (customOffset: number) => {
        return (customIndex + categoryTrigger + customOffset) * 0.1 + (categoryTrigger * 0.2);
    };

    return (
        <motion.div
            className="mt-16 text-center"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={customIndex + categoryTrigger}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.6,
                ease: easeInOut,
                delay: getDelay(0),
            }}
            key={`tour-${categoryTrigger}`}
        >
            <div className="rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto card">
                <motion.div
                    className="flex items-center justify-center space-x-3 mb-6"
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.6,
                        ease: easeInOut,
                        delay: getDelay(1),
                    }}
                >
                    <HandHeart className="text-gray-20" size={32} />
                    <h3 className="text-xl lg:text-3xl font-bold text-gray-200">
                        Познакомьтесь со мной
                    </h3>
                </motion.div>

                <motion.p
                    className="text-lg text-[#85ad9c] mb-8 max-w-2xl mx-auto"
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.6,
                        ease: easeInOut,
                        delay: getDelay(2),
                    }}
                >
                    Хотите увидеть кабинет вживую? Приходите на бесплатную консультацию и познакомьтесь со мной
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.6,
                        ease: easeInOut,
                        delay: getDelay(3),
                    }}
                >
                    <a
                        href="tel:+79657887750"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent text-white font-semibold rounded-full hover:bg-mint-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                    >
                        <Phone size={18} />
                        Позвонить сейчас
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default VirtualTour;
