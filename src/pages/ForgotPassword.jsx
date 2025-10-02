import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showError } from '../utils/toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingReset, setLoadingReset] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error('Send OTP error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Comprehensive validation with specific error messages
    if (!otp) {
      showError('Please enter the OTP sent to your email');
      return;
    }
    
    if (otp.length !== 6) {
      showError('OTP must be exactly 6 digits');
      return;
    }
    
    if (!/^\d{6}$/.test(otp)) {
      showError('OTP must contain only numbers');
      return;
    }
    
    if (!newPassword) {
      showError('Please enter a new password');
      return;
    }
    
    if (newPassword.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }
    
    if (newPassword.length > 128) {
      showError('Password must be less than 128 characters');
      return;
    }
    
    if (!confirmPassword) {
      showError('Please confirm your new password');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }
    
    // Check for common weak passwords
    const weakPasswords = ['123456', 'password', '123456789', 'qwerty', 'abc123'];
    if (weakPasswords.includes(newPassword.toLowerCase())) {
      showError('Please choose a stronger password');
      return;
    }

    setLoadingReset(true);
    try {
      const result = await resetPassword(email, otp, newPassword);
      if (result.success) {
        alert('Password reset successful! You can now login with your new password.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      // Show specific error message from backend if available
      const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again.';
      showError(errorMessage);
    } finally {
      setLoadingReset(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    
    // Clear error when user starts typing
    if (otpError) setOtpError('');
    
    // Real-time validation
    if (value && value.length !== 6) {
      setOtpError('OTP must be exactly 6 digits');
    } else if (value && !/^\d{6}$/.test(value)) {
      setOtpError('OTP must contain only numbers');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    
    // Clear errors when user starts typing
    if (passwordError) setPasswordError('');
    if (confirmPasswordError) setConfirmPasswordError('');
    
    // Real-time validation
    if (value && value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else if (value && value.length > 128) {
      setPasswordError('Password must be less than 128 characters');
    } else {
      const weakPasswords = ['123456', 'password', '123456789', 'qwerty', 'abc123'];
      if (value && weakPasswords.includes(value.toLowerCase())) {
        setPasswordError('Please choose a stronger password');
      }
    }
    
    // Check confirm password match if it exists
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (confirmPassword && value === confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    // Clear error when user starts typing
    if (confirmPasswordError) setConfirmPasswordError('');
    
    // Real-time validation
    if (value && newPassword && value !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {otpSent ? 'Reset Your Password' : 'Forgot Password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {otpSent 
              ? 'Enter the OTP sent to your email and your new password'
              : 'Enter your email address and we\'ll send you an OTP to reset your password'
            }
          </p>
        </div>

        {!otpSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-blue-400">📧</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    OTP has been sent to <strong>{email}</strong>. Check your email and enter the 6-digit code below.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP Code *
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={handleOtpChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${otpError ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm text-center text-2xl tracking-widest`}
                placeholder="000000"
                maxLength="6"
              />
              {otpError ? (
                <p className="mt-1 text-xs text-red-600">{otpError}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Enter the 6-digit code from your email</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password *
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={handlePasswordChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Enter new password"
              />
              {passwordError ? (
                <p className="mt-1 text-xs text-red-600">{passwordError}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm new password"
              />
              {confirmPasswordError && (
                <p className="mt-1 text-xs text-red-600">{confirmPasswordError}</p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loadingReset}
                className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingReset ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;