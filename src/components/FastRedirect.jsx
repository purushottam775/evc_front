import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FastRedirect = ({ to, user, delay = 0 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      navigate(to, { replace: true });
    };

    if (delay > 0) {
      const timer = setTimeout(redirect, delay);
      return () => clearTimeout(timer);
    } else {
      redirect();
    }
  }, [navigate, to, delay]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
      <div className="text-center">
        <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          Welcome{user?.name ? `, ${user.name}` : ''}!
        </h2>
        <p className="text-gray-600 mb-4">Taking you to your dashboard...</p>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
        </div>
      </div>
    </div>
  );
};

export default FastRedirect;