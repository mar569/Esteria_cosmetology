import React, { useState } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { ChevronDown, Droplets, Leaf, Sparkles, Syringe } from 'lucide-react';
import servicesData from '../../utils/servicesData';

import { socialLinks } from '../../utils/socialLinks';
import MessengerDialog from '../appointment/MessengerDialog';

interface ServicesAccordionProps {
    onSelectService: (service: string) => void;
    customIndex?: number;
    categoryTrigger?: number;
}

const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: () => ({
        opacity: 1,
        y: 0,
    }),
};

const getDelay = (customIndex: number, categoryTrigger: number, customOffset: number) => {
    return (customIndex + categoryTrigger + customOffset) * 0.05 + (categoryTrigger * 0.1);
};

const categoryIcons = {
    'Чистка лица': <Droplets className="text-mint-500" size={24} />,
    'Пилинги': <Leaf className="text-mint-500" size={24} />,
    'Эстетика': <Sparkles className="text-mint-500" size={24} />,
    'Инъекции': <Syringe className="text-mint-500" size={24} />,
};

const categories = [
    {
        title: 'Чистка лица',
        services: servicesData
            .filter(service => ['facial-cleansing', 'combined_cleaning'].includes(service.id)) // Исправлено на корректные id
            .map(service => ({
                name: service.title,
                price: service.price,
                duration: service.duration,
            })),
    },
    {
        title: 'Пилинги',
        services: servicesData
            .filter(service => service.id === 'cosmetic_peeling')
            .map(service => ({
                name: service.title,
                price: service.price,
                duration: service.duration,
            })),
    },
    {
        title: 'Эстетика',
        services: servicesData
            .filter(service => ['facial-massage', 'rf_lifting', 'alginate_mask', 'carboxytherapy', 'cosmetologist_consultation'].includes(service.id))
            .map(service => ({
                name: service.title,
                price: service.price,
                duration: service.duration,
            })),
    },
    {
        title: 'Инъекции',
        services: servicesData
            .filter(service => ['biorevitalization', 'lip-augmentation', 'collagen_nithya', 'mesotherapy', 'fractional_mesotherapy', 'botox', 'lipolytics_body', 'lipolytics_face'].includes(service.id))
            .map(service => ({
                name: service.title,
                price: service.price,
                duration: service.duration,
            })),
    },
];

const ServicesAccordion: React.FC<ServicesAccordionProps> = ({ onSelectService, customIndex = 0, categoryTrigger = 0 }) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedServiceName, setSelectedServiceName] = useState('');

    const toggleCategory = (categoryTitle: string) => {
        setOpenCategory(openCategory === categoryTitle ? null : categoryTitle);
    };

    const handleServiceClick = (serviceName: string) => {
        onSelectService(serviceName);
        setSelectedServiceName(serviceName);
        setIsDialogOpen(true);
    };

    const handleSelectMessenger = (messenger: 'whatsapp' | 'telegram' | 'vk') => {
        const message = encodeURIComponent(`Здраствуйте! Хочу записаться на ${selectedServiceName}.`);
        let url = '';
        if (messenger === 'whatsapp') {
            url = `${socialLinks.whatsapp}?text=${message}`;
        } else if (messenger === 'telegram') {
            url = `${socialLinks.telegram}?text=${message}`;
        } else if (messenger === 'vk') {
            url = `${socialLinks.vk}?text=${message}`;
        }
        window.open(url, '_blank');
        setIsDialogOpen(false);
    };

    return (
        <>
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
                {categories.map((category, index) => (
                    <React.Fragment key={category.title}>
                        {index > 0 && <hr className="border-t border-gray-600 my-2 md:my-4" />}

                        <motion.div
                            className="rounded-xl md:rounded-2xl p-6 lg:p-8 card border border-mint-500/20 hover:shadow-xl hover:border-mint-500/40 transition-all duration-300 transform hover:-translate-y-1"
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            custom={customIndex + categoryTrigger + index}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 50,
                                duration: 0.6,
                                ease: easeOut,
                                delay: getDelay(customIndex, categoryTrigger, index),
                            }}
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <button
                                onClick={() => toggleCategory(category.title)}
                                className="w-full flex items-center justify-between text-left group mb-4 md:mb-6"
                                aria-expanded={openCategory === category.title}
                            >
                                <div className="flex items-center space-x-3 md:space-x-4">
                                    {categoryIcons[category.title as keyof typeof categoryIcons]}
                                    <h3 className="text-xl md:text-2xl lg:text-4xl font-bold font-serif text-gray-100 group-hover:text-mint-500 transition-colors duration-300">
                                        {category.title}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{ rotate: openCategory === category.title ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="text-mint-500 hover:text-mint-300 transition-colors" size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openCategory === category.title && (
                                    <motion.div
                                        initial={{ maxHeight: 0, opacity: 0 }}
                                        animate={{ maxHeight: 1000, opacity: 1 }}
                                        exit={{ maxHeight: 0, opacity: 0 }}
                                        transition={{
                                            maxHeight: { duration: 0.4, ease: 'easeInOut' },
                                            opacity: { duration: 0.4, ease: 'easeInOut' },
                                        }}
                                        style={{
                                            overflow: 'hidden',
                                        }}
                                        className="space-y-3 md:space-y-4"
                                    >
                                        {category.services.map((service, subIndex) => (
                                            <motion.div
                                                key={service.name}
                                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 rounded-xl border border-mint-500/20 hover:bg-mint-500/10 hover:shadow-lg transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5"
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 500,
                                                    damping: 30,
                                                    duration: 0.4,
                                                    ease: 'easeInOut',
                                                    delay: getDelay(customIndex, categoryTrigger, index + subIndex + 1),
                                                }}
                                            >
                                                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                                                    <div>
                                                        <h4 className="text-base md:text-lg font-semibold text-gray-100">{service.name}</h4>
                                                        <p className="text-xs md:text-sm text-gray-400 font-medium">{service.price} • {service.duration}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleServiceClick(service.name)}

                                                    className="w-full sm:w-auto inline-flex items-center border border-mint-700 justify-center gap-2 px-4 py-2 md:px-6 md:py-3 text-white font-bold rounded-full hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
                                                >
                                                    Выбрать
                                                </button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </React.Fragment>
                ))}
            </div>
            <MessengerDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSelectMessenger={handleSelectMessenger}
            />
        </>
    );
};

export default ServicesAccordion;