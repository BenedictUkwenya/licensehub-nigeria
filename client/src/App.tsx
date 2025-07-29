// FINAL CORRECTED /client/src/App.tsx

import { Routes, Route } from 'react-router-dom';

// Layout Components
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Page Components
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import MyLicensesPage from './pages/Dasboard/MyLicensesPage';
import ApplicationPage from './pages/Apply/ApplicationPage'; // <-- Import new application page
import BusinessAppsPage from './pages/Dasboard/BusinessAppsPage'; 
import ProfilePage from './pages/Dasboard/ProfilePage';
import OverviewPage from './pages/Dasboard/OverviewPage';
// Placeholder components for other dashboard pages
const DashboardOverview = () => <h1>Dashboard Overview</h1>;
const BusinessApps = () => <h1>My Business Applications</h1>;
const Profile = () => <h1>My Profile</h1>;
// /client/src/App.tsx
 

function App() {
  return (
    <Routes>
      {/* ... keep public and auth routes ... */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />

{/* --- Auth routes with no header/layout --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      
      {/* ADD A NEW PROTECTED ROUTE for the application form */}
      <Route path="/apply/:serviceId" element={
        <ProtectedRoute>
          <Layout>
            <ApplicationPage />
          </Layout>
        </ProtectedRoute>
      } />

      {/* --- Protected Dashboard Routes --- */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardLayout />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="my-licenses" element={<MyLicensesPage />} />
        <Route path="business-apps" element={<BusinessAppsPage />} /> {/* <-- Use the new component */}
        <Route path="profile" element={<ProfilePage />} /> 
      </Route>
      
    </Routes>
  );
}

export default App;