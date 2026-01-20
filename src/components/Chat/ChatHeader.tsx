import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '../../assets/logo.png';

interface ChatHeaderProps {
    messagesLength: number;
    onClearMessages: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ messagesLength, onClearMessages }) => (
    <div className="bg-gradient-botanical p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex-1">
            <h3 className="font-display font-semibold text-primary-foreground">
                Эстерия
            </h3>
            <p className="text-xs text-primary-foreground/80">
                Ваш виртуальный помощник
            </p>
        </div>
        {messagesLength > 0 && (
            <Button
                variant="ghost"
                size="icon"
                onClick={onClearMessages}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                title="Очистить чат"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        )}
    </div>
);

export default ChatHeader;