import React from 'react';
import { FaTelegramPlane, FaVk, FaWhatsapp } from 'react-icons/fa';

interface MessengerButtonProps {
    messenger: 'whatsapp' | 'telegram' | 'vk';
    onClick: () => void;
}

const MessengerButton: React.FC<MessengerButtonProps> = ({ messenger, onClick }) => {
    const icons = {
        whatsapp: <FaWhatsapp size={20} />,
        telegram: <FaTelegramPlane size={20} />,
        vk: <FaVk size={20} />,
    };

    const labels = {
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        vk: 'ВКонтакте',
    };

    return (
        <button onClick={onClick} className={`messenger-button group ${messenger} p-2`}>
            <span className="shine"></span>
            <span className="border-top-left"></span>
            <span className="border-top-right"></span>
            <span className="border-bottom-left"></span>
            <span className="border-bottom-right"></span>
            <span className="content">
                {icons[messenger]}
                {labels[messenger]}
            </span>
        </button>
    );
};

export default MessengerButton;