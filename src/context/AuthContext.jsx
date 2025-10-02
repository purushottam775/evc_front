import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Optimized popup function - non-blocking
  const showPopup = (message, type = 'error') => {
    console.log(`AuthContext showing ${type} popup:`, message);
    
    // Use console for development, can be replaced with toast in production
    if (type === 'success') {
      console.log(`✅ SUCCESS: ${message}`);
    } else {
      console.error(`❌ ERROR: ${message}`);
    }
    
    // Non-blocking notification - only show alert for critical errors
    if (type === 'error' && message.includes('server') || message.includes('network')) {
      setTimeout(() => alert(message), 100); // Delayed to not block navigation
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? '/admins/login' : '/users/login';
      const response = await api.post(endpoint, { email, password });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      showPopup(`Welcome back, ${userData.name}!`, 'success');
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      
      const statusCode = error.response?.status;
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      
      console.log('AuthContext: Error details:', { statusCode, message });
      
      // Show specific error popups for different scenarios with single popup
      if (statusCode === 401) {
        // Unauthorized - Invalid credentials - show actual backend message
        console.log('AuthContext: Showing 401 error popup with message:', message);
        showPopup(message, 'error');
      } else if (statusCode === 403) {
        // Forbidden - Account blocked or unverified - show actual backend message
        console.log('AuthContext: Showing 403 error popup');
        showPopup(message, 'error');
      } else if (statusCode === 400) {
        // Bad request - Missing or invalid fields - show actual backend message
        console.log('AuthContext: Showing 400 error popup');
        showPopup(message, 'error');
      } else if (!error.response) {
        // Network error - Server not reachable
        console.log('AuthContext: Showing network error popup');
        showPopup('Cannot connect to server. Please check your connection.', 'error');
      } else {
        // Other errors - show actual backend message
        console.log('AuthContext: Showing generic error popup');
        showPopup(message, 'error');
      }
      
      return { 
        success: false, 
        message 
      };
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      // Method 1: Use credential token (if backend supports it)
      // This would require backend to verify the Google JWT token
      const response = await api.post('/users/google/verify', {
        token: credentialResponse.credential
      });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      showPopup(`Welcome back, ${userData.name}!`, 'success');
      
      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || 'Google authentication failed';
      
      // Show browser alert for blocked users
      if (message.includes('blocked') || message.includes('Contact admin')) {
        alert('Your account is blocked. Contact admin.');
      } else {
        showPopup(message, 'error');
      }
      
      return { success: false, message };
    }
  };

  // Alternative Google OAuth method using redirect flow
  const googleLoginRedirect = () => {
    // Redirect to backend Google OAuth endpoint
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.location.href = `${backendUrl}/users/google`;
  };

  // Handle Google OAuth callback (for redirect flow)
  const handleGoogleCallback = async (urlParams) => {
    try {
      const token = urlParams.get('token');
      const userStr = urlParams.get('user');
      
      if (token && userStr) {
        const userData = JSON.parse(decodeURIComponent(userStr));
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        showPopup(`Welcome back, ${userData.name}!`, 'success');
        
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid callback parameters');
      }
    } catch (error) {
      const message = 'Google authentication callback failed';
      showPopup(message, 'error');
      return { success: false, message };
    }
  };

  const register = async (userData, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? '/admins/register' : '/users/register';
      const response = await api.post(endpoint, userData);
      
      if (isAdmin) {
        showPopup('Admin registration successful! Please login to continue.', 'success');
      } else {
        showPopup('Registration successful! Please check your email to verify your account before logging in.', 'success');
      }
      
      return { 
        success: true, 
        message: response.data.message,
        user: response.data.user,
        needsVerification: !isAdmin
      };
    } catch (error) {
      const statusCode = error.response?.status;
      const message = error.response?.data?.message || 'Registration failed';
      
      // Show specific error messages
      if (message.toLowerCase().includes('already exists')) {
        showPopup('This email is already registered. Please login instead.', 'error');
      } else if (message.toLowerCase().includes('duplicate entry') && message.toLowerCase().includes('vehicle_number')) {
        showPopup('This vehicle number is already registered. Please use a different vehicle number.', 'error');
      } else if (message.toLowerCase().includes('duplicate entry')) {
        showPopup('This information is already registered. Please check your details.', 'error');
      } else if (statusCode === 400) {
        showPopup(message, 'error');
      } else {
        showPopup('Registration failed. Please try again.', 'error');
      }
      
      return { 
        success: false, 
        message
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    showPopup('Logged out successfully!', 'success');
    window.location.href = '/';
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Forgot Password - Send OTP
  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/users/reset-password', { email });
      showPopup('OTP sent to your email. It is valid for 10 minutes.', 'success');
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send OTP';
      showPopup(message, 'error');
      return { success: false, message };
    }
  };

  // Reset Password with OTP
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await api.post('/users/reset-password/confirm', {
        email,
        otp,
        newPassword
      });
      showPopup('Password reset successfully! You can now login with your new password.', 'success');
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password';
      showPopup(message, 'error');
      return { success: false, message };
    }
  };

  // Test function to verify popup system
  const testAuthPopup = () => {
    console.log('AuthContext: Testing popup system...');
    showPopup('AuthContext test popup - This should always show!', 'error');
  };

  const value = {
    user,
    loading,
    login,
    googleLogin,
    googleLoginRedirect,
    handleGoogleCallback,
    register,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
    testAuthPopup,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || user?.role === 'super admin' || user?.role === 'station manager',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
