import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ConsentBanner from './ConsentBanner';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from './types';

interface ChatWindowProps {
    isOpen: boolean;
    hasConsent: boolean;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    input: string;
    onInputChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onGiveConsent: () => void;
    onClearMessages: () => void;
    onActionClick: (action: string) => void;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    isOpen,
    hasConsent,
    messages,
    isLoading,
    error,
    input,
    onInputChange,
    onSubmit,
    onGiveConsent,
    onClearMessages,
    onActionClick,
    messagesEndRef,
    inputRef,
}) => {
    const quickActions = [
        'Какие у вас услуги?',
        'Как записаться?',
        'Где вы находитесь?',
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                >
                    <ChatHeader messagesLength={messages.length} onClearMessages={onClearMessages} />
                    {!hasConsent && <ConsentBanner onGiveConsent={onGiveConsent} />}
                    <MessageList
                        ref={messagesEndRef}
                        hasConsent={hasConsent}
                        messages={messages}
                        isLoading={isLoading}
                        error={error}
                        quickActions={quickActions}
                        onActionClick={onActionClick}
                    />
                    <ChatInput
                        ref={inputRef}
                        input={input}
                        onInputChange={onInputChange}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        hasConsent={hasConsent}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatWindow;