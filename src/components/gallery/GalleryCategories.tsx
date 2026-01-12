import { motion } from 'framer-motion';

interface Category {
    id: string;
    name: string;
    count: number;
}

interface Props {
    categories: Category[];
    activeCategory: string;
    setActiveCategory: (id: string) => void;
    className?: string;
}

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.6 },
    }),
};

const GalleryCategories = ({ categories, activeCategory, setActiveCategory, className }: Props) => (
    <motion.div
        className={`flex flex-wrap justify-center gap-4 mb-12 ${className || ''}`}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={1}
    >
        {categories.map((category, i) => (
            <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-mint-600 to-mint-700 text-white shadow-lg'
                    : 'bg-transparent text-[#85ad9c] hover:bg-mint-50 border-[1px] border-accent hover:border-mint-300'
                    }`}
                variants={fadeUpVariants}
                custom={i + 2}
                whileTap={{ scale: 0.95 }}
            >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </motion.button>
        ))}
    </motion.div>
);

export default GalleryCategories;
