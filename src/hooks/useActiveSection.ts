import { useState, useEffect } from 'react';

export const useActiveSection = (
  navItems: { name: string; href: string }[]
) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      let current = '';
      for (const item of navItems) {
        const el = document.getElementById(item.href.replace('#', ''));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            current = item.href;
            break;
          }
        }
      }

      if (!current && scrollPos > 0) {
        const lastItem = navItems[navItems.length - 1];
        const lastEl = document.getElementById(lastItem.href.replace('#', ''));
        if (lastEl && scrollPos >= lastEl.offsetTop) {
          current = lastItem.href;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return activeSection;
};
