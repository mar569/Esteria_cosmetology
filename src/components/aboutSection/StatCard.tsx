import { motion } from 'framer-motion';
import React from 'react';

type StatCardProps = {
    icon: React.ReactNode;
    number: React.ReactNode;
    label: string;
};

const aboutVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const StatCard: React.FC<StatCardProps> = ({ icon, number, label }) => (
    <motion.div variants={aboutVariants} initial="hidden" animate="visible"
        className="animate-child relative text-center py-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden card "

    >
        <div className="flex justify-center mb-4" style={{ opacity: 1 }}>
            <div className="flex items-center justify-center flex-shrink-0">
                {React.cloneElement(icon as React.ReactElement, { className: 'text-mint-200' })}
            </div>
        </div>

        <div
            className="text-2xl lg:text-3xl font-semibold mb-2 leading-tight"
            style={{
                color: 'rgb(255, 255, 255)',
                opacity: 1,
            }}

        >
            {number}
        </div>

        <div
            className="text-[14px] leading-relaxed"
            style={{
                color: 'rgba(255, 255, 255, 0.9)',
                opacity: 1

            }}

        >
            {label}
        </div>
    </motion.div>
);

export default StatCard;