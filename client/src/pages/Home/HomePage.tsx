// /client/src/pages/Home/HomePage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom'; 
import api from '../../services/api'; 
// Define the shape of a single service/license
interface IService {
    _id: string;
    name: string;
    description: string;
    category: string;
}

const HomePage = () => {
    const [description, setDescription] = useState('');
    const [recommendations, setRecommendations] = useState<IService[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setRecommendations([]);

        try {
            // --- 2. THIS IS THE FIX ---
            // Use our 'api' instance and remove the '/api' prefix
            const { data } = await api.post<IService[]>('/services/recommend', { description });
            setRecommendations(data);
        } catch (err) {
            setError('Could not fetch recommendations. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <section className={styles.hero}>
                <h1 className={styles.title}>Nigeria's Smartest Licensing Tool</h1>
                <p className={styles.subtitle}>
                    Stop the guesswork. Describe your business, and we'll tell you exactly what licenses you need to operate legally.
                </p>

                <div className={styles.recommenderBox}>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className={styles.textarea}
                            placeholder="e.g., 'I want to start a business selling packaged water and food products.'"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? 'Analyzing...' : 'Get My Recommendations'}
                        </button>
                    </form>
                </div>
            </section>

            {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
            
            {recommendations.length > 0 && (
                <section className={styles.resultsSection}>
                    <h2 style={{ textAlign: 'center' }}>Recommended For You</h2>
                    <div className={styles.resultsGrid}>
    {recommendations.map(service => (
        <div key={service._id} className={styles.serviceCard}>
            <span className={styles.category}>{service.category}</span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            
            <Link to={`/apply/${service._id}`} className={styles.button}>
                Start Application
            </Link>
        </div>
    ))}
</div>
                </section>
            )}
        </div>
    );
};

export default HomePage;