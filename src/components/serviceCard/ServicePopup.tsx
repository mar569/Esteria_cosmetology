import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { easeInOut, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import sevice from '../../assets/video/service.mp4';

type ServicePopupProps = {
  onClose: () => void;
};

const ServicePopup: React.FC<ServicePopupProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const popupContent = (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: easeInOut }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-400 to-white/80 rounded-xl shadow-2xl max-w-xl w-full max-h-[70vh] overflow-hidden"
        initial={{ x: '100%', scale: 0.95 }}
        animate={{ x: 0, scale: 1 }}
        exit={{ x: '100%', scale: 0.95 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.8,
          ease: easeInOut,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all z-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Закрыть popup"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="p-8">
          <h2
            id="popup-title"
            className="text-2xl lg:text-3xl font-bold text-black/80 mb-4 text-center"
          >
            Мои работы
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Советы, истории и фото-видео моих работ — не пропустите ничего важного,
            переходите и подписывайтесь в мою группу!
          </p>

          <div className="relative mb-6 aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <video
              src={sevice}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster=""
              controls
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="text-center">
            <a
              href="https://vk.com/esterum_cosmo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Перейти в группу ВКонтакте"
            >
              Перейти в группу <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );


  if (typeof document === 'undefined') return null;


  return createPortal(popupContent, document.body);
};

export default ServicePopup;