import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface QuickActionsProps {
    actions: string[];
    onActionClick: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, onActionClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
    >
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-botanical flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                <p className="text-sm text-foreground">
                    Здравствуйте! 👋 Я Эстерия — виртуальный помощник Марианны.
                    Расскажу об услугах, ценах, помогу с записью.
                    Чем могу помочь?
                </p>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 ml-11">
            {actions.map((action) => (
                <button
                    key={action}
                    onClick={() => onActionClick(action)}
                    className="px-3 py-1.5 text-xs bg-accent/10 text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-colors"
                >
                    {action}
                </button>
            ))}
        </div>
    </motion.div>
);

export default QuickActions;