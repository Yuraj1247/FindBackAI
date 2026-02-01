import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ReportFound from './pages/ReportFound';
import SearchLost from './pages/SearchLost';
import ItemDetail from './pages/ItemDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import { ItemProvider } from './context/ItemContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProfileRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ItemProvider>
          <HashRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              <Route path="/dashboard" element={<Layout><Home /></Layout>} />
              <Route path="/report" element={<Layout><ReportFound /></Layout>} />
              <Route path="/search" element={<Layout><SearchLost /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/item/:id" element={<Layout><ItemDetail /></Layout>} />
              <Route path="/profile" element={<Layout><ProfileRoute /></Layout>} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </ItemProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;