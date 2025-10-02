import api from '../utils/api';

// =================== USER AUTHENTICATION ===================

const userAPI = {
  // Authentication
  register: (userData) => api.post('/users/register', userData),
  login: (email, password) => api.post('/users/login', { email, password }),
  verifyUser: (token) => api.get(`/users/verify/${token}`),
  
  // Password Reset
  forgotPassword: (email) => api.post('/users/reset-password', { email }),
  resetPasswordWithOTP: (email, otp, newPassword) => 
    api.post('/users/reset-password/confirm', { email, otp, newPassword }),
  
  // Profile Management
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getUserStats: (userId) => api.get(`/users/stats/${userId}`),
  
  // Google OAuth
  googleAuth: () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${api.defaults.baseURL}/users/google`;
  },
  
  // Handle Google OAuth callback (for manual token verification)
  verifyGoogleToken: (token) => api.post('/users/google/verify', { token }),
};

// =================== ADMIN AUTHENTICATION ===================

const adminAPI = {
  // Authentication
  register: (adminData) => api.post('/admins/register', adminData),
  login: (email, password) => api.post('/admins/login', { email, password }),
  getDashboard: () => api.get('/admins/dashboard'),
};

// =================== ADMIN USER MANAGEMENT ===================

const adminUserAPI = {
  // User Management
  getAllUsers: () => api.get('/admins/users'),
  blockUser: (userId) => api.put(`/admins/users/block/${userId}`),
  unblockUser: (userId) => api.put(`/admins/users/unblock/${userId}`),
  updateUser: (userId, userData) => api.put(`/admins/users/update/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/admins/users/delete/${userId}`),
};

// =================== CHARGING STATIONS ===================

const stationAPI = {
  // Public endpoints
  listStations: () => api.get('/stations'),
  
  // Admin endpoints
  addStation: (stationData) => api.post('/stations', stationData),
  updateStation: (stationId, stationData) => api.put(`/stations/${stationId}`, stationData),
  deleteStation: (stationId) => api.delete(`/stations/${stationId}`),
};

// =================== CHARGING SLOTS ===================

const slotAPI = {
  // Public endpoints
  listSlots: (stationId) => api.get(`/slots/station/${stationId}`),
  
  // Admin endpoints
  getAllSlots: () => api.get('/slots'),
  addSlot: (slotData) => api.post('/slots', slotData),
  updateSlot: (slotId, slotData) => api.put(`/slots/${slotId}`, slotData),
  deleteSlot: (slotId) => api.delete(`/slots/${slotId}`),
};

// =================== USER BOOKINGS ===================

const userBookingAPI = {
  // User booking operations
  createBooking: (bookingData) => api.post('/bookings/user', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  updateBooking: (bookingId, bookingData) => api.put(`/bookings/user/${bookingId}`, bookingData),
  cancelBooking: (bookingId) => api.put(`/bookings/user/${bookingId}/cancel`),
};

// =================== ADMIN BOOKINGS ===================

const adminBookingAPI = {
  // Admin booking operations
  getPendingBookings: () => api.get('/bookings/admin/pending'),
  approveBooking: (bookingId) => api.put(`/bookings/admin/${bookingId}/approve`),
  rejectBooking: (bookingId) => api.put(`/bookings/admin/${bookingId}/reject`),
};

// =================== COMBINED BOOKING API ===================
// For backwards compatibility with existing code

const bookingAPI = {
  // User operations
  create: (bookingData) => userBookingAPI.createBooking(bookingData),
  getUserBookings: () => userBookingAPI.getUserBookings(),
  update: (bookingId, bookingData) => userBookingAPI.updateBooking(bookingId, bookingData),
  cancel: (bookingId) => userBookingAPI.cancelBooking(bookingId),
  
  // Admin operations
  getPending: () => adminBookingAPI.getPendingBookings(),
  approve: (bookingId) => adminBookingAPI.approveBooking(bookingId),
  reject: (bookingId) => adminBookingAPI.rejectBooking(bookingId),
};

// =================== UTILITY FUNCTIONS ===================

const apiUtils = {
  // Handle API errors consistently
  handleError: (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    const status = error.response?.status;
    
    console.error('API Error:', { message, status, error });
    
    return {
      success: false,
      message,
      status,
      error
    };
  },
  
  // Handle API success responses consistently
  handleSuccess: (response, customMessage = null) => {
    const message = customMessage || response.data?.message || 'Operation successful';
    
    return {
      success: true,
      message,
      data: response.data,
      status: response.status
    };
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },
  
  // Get current user data
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Check if current user is admin
  isAdmin: () => {
    const user = apiUtils.getCurrentUser();
    return user?.isAdmin || user?.role === 'super admin' || user?.role === 'station manager';
  }
};

// =================== EXPORT ALL APIS ===================

export default {
  user: userAPI,
  admin: adminAPI,
  adminUser: adminUserAPI,
  station: stationAPI,
  slot: slotAPI,
  userBooking: userBookingAPI,
  adminBooking: adminBookingAPI,
  booking: bookingAPI,
  utils: apiUtils
};

// Named exports for convenience
export {
  userAPI,
  adminAPI,
  adminUserAPI,
  stationAPI,
  slotAPI,
  userBookingAPI,
  adminBookingAPI,
  bookingAPI,
  apiUtils
};