// /client/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* The Router must be the outermost component */}
    <Router>
      {/* AuthProvider goes inside the Router */}
      <AuthProvider>
        {/* App goes inside the AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);