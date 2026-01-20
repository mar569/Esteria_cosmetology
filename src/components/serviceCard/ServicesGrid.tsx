import React, { useState } from 'react';
import { ServiceInfo as Service } from '../../utils/servicesData'; // Исправлен импорт
import ServiceCard from './ServiceCard';
import { useService } from '../context/ServiceContext';

import { socialLinks } from '../../utils/socialLinks';
import MessengerDialog from '../appointment/MessengerDialog';

type ServicesGridProps = {
    services: Service[];
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
    const { setSelectedService } = useService();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedServiceTitle, setSelectedServiceTitle] = useState('');

    const handleServiceClick = (serviceTitle: string) => {
        setSelectedService(serviceTitle);
        setSelectedServiceTitle(serviceTitle);
        setIsDialogOpen(true);
    };

    const handleSelectMessenger = (messenger: 'whatsapp' | 'telegram' | 'vk') => {
        const message = encodeURIComponent(`Здраствуйте! Хочу записаться на ${selectedServiceTitle}.`);
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
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
                {services.map((service) => (
                    <ServiceCard
                        key={service.title}
                        service={service}
                        onClick={() => handleServiceClick(service.title)}
                    />
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

export default ServicesGrid;