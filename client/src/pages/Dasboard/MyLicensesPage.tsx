// /client/src/pages/Dashboard/MyLicensesPage.tsx

import { useState, useEffect } from 'react';
import styles from './MyLicensesPage.module.css';
import api from '../../services/api';

// This interface defines the shape of a license object we expect from our API.
// Marking `status` as optional (`?`) makes our component crash-proof.
interface IUserLicense {
    _id: string;
    licenseType: string;
    licenseNumber: string;
    issueDate?: string;
    expiryDate?: string;
    status?: 'active' | 'expiring_soon' | 'expired';
}

const MyLicensesPage = () => {
    // --- STATE MANAGEMENT ---
    
    // For the list of licenses and the initial page load
    const [licenses, setLicenses] = useState<IUserLicense[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // For controlling the "Add New License" form
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');
    const [formData, setFormData] = useState({
        licenseType: '',
        licenseNumber: '',
        expiryDate: '',
    });

    // --- LOGIC AND DATA FETCHING ---

    // Function to fetch licenses from the backend
    const fetchLicenses = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get<IUserLicense[]>('/licenses');
            setLicenses(data);
        } catch (error) {
            console.error("Failed to fetch licenses", error);
        } finally {
            setIsLoading(false);
        }
    };

    // This useEffect hook runs only once when the component first mounts to the screen
    useEffect(() => {
        fetchLicenses();
    }, []);

    // Function to handle any change in the form's input fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Function to handle the submission of the "Add New License" form
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');

        try {
            await api.post('/licenses', formData);
            // On success, reset the state and refresh the data
            setShowForm(false);
            setFormData({ licenseType: '', licenseNumber: '', expiryDate: '' });
            fetchLicenses(); // Re-fetch to get the updated list
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to save license. Please try again.';
            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- RENDER LOGIC (JSX) ---

    // Show a loading message while fetching initial data
    if (isLoading) {
        return <div>Loading your licenses...</div>;
    }

    return (
        <div>
            {/* Main Page Header */}
            <div className={styles.pageHeader}>
                <h1>My Personal Licenses</h1>
                {!showForm && (
                    <button className={styles.addButton} onClick={() => setShowForm(true)}>
                        + Add License
                    </button>
                )}
            </div>

            {/* "Add New License" Form - Conditionally Rendered */}
            {showForm && (
                <form onSubmit={handleFormSubmit} className={styles.form}>
                    <h2>Add a New License</h2>
                    {formError && <p style={{ color: 'var(--color-error)', textAlign: 'center' }}>{formError}</p>}

                    <div className={styles.formGroup}>
                        <label htmlFor="licenseType" className={styles.label}>License Type</label>
                        <input type="text" id="licenseType" name="licenseType" value={formData.licenseType} onChange={handleInputChange} className={styles.input} placeholder="e.g., Driver's License" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="licenseNumber" className={styles.label}>License Number</label>
                        <input type="text" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} className={styles.input} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="expiryDate" className={styles.label}>Expiry Date (Optional)</label>
                        <input type="date" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className={styles.input} />
                    </div>

                    <div className={styles.formButtons}>
                        <button type="button" onClick={() => { setShowForm(false); setFormError(''); }} className={styles.cancelButton}>Cancel</button>
                        <button type="submit" className={styles.addButton} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save License'}
                        </button>
                    </div>
                </form>
            )}

    

<div className={styles.licenseList}>
    {!isLoading && licenses.length === 0 ? (
        <p>You haven't added any licenses yet. Click the button above to get started!</p>
    ) : (
        licenses.map((license) => (
            <div
                key={license._id}
                // Use the new card status class
                className={`${styles.licenseCard} ${styles[`card_${license.status ?? 'active'}`]}`}
            >
                {/* Use the new status pill */}
                <span
                    className={`${styles.statusPill} ${styles[`status_${license.status ?? 'active'}`]}`}
                >
                    {license.status?.replace('_', ' ') ?? 'Active'}
                </span>

                <h3>{license.licenseType}</h3>
                <p>
                    <strong>Number:</strong> {license.licenseNumber}
                </p>
                {license.expiryDate && (
                    <p>
                        <strong>Expires on:</strong> {new Date(license.expiryDate).toLocaleDateString()}
                    </p>
                )}
            </div>
        ))
    )}
</div>
        </div>
    );
};

export default MyLicensesPage;