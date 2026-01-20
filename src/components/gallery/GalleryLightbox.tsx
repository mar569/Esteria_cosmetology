import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../../utils/galleryData';

interface Props {
    selectedImageData: GalleryImage;
    closeLightbox: () => void;
    navigateImage: (direction: 'prev' | 'next') => void;
    filteredImages: GalleryImage[];
    selectedImage: number;
}

const GalleryLightbox = ({
    selectedImageData,
    closeLightbox,
    navigateImage,
    filteredImages,
    selectedImage,
}: Props) => (
    <motion.div
        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-90 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="lightbox"
        onClick={closeLightbox} // Закрытие при клике вне карточки
    >
        {/* Внутренний контейнер, клики внутри которого не закрывают модал */}
        <div
            className="relative max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Закрыть"
            >
                <X size={24} />
            </button>

            <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Предыдущее изображение"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Следующее изображение"
            >
                <ChevronRight size={24} />
            </button>

            <div className="relative">
                <img
                    src={selectedImageData.src}
                    alt={selectedImageData.alt}
                    className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                    <h3 className="text-white font-bold text-xl mb-2">{selectedImageData.title}</h3>
                    <p className="text-white/90 mb-3">{selectedImageData.description}</p>
                </div>
            </div>

            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-white text-sm select-none">
                {filteredImages.findIndex((img) => img.id === selectedImage) + 1} / {filteredImages.length}
            </div>
        </div>
    </motion.div>
);

export default GalleryLightbox;