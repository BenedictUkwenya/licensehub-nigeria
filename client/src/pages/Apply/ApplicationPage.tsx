// /client/src/pages/Apply/ApplicationPage.tsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ApplicationPage.module.css';
import api from '../../services/api';

const ApplicationPage = () => {
    // useParams() grabs dynamic parts of the URL, in this case the :serviceId
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();

    // A simple state to hold our generic form data
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = {
            'Full Name': name,
            'Additional Details': details
        };

        try {
            await api.post('/applications', { serviceId, formData });
            // On success, redirect to the business applications dashboard
            navigate('/dashboard/business-apps');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Application submission failed.');
            setIsSubmitting(false);
        }
    };
    
    // We would normally fetch service details here to show the real name
    // For now, we'll keep it simple.

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Application Form</h1>
            <p className={styles.subtitle}>You are applying for a service. Please fill out the details below.</p>
            
            {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input
                        id="name"
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="details" className={styles.label}>Additional Details</label>
                    <textarea
                        id="details"
                        className={styles.input}
                        rows={5}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default ApplicationPage;