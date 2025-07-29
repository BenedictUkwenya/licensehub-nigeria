// /client/src/context/AuthContext.tsx

import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of our user object, including the token
export interface IUser {
    _id: string;
    name: string;
    email: string;
    token: string;
}

// Define the shape of the context's value
interface AuthContextType {
    user: IUser | null;
    login: (userData: IUser) => void;
    logout: () => void;
    isLoading: boolean;
}

// Create the context with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start as true to check localStorage
    const navigate = useNavigate();

    // On initial app load, check if user info is in localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('licenseHubUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false); // Finished checking
    }, []);

    const login = (userData: IUser) => {
        localStorage.setItem('licenseHubUser', JSON.stringify(userData));
        setUser(userData);
        navigate('/dashboard'); // Navigate after successful login
    };

    const logout = () => {
        localStorage.removeItem('licenseHubUser');
        setUser(null);
        navigate('/login'); // Navigate to login after logout
    };

    const value = { user, login, logout, isLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for easy access to the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};