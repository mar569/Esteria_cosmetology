import { forwardRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ChatInputProps {
    input: string;
    onInputChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    hasConsent: boolean;
}

const ChatInput = forwardRef<HTMLInputElement | null, ChatInputProps>(
    ({ input, onInputChange, onSubmit, isLoading, hasConsent }, ref) => (
        <form onSubmit={onSubmit} className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
                <input
                    ref={ref}
                    type="text"
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder={hasConsent ? "Напишите сообщение..." : "Дайте согласие выше..."}
                    disabled={isLoading || !hasConsent}
                    className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
                <Button
                    type="submit"
                    disabled={!input.trim() || isLoading || !hasConsent}
                    className="w-10 h-10 rounded-full bg-gradient-botanical hover:opacity-90 p-0"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                    ) : (
                        <Send className="w-4 h-4 text-primary-foreground" />
                    )}
                </Button>
            </div>
        </form>
    )
);

ChatInput.displayName = 'ChatInput';

export default ChatInput;