import React from 'react';
import { Dialog, DialogContent } from '../lightswind/Dialog';
import MessengerButton from './Button';


interface MessengerDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMessenger: (messenger: 'whatsapp' | 'telegram' | 'vk') => void;
}

const MessengerDialog: React.FC<MessengerDialogProps> = ({
    isOpen,
    onClose,
    onSelectMessenger,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-tl from-mint-600 via-[#0d453a] to-[#0d453a] rounded-xl max-w-xs w-full text-center space-y-8">
                <h3 className="text-lg font-semibold text-slate-200">Выберите мессенджер</h3>
                <MessengerButton messenger="whatsapp" onClick={() => onSelectMessenger('whatsapp')} />
                <MessengerButton messenger="telegram" onClick={() => onSelectMessenger('telegram')} />
                <MessengerButton messenger="vk" onClick={() => onSelectMessenger('vk')} />
                <button onClick={onClose} className="mt-4 text-slate-200 underline text-lg">
                    Отмена
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default MessengerDialog;