import React from 'react';

type CertificateCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    number: string;
    additionalImage?: string;
};

const CertificateCard: React.FC<CertificateCardProps> = ({
    icon,
    title,
    description,
    number,
    additionalImage
}) => (
    <div
        className="animate-child relative flex items-start space-x-4 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
        style={{
            background: 'radial-gradient(60% 100% at 50% 0%, rgba(255, 255, 255, 0.4) 0%, rgba(105, 105, 105, 0.1) 100%) rgba(0, 0, 0, 0)',
            border: '1px solid rgb(91%, 69%, 19%, 0.3)',
            width: '100%',
            opacity: 1,
            minHeight: '80px',
        }}
        data-framer-name="CertificateCard"
    >
        <div
            className="absolute top-0 left-0 w-2 h-2 bg-mint-200/50 rotate-90 opacity-50 hidden lg:block"
            style={{ transform: 'rotate(90deg)' }}
        />
        <div
            className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-lime-200/40 rotate-180 opacity-40 hidden lg:block"
            style={{ transform: 'rotate(-180deg)' }}
        />
        <div
            className="absolute top-2 right-2 w-1 h-1 bg-mint-300/30 rotate-0 opacity-30 hidden lg:block"
            style={{ transform: 'rotate(-90deg)' }}
        />

        <div
            className="flex-shrink-0 "
            style={{ opacity: 1 }}
            data-framer-name="Icon"
        >
            {typeof icon === 'string' ? (
                <img
                    src={icon}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                        display: 'block',
                        objectPosition: 'center center',
                        objectFit: 'cover'
                    }}
                />
            ) : (
                icon
            )}
        </div>

        <div className="flex-1 min-w-0" style={{ opacity: 1 }} data-framer-name="Title Wrap">
            <div className="flex flex-col" style={{ opacity: 1 }}>
                <p
                    className="text-sm text-gray-400 leading-relaxed mb-1 text-white/90"
                    data-framer-component-type="RichTextContainer"
                >
                    {description}
                </p>

                <p
                    className="font-semibold text-gray-300 italic text-right leading-tight "
                    data-framer-component-type="RichTextContainer"
                >
                    {title}
                </p>
            </div>
        </div>

        <div
            className="flex-shrink-0 text-right ml-2"
            style={{ opacity: 1 }}
            data-framer-name="Number"
            data-framer-component-type="RichTextContainer"
        >
            <p className="text-accent font-bold text-sm  leading-none">{number}</p>
        </div>
        {additionalImage && (
            <div
                className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden rounded-b-2xl"
                style={{
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    opacity: 1
                }}
                data-framer-name="Additional Image"
            >
                <img
                    src={additionalImage}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                        display: 'block',
                        objectPosition: 'center center',
                        objectFit: 'cover'
                    }}
                />
            </div>
        )}
    </div>
);

export default CertificateCard;