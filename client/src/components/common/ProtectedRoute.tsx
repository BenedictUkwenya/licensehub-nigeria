// /client/src/components/common/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();

    // While checking for user from localStorage, show nothing or a loader
    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }
    
    // If loading is finished and there's no user, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    // If the user exists, render the child components (the protected page)
    return <>{children}</>;
};

export default ProtectedRoute;