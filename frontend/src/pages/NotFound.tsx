import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <button
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return to {isAuthenticated ? 'Dashboard' : 'Home'}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
