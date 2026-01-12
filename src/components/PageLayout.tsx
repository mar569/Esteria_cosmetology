import React from 'react';
import Header from './Header';


type PageLayoutProps = {
    children: React.ReactNode;
    hideHeader?: boolean;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, hideHeader = false }) => {
    return (
        <>
            {!hideHeader && <Header />}
            <main>{children}</main>

        </>
    );
};

export default PageLayout;
