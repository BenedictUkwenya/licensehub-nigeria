// /client/src/components/layout/Layout.tsx

import React from 'react';
import Header from './Header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main style={{ padding: '2rem' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;