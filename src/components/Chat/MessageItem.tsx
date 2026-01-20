import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface MessageItemProps {
    message: Message;
    index: number;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, index }) => (
    <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
    >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
            ? 'bg-accent'
            : 'bg-gradient-botanical'
            }`}>
            {message.role === 'user' ? (
                <User className="w-4 h-4 text-accent-foreground" />
            ) : (
                <Bot className="w-4 h-4 text-primary-foreground" />
            )}
        </div>
        <div className={`rounded-2xl p-3 max-w-[85%] ${message.role === 'user'
            ? 'bg-accent text-accent-foreground rounded-tr-sm'
            : 'bg-muted text-foreground rounded-tl-sm'
            }`}>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
    </motion.div>
);

export default MessageItem;