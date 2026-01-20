import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatToggleButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ isOpen, onToggle }) => (
    <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#14573f] shadow-elegant flex items-center justify-center text-primary-foreground hover:shadow-glow transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат с ассистентом'}
    >
        <AnimatePresence mode="wait">
            {isOpen ? (
                <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <X className="w-7 h-7" />
                </motion.div>
            ) : (
                <motion.div
                    key="chat"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <MessageCircle className="w-7 h-7" />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
);

export default ChatToggleButton;