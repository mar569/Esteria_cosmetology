import React from 'react';
import { Service } from '../../utils/servicesData';
import ServiceCard from './ServiceCard';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { useService } from '../context/ServiceContext';


type ServicesGridProps = {
    services: Service[];

};

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
    const { setSelectedService } = useService();

    return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
            {services.map((service) => (
                <ServiceCard
                    key={service.title}
                    service={service}
                    onClick={() => {
                        setSelectedService(service.title);
                        smoothScrollTo('#appointment',);
                    }}
                />
            ))}
        </div>
    );
};

export default ServicesGrid;