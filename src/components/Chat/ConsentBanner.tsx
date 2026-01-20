import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

interface ConsentBannerProps {
    onGiveConsent: () => void;
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({ onGiveConsent }) => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-muted/80 border-b border-border"
    >
        <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-3">
                    Сообщения обрабатываются AI-сервисом анонимно для формирования ответов.
                    Мы не храним переписку и не запрашиваем личные данные.
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                    Нажимая «Начать чат», вы соглашаетесь с{' '}
                    <Link
                        to="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80 transition-colors"
                    >
                        политикой конфиденциальности
                    </Link>
                    .
                </p>
                <Button
                    size="sm"
                    onClick={onGiveConsent}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
                >
                    Начать чат
                </Button>
            </div>
        </div>
    </motion.div>
);

export default ConsentBanner;