import { useState, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import GalleryHeader from './GalleryHeader';
import GalleryCategories from './GalleryCategories';
import GalleryGrid from './GalleryGrid';
import GalleryLightbox from './GalleryLightbox';
import { categories, images } from '../../utils/galleryData';
import VirtualTour from './GalleryTour';
import { commonVariants } from '../../utils/animations';


const Gallery = forwardRef<HTMLElement>((_props, ref) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('interior');
  const [categoryTrigger, setCategoryTrigger] = useState(0);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);

  };

  const closeLightbox = () => {
    setSelectedImage(null);

  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage
    );
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage
    ? images.find((img) => img.id === selectedImage)
    : null;

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    setCategoryTrigger((prev) => prev + 1);
  };

  return (
    <motion.section
      id="gallery"
      className="py-16 relative leaf-pattern"
      ref={ref}
      data-parallax-speed="0.35"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >


      <motion.div
        className="container mx-auto px-4"
        variants={commonVariants.staggerContainer}
        initial="hidden"
        animate="visible"
      >

        <motion.div variants={commonVariants.fadeIn}>
          <GalleryHeader />
        </motion.div>

        <motion.div variants={commonVariants.slideIn}>
          <GalleryCategories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
          />
        </motion.div>

        <motion.div variants={commonVariants.fadeIn}>
          <GalleryGrid
            images={filteredImages}
            openLightbox={openLightbox}
            categories={categories}
            categoryTrigger={categoryTrigger}
          />
        </motion.div>

        <motion.div variants={commonVariants.slideIn}>
          <VirtualTour
            customIndex={filteredImages.length + categories.length + 3}
            categoryTrigger={categoryTrigger}
            key={`tour-${categoryTrigger}`}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && selectedImageData && (
          <GalleryLightbox
            selectedImageData={selectedImageData}
            closeLightbox={closeLightbox}
            navigateImage={navigateImage}
            filteredImages={filteredImages}
            selectedImage={selectedImage}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;