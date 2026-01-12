import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.6 },
    }),
};

const GalleryHeader = () => (
    <motion.div
        className="text-center mb-16 "
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={0}
    >
        <div className="flex items-center justify-center space-x-2 mb-6">
            <Camera className="text-accent" size={30} />
            <span className="text-accent font-medium uppercase tracking-wider text-xl sm:text-2xl lg:text-4xl">
                Фотографии кабинета
            </span>

        </div>
        <div className="section-divider mb-6" />
        <motion.p
            className="text-lg lg:text-4xl text-[#85ad9c] max-w-3xl mx-auto leading-relaxed"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
        >
            Познакомьтесь с моим современным кабинетом, где каждая деталь продумана для вашего комфорта и безопасности
        </motion.p>
    </motion.div>
);

export default GalleryHeader;
