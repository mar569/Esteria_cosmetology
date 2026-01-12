import React from 'react';
import SparkleNavbar from '../lightswind/SparkleNavbar';
import { navItems } from '../../constants/navItems';

interface DesktopNavProps {
    isScrolled: boolean;
    scrollToSection: (id: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ isScrolled, scrollToSection }) => (
    <div className="hidden lg:block sectbg">
        <SparkleNavbar
            items={navItems.map(item => item.name)}
            color={isScrolled ? '#4B5563' : '#2fc58c'}
            onItemClick={(index) => {
                const item = navItems[index];
                if (item && item.href) {
                    scrollToSection(item.href.slice(1));
                }
            }}
        />
    </div>
);

export default DesktopNav;