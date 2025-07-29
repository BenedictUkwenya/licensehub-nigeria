// /client/src/pages/Dashboard/ProfilePage.tsx

import { useAuth } from '../../context/AuthContext';
// Reuse the same styles for consistency
import styles from './MyLicensesPage.module.css'; 

const ProfilePage = () => {
    // Get the current logged-in user's data from our global AuthContext
    const { user } = useAuth();

    // The user object from context might be null briefly while loading, so we check for it
    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>My Profile</h1>
            </div>

            <div className={styles.licenseCard}> {/* Reusing the card style for a clean look */}
                <h3>User Information</h3>
                <p>
                    <strong>Name:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>User ID:</strong> {user._id}
                </p>
            </div>
            
            <div className={`${styles.licenseCard}`} style={{marginTop: '2rem'}}>
                <h3>Update Password</h3>
                <p>Password update functionality will be added in a future version.</p>
                {/* We would add a password change form here later */}
            </div>
        </div>
    );
};

export default ProfilePage;