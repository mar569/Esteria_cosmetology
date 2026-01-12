import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { GalleryImage } from '../../utils/galleryData';

interface Props {
    images: GalleryImage[];
    openLightbox: (id: number) => void;
    categories: { id: string; name: string }[];
    categoryTrigger: number;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.98,
    },
};

const GalleryGrid = ({ images, openLightbox, categories, categoryTrigger }: Props) => (
    <AnimatePresence mode="wait">
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`grid-${categoryTrigger}`}
        >
            {images.map((image, index) => (
                <motion.div
                    key={image.id}
                    className={`group relative overflow-hidden rounded-2xl bg-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                        } gallery__item`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => openLightbox(image.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    custom={index}
                >
                    <div
                        className={`relative overflow-hidden ${index % 3 === 0 ? 'h-80 lg:h-96' : 'h-48 lg:h-64'
                            }`}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                                <p className="text-white/90 text-sm">{image.description}</p>
                            </div>

                            <div className="absolute top-4 right-4">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Maximize2 className="text-white" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                                {categories.find((cat) => cat.id === image.category)?.name}
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </AnimatePresence>
);

export default GalleryGrid;
