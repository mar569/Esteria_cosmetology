import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';


import { usePreventScroll } from '../hooks/usePreventScroll';
// Убрал useActiveSection, так как activeSection не используется
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import PhoneLink from './header/PhoneLink';
import MobileMenuButton from './header/MobileMenuButton';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Убрал activeSection, так как он не используется

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  usePreventScroll(isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600`}>
      <div className="container mx-auto md:px-2 px-4 p-3 flex items-center justify-between md:bg-transparent bg-[#122720] backdrop-blur-lg border-b border-border/50 rounded-b-xl">
        <Logo />
        <DesktopNav isScrolled={isScrolled} scrollToSection={scrollToSection} />
        <PhoneLink isScrolled={isScrolled} />
        <MobileMenuButton
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isScrolled={isScrolled}
        />
      </div>
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
    </motion.header>
  );
};

export default Header;