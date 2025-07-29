// /client/src/pages/Register/RegisterPage.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RegisterPage.module.css'; // <-- Import the CSS Module

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            await axios.post('/api/users/register', {
                name,
                email,
                password
            });
            
            // On success, redirect to the login page
            navigate('/login');

        } catch (err: any) {
            const message = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Create Your Account</h1>
                <p className={styles.subtitle}>Get started with LicenseHub Nigeria</p>
                
                {error && <p className={styles.error}>{error}</p>}
                
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
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                 <p style={{textAlign: 'center', marginTop: '1.5rem'}}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;