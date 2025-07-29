// /client/src/components/layout/DashboardLayout/DashboardLayout.tsx

import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';

// We do not need to explicitly type the children here because the component
// itself does not take a 'children' prop. The <Outlet /> from react-router-dom
// handles the rendering of the child routes automatically.

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // This function provides the correct className for active links
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? styles.navLinkActive : styles.navLink;

    const closeSidebar = () => {
        if (window.innerWidth <= 768) {
             setSidebarOpen(false);
        }
    }

    return (
        <div className={styles.dashboardContainer}>
            <button className={styles.mobileToggle} onClick={() => setSidebarOpen(!isSidebarOpen)}>
                ☰ {/* Hamburger Icon */}
            </button>
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <nav>
                    <ul className={styles.sidebarNav}>
                        <li>
                            <NavLink to="/dashboard" end className={getNavLinkClass} onClick={closeSidebar}>
                                Overview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-licenses" className={getNavLinkClass} onClick={closeSidebar}>
                                My Personal Licenses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/business-apps" className={getNavLinkClass} onClick={closeSidebar}>

                                Business Applications
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className={getNavLinkClass} onClick={closeSidebar}>
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                {/* 
                  Outlet is the magic part. It tells react-router, "render the
                  matching child route component from App.tsx right here".
                */}
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;