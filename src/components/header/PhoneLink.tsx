import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';



interface PhoneLinkProps {
    isScrolled: boolean;
}

const PhoneLink: React.FC<PhoneLinkProps> = ({ isScrolled }) => (
    <motion.div
        className="hidden lg:flex items-center space-x-4"

    >
        <a
            href="tel:+78123456789"
            className={`flex items-center space-x-2 transition-colors duration-500 hover:text-mint-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
        >
            <Phone size={18} />
            <span className="font-medium">+7 (965) 788-77-50</span>
        </a>
    </motion.div>
);

export default PhoneLink;