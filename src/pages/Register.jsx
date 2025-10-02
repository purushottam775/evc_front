import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoogleButton from '../components/GoogleButton';
import { showError } from '../utils/toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    vehicle_number: '',
    vehicle_type: '',
    role: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicleNumberError, setVehicleNumberError] = useState('');
  const [checkingVehicle, setCheckingVehicle] = useState(false);
  
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Google OAuth handlers
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const result = await googleLogin(credentialResponse);
    
    if (result.success) {
      // Immediate navigation for faster UX
      if (result.user.isAdmin || result.user.role === 'super admin' || result.user.role === 'station manager') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/user/dashboard', { replace: true });
      }
      return; // Exit early
    }
    
    setLoading(false);
  };

  const handleGoogleError = () => {
    console.log('Google Registration Failed');
    showError('Google registration failed. Please try again.');
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateVehicleNumber = (vehicleNum) => {
    // Common formats: AB12CD3456, AB-12-CD-3456, AB 12 CD 3456
    const vehicleRegex = /^[A-Z]{2}[-\s]?[0-9]{1,2}[-\s]?[A-Z]{1,2}[-\s]?[0-9]{4}$/i;
    return vehicleRegex.test(vehicleNum.trim());
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  // Check if vehicle number is available
  const checkVehicleNumberAvailability = async (vehicleNumber) => {
    if (!vehicleNumber || !validateVehicleNumber(vehicleNumber)) {
      setVehicleNumberError('');
      return;
    }

    setCheckingVehicle(true);
    try {
      // This would require a backend endpoint to check vehicle number availability
      // For now, we'll just clear any previous errors
      setVehicleNumberError('');
    } catch (error) {
      console.error('Error checking vehicle number:', error);
    } finally {
      setCheckingVehicle(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Real-time formatting for phone number
    if (name === 'phone_number') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 10) {
        setFormData({
          ...formData,
          [name]: numbersOnly
        });
      }
      return;
    }

    // Real-time formatting for vehicle number
    if (name === 'vehicle_number') {
      const upperValue = value.toUpperCase();
      setFormData({
        ...formData,
        [name]: upperValue
      });
      
      // Check vehicle number availability after a delay
      if (upperValue.length >= 6) {
        setTimeout(() => {
          checkVehicleNumberAvailability(upperValue);
        }, 500);
      } else {
        setVehicleNumberError('');
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(formData.email)) {
      showError('Please enter a valid email address');
      return;
    }

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      showError(passwordError);
      return;
    }

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    // Validate user-specific fields
    if (!isAdmin) {
      if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) {
        showError('Phone number must be exactly 10 digits');
        return;
      }

      if (formData.vehicle_number && !validateVehicleNumber(formData.vehicle_number)) {
        showError('Please enter a valid vehicle number (e.g., AB12CD3456)');
        return;
      }
    }

    // Validate admin role
    if (isAdmin && !formData.role) {
      showError('Please select an admin role');
      return;
    }

    setLoading(true);

    const dataToSend = isAdmin 
      ? { name: formData.name, email: formData.email, password: formData.password, role: formData.role }
      : { 
          name: formData.name, 
          email: formData.email, 
          password: formData.password,
          phone_number: formData.phone_number || null,
          vehicle_number: formData.vehicle_number || null,
          vehicle_type: formData.vehicle_type || null
        };

    const result = await register(dataToSend, isAdmin);
    
    if (result.success) {
      // Toast notification will be shown by AuthContext
      setTimeout(() => {
        navigate('/login');
      }, 800); // Reduced from 1500ms to 800ms
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="mt-2 text-gray-600">Join us today</p>
            </div>

            {/* Google Sign-Up */}
            {!isAdmin && (
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <GoogleButton
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    text="Sign up with Google"
                    disabled={loading}
                  />
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                  title="Enter a valid email address"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a valid email address</p>
              </div>

              {!isAdmin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="9876543210"
                      maxLength="10"
                      pattern="\d{10}"
                      title="Enter exactly 10 digits"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number without country code</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="vehicle_number"
                        value={formData.vehicle_number}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition uppercase ${
                          vehicleNumberError 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-green-500'
                        }`}
                        placeholder="MH12AB1234"
                        maxLength="13"
                        title="Enter vehicle registration number"
                      />
                      {checkingVehicle && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                        </div>
                      )}
                    </div>
                    {vehicleNumberError ? (
                      <p className="text-xs text-red-600 mt-1">{vehicleNumberError}</p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Format: MH12AB1234 or MH-12-AB-1234</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <input
                      type="text"
                      name="vehicle_type"
                      value={formData.vehicle_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="Tesla Model 3"
                    />
                    <p className="text-xs text-gray-500 mt-1">e.g., Tesla Model 3, Tata Nexon EV</p>
                  </div>
                </>
              )}

              {isAdmin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Role
                  </label>
                  <select
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  >
                    <option value="">Select Role</option>
                    <option value="super admin">Super Admin</option>
                    <option value="station manager">Station Manager</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  minLength="6"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters with uppercase, lowercase, and number
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  minLength="6"
                />
                <p className="text-xs text-gray-500 mt-1">Re-enter your password</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
                  Register as Admin
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;

