// /client/src/pages/Login/LoginPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom'; // No need for useNavigate, context handles it
import axios from 'axios';
import styles from './LoginPage.module.css';
import { type IUser, useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const LoginPage = () => {
    // State for managing form inputs and UI feedback
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Get the 'login' function from our authentication context
    const { login } = useAuth();

    // Handler for form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Basic client-side validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Make the API call to the backend's login endpoint
            const response = await axios.post<IUser>('/api/users/login', { email, password });

            // If the request is successful, 'response.data' will contain our user object and token.
            // We pass this data to our global 'login' function from the AuthContext.
            // The context will handle storing the user and navigating to the dashboard.
            login(response.data);

        } catch (err: any) {
            // If the API call fails, the error will be caught here.
            // We get the error message from the backend's response.
            const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(message);
            setLoading(false); // Make sure to stop the loading state on error
        }
        // There is no 'finally' block needed, as loading is handled on success by navigation, and on error in the catch block.
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Log in to access your dashboard</p>

                {/* Display an error message if one exists */}
                {error && <p className={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            id="password"
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;