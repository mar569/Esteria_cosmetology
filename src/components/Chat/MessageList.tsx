import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { Bot, } from 'lucide-react';
import MessageItem from './MessageItem';
import QuickActions from './QuickActions';
import { Message } from './types';

interface MessageListProps {
    hasConsent: boolean;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    quickActions: string[];
    onActionClick: (action: string) => void;
}

const MessageList = forwardRef<HTMLDivElement | null, MessageListProps>(
    ({ hasConsent, messages, isLoading, error, quickActions, onActionClick }, ref) => (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {hasConsent && messages.length === 0 && (
                <QuickActions actions={quickActions} onActionClick={onActionClick} />
            )}

            {!hasConsent && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-muted-foreground text-center px-4">
                        Нажмите "Начать чат" чтобы продолжить
                    </p>
                </div>
            )}

            {hasConsent && messages.map((message, index) => (
                <MessageItem key={index} message={message} index={index} />
            ))}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-botanical flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm p-3">
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-2"
                >
                    <p className="text-xs text-destructive">{error}</p>
                </motion.div>
            )}

            <div ref={ref} />
        </div>
    )
);

MessageList.displayName = 'MessageList';

export default MessageList;