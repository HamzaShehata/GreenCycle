import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import FaqPage from './pages/FaqPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RequestPage from './pages/RequestPage';
import MyRequestsPage from './pages/MyRequestsPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import CollectorPage from './pages/CollectorPage';
import InventoryPage from './pages/InventoryPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['individual']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request"
          element={
            <ProtectedRoute allowedRoles={['individual']}>
              <RequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-requests"
          element={
            <ProtectedRoute allowedRoles={['individual']}>
              <MyRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute allowedRoles={['individual']}>
              <WalletPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/collector"
          element={
            <ProtectedRoute allowedRoles={['collector']}>
              <CollectorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={['factory']}>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;