import React from 'react';
import { Service } from '../../utils/servicesData';
import { CountGroup } from '../lightswind/countGroup';


type ServiceCardProps = {
    service: Service;
    onClick: () => void;
};

const parseNumberAndSuffix = (str: string): { value: number; suffix: string } => {
    const match = str.match(/([\d,.]+)\s*(.*)/);
    if (!match) return { value: 0, suffix: '' };
    const value = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2] || '';
    return { value, suffix };
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
    const { value: priceValue, suffix: priceSuffix } = parseNumberAndSuffix(service.price);
    const { value: durationValue, suffix: durationSuffix } = parseNumberAndSuffix(service.duration);

    return (
        <div
            className="
 rounded-2xl bg-gradient-to-tl from-gray-300 via-mint-100 to-gray-400 p-6 transition-transform hover:-translate-y-2 hover:shadow-2xl duration-500
        mx-auto
        min-w-[280px] max-w-sm
        h-[440px]
        flex flex-col 
        cursor-pointer
      "
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClick();
            }}
            aria-label={`Подробнее о процедуре ${service.title}`}
        >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{service.title}</h3>
            <p className="text-gray-600 text-center flex-grow">{service.description}</p>
            <div className="flex justify-between items-center mb-6">
                <CountGroup
                    value={priceValue}
                    suffix={priceSuffix}
                    duration={2}
                    decimals={0}
                    animationStyle="bounce"
                    colorScheme="primary"
                    className="inline-block"
                    numberClassName="text-lg font-bold text-mint-700"
                    textColor="text-mint-700"
                    fontFamily="sans-serif"
                    triggerOnView={true}
                    interactive={false}
                />
                <CountGroup
                    value={durationValue}
                    suffix={durationSuffix}
                    duration={2}
                    decimals={0}
                    animationStyle="bounce"
                    colorScheme="secondary"
                    className="inline-block"
                    numberClassName="text-sm font-semibold text-gray-800 px-3 py-1 rounded-full bg-transparent"
                    textColor="text-gray-800"
                    fontFamily="sans-serif"
                    triggerOnView={true}
                    interactive={false}
                />
            </div>
            <div className="flex justify-center">
                <button
                    onClick={onClick}
                    style={{
                        background: `radial-gradient(
              212.58% 2646.98% at 35.86% 50%,
              #158875 0,
              #04ae78 48.96%,
              #016238 100%
            )`,
                    }}
                    className="text-white px-7 py-2 rounded-full font-semibold hover:bg-mint-600 transition"
                >
                    Выбрать
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
