import React, { createContext, useContext, useState } from 'react';

interface ServiceContextType {
    selectedService: string;
    setSelectedService: (service: string) => void;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export const useService = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useService must be used within ServiceProvider');
    }
    return context;
};

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedService, setSelectedService] = useState('');

    return (
        <ServiceContext.Provider value={{ selectedService, setSelectedService }}>
            {children}
        </ServiceContext.Provider>
    );
};