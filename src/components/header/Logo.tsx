import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';



const Logo: React.FC = () => (
    <motion.div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }}
    >
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img src={logo} alt="Логотип" className='w-11 h-11 rounded-full' />
        </div>
        <h3 className='font-bold text-2xl h2'>Эстерия</h3>
    </motion.div>
);

export default Logo;
