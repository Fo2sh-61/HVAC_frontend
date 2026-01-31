import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ConnectionTest from './pages/ConnectionTest';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/Services';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';

// Engineer Pages
import EngineerDashboard from './pages/engineer/Dashboard';

// Home redirect component
const Home = () => {
  const { user, isAdmin, isCustomer, isEngineer } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  
  if (isAdmin) return <Navigate to="/admin" replace />;
  if (isCustomer) return <Navigate to="/customer" replace />;
  if (isEngineer) return <Navigate to="/engineer" replace />;
  
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test-connection" element={<ConnectionTest />} />

            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/engineers"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Customer Routes */}
            <Route
              path="/customer"
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/services"
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/requests"
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/reviews"
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Engineer Routes */}
            <Route
              path="/engineer"
              element={
                <ProtectedRoute allowedRoles={['Engineer']}>
                  <EngineerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/engineer/requests"
              element={
                <ProtectedRoute allowedRoles={['Engineer']}>
                  <EngineerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
