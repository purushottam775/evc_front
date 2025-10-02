import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError } from '../utils/toast';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/user/dashboard');
      return;
    }

    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    // Verify the token by calling the backend
    verifyToken(token);
  }, [searchParams, isAuthenticated, navigate]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/verify/${token}`);
      
      if (response.ok) {
        setStatus('success');
        setMessage('Your email has been verified successfully! You can now login to your account.');
        showSuccess('Email verified successfully! You can now login.');
        
        // Start countdown for auto-redirect
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        // Cleanup timer on component unmount
        return () => clearInterval(timer);
      } else {
        setStatus('error');
        setMessage('Invalid or expired verification token. Please request a new verification email.');
        showError('Verification failed. Please try again or request a new verification email.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('Failed to verify email. Please check your internet connection and try again.');
      showError('Network error. Please check your connection and try again.');
    }
  };

  const resendVerification = async () => {
    // This would require implementing a resend verification endpoint
    showError('Please contact support to resend verification email, or try registering again.');
    setMessage('Please contact support to resend verification email, or try registering again.');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-green-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">Verifying your email</h3>
            <p className="mt-2 text-gray-600">Please wait while we confirm your account...</p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          {status === 'success' ? (
            <>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Email Verified Successfully
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {message}
                </p>
                
                {/* Success Animation */}
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-green-800">
                        <strong>Your account is now active!</strong> You can access all features of the EV Charge platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Link
                    to="/login"
                    className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Continue to Login
                  </Link>
                  
                  <div className="text-center">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <p className="text-xs text-gray-600">
                        You will be redirected to the login page in <span className="font-semibold text-green-600">{countdown} seconds</span>
                      </p>
                      <button
                        onClick={() => navigate('/login')}
                        className="text-xs text-green-600 hover:text-green-700 underline mt-2 font-medium transition-colors duration-200"
                      >
                        Click here to go now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Verification Failed
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {message}
                </p>
                
                {/* Error Information */}
                <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-red-800 font-semibold mb-2">
                        Possible reasons:
                      </p>
                      <ul className="text-xs text-red-700 space-y-1">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                          Verification link has expired
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                          Link has already been used
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                          Invalid verification token
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={resendVerification}
                    className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Resend Verification Email
                  </button>
                  
                  <Link
                    to="/register"
                    className="w-full flex justify-center py-4 px-6 border border-gray-300 rounded-xl shadow-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Register Again
                  </Link>
                  
                  <Link
                    to="/login"
                    className="w-full flex justify-center py-3 px-6 border border-transparent text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200 font-semibold"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              If you're having trouble verifying your email, please check your spam folder or contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;