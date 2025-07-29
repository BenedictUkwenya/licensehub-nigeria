// /client/src/pages/Dashboard/BusinessAppsPage.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
// We can reuse the same styles from the other dashboard page for consistency
import styles from './MyLicensesPage.module.css';

// Define the shape of an Application object
interface IApplication {
    _id: string;
    status: string;
    createdAt: string;
    service: { // The populated service object
        name: string;
        category: string;
    };
}

const BusinessAppsPage = () => {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get<IApplication[]>('/applications');
                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (isLoading) return <div>Loading your applications...</div>;

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>My Business Applications</h1>
            </div>

            <div className={styles.licenseList}> {/* Reusing this class name */}
                {applications.length > 0 ? (
                    applications.map(app => (
                        <div key={app._id} className={styles.licenseCard}> {/* Reusing this class */}
                            <span className={styles.statusText} style={{backgroundColor: '#6c757d'}}>
                                {app.status}
                            </span>
                            <h3>{app.service.name}</h3>
                            <p><strong>Category:</strong> {app.service.category}</p>
                            <p><strong>Submitted on:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>You have not submitted any business applications yet.</p>
                )}
            </div>
        </div>
    );
};

export default BusinessAppsPage;