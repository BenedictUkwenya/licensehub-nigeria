// /client/src/pages/Dashboard/OverviewPage.tsx

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import styles from './OverviewPage.module.css';

// We need to define the interfaces for the data we're fetching
interface IUserLicense {
    status?: 'active' | 'expiring_soon' | 'expired';
}
interface IApplication {
    status: 'Pending' | 'In Review' | 'Queried' | 'Approved' | 'Rejected';
}

const OverviewPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        pendingApps: 0,
        expiringSoon: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch both sets of data in parallel for better performance
                const [licensesRes, applicationsRes] = await Promise.all([
                    api.get<IUserLicense[]>('/licenses'),
                    api.get<IApplication[]>('/applications')
                ]);
                
                // Calculate stats from the data
                const expiringLicenses = licensesRes.data.filter(
                    lic => lic.status === 'expiring_soon'
                ).length;
                
                const pendingApplications = applicationsRes.data.filter(
                    app => app.status === 'Pending' || app.status === 'In Review'
                ).length;

                setStats({
                    pendingApps: pendingApplications,
                    expiringSoon: expiringLicenses,
                });

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading dashboard overview...</div>;
    }

    return (
        <div>
            <div className={styles.welcomeMessage}>
                <h1>Welcome back, {user?.name}!</h1>
                <p>Here's a quick summary of your account.</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Pending Applications</h3>
                    <p className={styles.statNumber}>{stats.pendingApps}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Licenses Expiring Soon</h3>
                    <p className={styles.statNumber}>{stats.expiringSoon}</p>
                </div>
            </div>

            {/* We could add quick links or recent activity here later */}
        </div>
    );
};

export default OverviewPage;