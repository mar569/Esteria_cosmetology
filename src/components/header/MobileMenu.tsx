import React, { useEffect, useCallback } from 'react';
import { Phone, MapPin, Clock, X } from 'lucide-react';

import { navItems } from '../../constants/navItems';
import { cn } from '../../lib/utils';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { FaTelegram, FaVk, FaWhatsapp } from 'react-icons/fa';
import { socialLinks } from '../../utils/socialLinks';

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    scrollToSection: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    scrollToSection,
}) => {

    const menuItems = navItems.map((item, index) => ({
        label: item.name,
        id: item.href.slice(1),
        icon: (index + 1).toString().padStart(2, '0'),
    }));

    const handleNavClick = useCallback((id: string) => {
        scrollToSection(id);
        setIsMobileMenuOpen(false);
    }, [scrollToSection, setIsMobileMenuOpen]);

    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, [setIsMobileMenuOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) closeMenu();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen, closeMenu]);

    return (
        <>

            <div
                className={cn(
                    'fixed inset-0 bg-background/70 backdrop-blur-sm z-50 transition-opacity duration-300',
                    isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
                onClick={closeMenu}
                aria-hidden="true"
            />


            <nav
                className={cn(
                    'fixed top-0 left-0 h-full w-[85vw] max-w-[320px] z-50',
                    'bg-card border-r border-border/50',
                    'transform transition-transform duration-300 ease-out will-change-transform',
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                aria-label="Мобильное меню"
                aria-hidden={!isMobileMenuOpen}
            >

                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />


                <div className="relative flex items-center justify-between p-5 border-b border-border/30">
                    <a href="/" className="flex items-center gap-3" onClick={closeMenu}>
                        <Logo />
                    </a>

                    <button
                        onClick={closeMenu}
                        className="p-2 -mr-2 rounded-full hover:bg-muted/50 active:scale-95 transition-all"
                        aria-label="Закрыть меню"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>


                <ul className="py-4 px-3">
                    {menuItems.map((item, index) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleNavClick(item.id)}
                                className={cn(
                                    'w-full flex items-center gap-4 py-4 px-4 rounded-xl',
                                    'hover:bg-muted/40 active:bg-muted/60 active:scale-[0.98]',
                                    'transition-all duration-150',
                                    'group'
                                )}
                                style={{
                                    transitionDelay: isMobileMenuOpen ? `${index * 30}ms` : '0ms',
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-12px)',
                                }}
                            >
                                <span className="text-[10px] font-mono text-accent/60 tabular-nums">
                                    {item.icon}
                                </span>
                                <span className="text-base font-medium text-foreground group-hover:text-accent transition-colors">
                                    {item.label}
                                </span>
                                <span className="ml-auto text-muted-foreground/40 group-hover:text-accent/60 group-hover:translate-x-0.5 transition-all">
                                    →
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>




                <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border/30 bg-background/80">
                    <div className="space-y-2.5 text-sm">
                        <a
                            href="tel:+79657887750"
                            className="flex items-center gap-3 text-muted-foreground hover:text-accent active:text-accent transition-colors py-1"
                        >
                            <Phone className="w-4 h-4 text-accent shrink-0" />
                            <span>+7 (965) 788-77-50</span>
                        </a>
                        <div className="flex items-center gap-3 text-muted-foreground py-1">
                            <MapPin className="w-4 h-4 text-accent shrink-0" />
                            <span>Шлиссельбург, ул. Чекалова, 10</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground py-1">
                            <Clock className="w-4 h-4 text-accent shrink-0" />
                            <span>Пн-Пт: 10:00 - 20:00</span>
                        </div>
                    </div>


                    <div className="flex gap-3 mt-4 pt-3 border-t border-border/30">
                        <motion.a
                            href={socialLinks.vk}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-all duration-200 hover:scale-110"
                            whileHover={{ scale: 1.1 }}
                            aria-label="VK"
                        >
                            <FaVk size={22} />
                        </motion.a>
                        <motion.a
                            href={socialLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-all duration-200 hover:scale-110"
                            whileHover={{ scale: 1.1 }}
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp size={22} />
                        </motion.a>
                        <motion.a
                            href={socialLinks.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 border border-white/10 hover:border-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:text-emerald-300 transition-all duration-200 hover:scale-110"
                            whileHover={{ scale: 1.1 }}
                            aria-label="Telegram"
                        >
                            <FaTelegram size={22} />
                        </motion.a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MobileMenu;