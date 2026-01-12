import React from 'react';
import { Users, Shield } from 'lucide-react';
import StatCard from './StatCard';
import { useInView, motion } from 'framer-motion';
import { CountGroup } from '../lightswind/countGroup';


const StatsSection: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

    const statsData = [
        {
            icon: <Users size={32} />,
            number: <CountGroup value={90} suffix="+" />,
            label: 'Довольных клиентов'
        },
        {
            icon: <Shield size={32} />,
            number: <CountGroup value={100} suffix="%" />,
            label: 'Безопасность'
        },
    ];

    const directions = ['left', 'right', 'up', 'down'];

    return (
        <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-6">
            {statsData.map((stat, i) => {
                const direction = directions[i % directions.length];
                return (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
                            y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
                        }}
                        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                        transition={{ type: 'spring', stiffness: 100, damping: 10, delay: i * 0.1 }}
                        className="mb-4"
                    >
                        <StatCard {...stat} />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default StatsSection;
