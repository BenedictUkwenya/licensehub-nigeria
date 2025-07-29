// /client/src/services/api.ts
import axios from 'axios'; // We ONLY need the main axios import.


const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL 
});

// Remove the type annotation from the 'config' parameter.
// TypeScript will automatically know its type.
api.interceptors.request.use(
    (config) => {
        try {
            const userJson = localStorage.getItem('licenseHubUser');

            if (userJson) {
                const user = JSON.parse(userJson);
                
                if (user && user.token) {
                    // This logic remains the same.
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            }
        } catch (error) {
            console.error('Error processing auth token from localStorage', error);
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;