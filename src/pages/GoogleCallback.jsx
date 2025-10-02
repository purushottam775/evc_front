import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FastRedirect from '../components/FastRedirect';

const GoogleCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Check for error in URL params
        const errorParam = searchParams.get('error');
        if (errorParam) {
          const errorDescription = searchParams.get('error_description') || 'Authentication failed';
          
          // Show browser alert for blocked users
          if (errorParam === 'account_blocked' || errorDescription.includes('blocked')) {
            alert('Your account is blocked. Contact admin.');
          }
          
          throw new Error(errorDescription);
        }

        // Handle successful authentication
        const result = await handleGoogleCallback(searchParams);
        
        if (result.success) {
          // Prepare for fast redirect
          setLoading(false);
          setSuccess(true);
          setUser(result.user);
          
          // Determine redirect destination
          const destination = (result.user.isAdmin || result.user.role === 'super admin' || result.user.role === 'station manager') 
            ? '/admin/dashboard' 
            : '/user/dashboard';
          
          setRedirectTo(destination);
        } else {
          throw new Error(result.message || 'Authentication failed');
        }
      } catch (err) {
        console.error('Google OAuth callback error:', err);
        setError(err.message);
        setLoading(false);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    processCallback();
  }, [searchParams, handleGoogleCallback, navigate]);

  if (success && redirectTo) {
    return <FastRedirect to={redirectTo} user={user} delay={400} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Signing you in...</h2>
          <p className="text-gray-500">Please wait while we complete your Google authentication.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-red-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-semibold text-red-700 mb-2">Authentication Failed</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-500 text-sm">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default GoogleCallback;