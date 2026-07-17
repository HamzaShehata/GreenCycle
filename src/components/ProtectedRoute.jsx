import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleHome = { individual: '/dashboard', collector: '/collector', factory: '/inventory', admin: '/admin' };
    return <Navigate to={roleHome[user.role] || '/'} replace />;
  }

  return children;
}