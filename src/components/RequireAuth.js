import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  const location = useLocation();

  if (!auth || !auth.uid) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Logged in, render children
  return children;
}