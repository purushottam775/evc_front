# API Integration Guide

This guide explains how to use all the backend API endpoints in the frontend application.

## Table of Contents
1. [API Service Overview](#api-service-overview)
2. [Authentication APIs](#authentication-apis)
3. [User Management APIs](#user-management-apis)
4. [Station Management APIs](#station-management-apis)
5. [Slot Management APIs](#slot-management-apis)
6. [Booking Management APIs](#booking-management-apis)
7. [Google OAuth Integration](#google-oauth-integration)
8. [Usage Examples](#usage-examples)

## API Service Overview

All API endpoints are organized in `src/services/apiService.js`. Import the specific API you need:

```javascript
import { userAPI, adminAPI, stationAPI, slotAPI, bookingAPI } from '../services/apiService';
```

## Authentication APIs

### User Authentication

```javascript
import { userAPI } from '../services/apiService';

// Register a new user
const registerUser = async (userData) => {
  try {
    const response = await userAPI.register({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "1234567890",
      vehicle_number: "ABC123"
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration failed:', error.response.data.message);
  }
};

// Login user
const loginUser = async () => {
  try {
    const response = await userAPI.login("john@example.com", "password123");
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
};

// Verify user email
const verifyUser = async (token) => {
  try {
    const response = await userAPI.verifyUser(token);
    console.log('Verification successful:', response.data);
  } catch (error) {
    console.error('Verification failed:', error.response.data.message);
  }
};

// Forgot password
const forgotPassword = async () => {
  try {
    const response = await userAPI.forgotPassword("john@example.com");
    console.log('OTP sent:', response.data);
  } catch (error) {
    console.error('Failed to send OTP:', error.response.data.message);
  }
};

// Reset password with OTP
const resetPassword = async () => {
  try {
    const response = await userAPI.resetPasswordWithOTP(
      "john@example.com", 
      "123456", 
      "newpassword123"
    );
    console.log('Password reset successful:', response.data);
  } catch (error) {
    console.error('Password reset failed:', error.response.data.message);
  }
};

// Get user profile
const getProfile = async () => {
  try {
    const response = await userAPI.getProfile();
    console.log('Profile:', response.data);
  } catch (error) {
    console.error('Failed to get profile:', error.response.data.message);
  }
};

// Update user profile
const updateProfile = async () => {
  try {
    const response = await userAPI.updateProfile({
      name: "John Updated",
      phone: "9876543210"
    });
    console.log('Profile updated:', response.data);
  } catch (error) {
    console.error('Failed to update profile:', error.response.data.message);
  }
};
```

### Admin Authentication

```javascript
import { adminAPI } from '../services/apiService';

// Register admin
const registerAdmin = async () => {
  try {
    const response = await adminAPI.register({
      name: "Admin User",
      email: "admin@example.com",
      password: "adminpass123",
      role: "station manager"
    });
    console.log('Admin registered:', response.data);
  } catch (error) {
    console.error('Admin registration failed:', error.response.data.message);
  }
};

// Login admin
const loginAdmin = async () => {
  try {
    const response = await adminAPI.login("admin@example.com", "adminpass123");
    console.log('Admin login successful:', response.data);
  } catch (error) {
    console.error('Admin login failed:', error.response.data.message);
  }
};

// Get admin dashboard
const getDashboard = async () => {
  try {
    const response = await adminAPI.getDashboard();
    console.log('Dashboard data:', response.data);
  } catch (error) {
    console.error('Failed to get dashboard:', error.response.data.message);
  }
};
```

## User Management APIs (Admin Only)

```javascript
import { adminUserAPI } from '../services/apiService';

// Get all users
const getAllUsers = async () => {
  try {
    const response = await adminUserAPI.getAllUsers();
    console.log('All users:', response.data);
  } catch (error) {
    console.error('Failed to get users:', error.response.data.message);
  }
};

// Block a user
const blockUser = async (userId) => {
  try {
    const response = await adminUserAPI.blockUser(userId);
    console.log('User blocked:', response.data);
  } catch (error) {
    console.error('Failed to block user:', error.response.data.message);
  }
};

// Unblock a user
const unblockUser = async (userId) => {
  try {
    const response = await adminUserAPI.unblockUser(userId);
    console.log('User unblocked:', response.data);
  } catch (error) {
    console.error('Failed to unblock user:', error.response.data.message);
  }
};

// Update user
const updateUser = async (userId) => {
  try {
    const response = await adminUserAPI.updateUser(userId, {
      role: "premium_user",
      status: "active"
    });
    console.log('User updated:', response.data);
  } catch (error) {
    console.error('Failed to update user:', error.response.data.message);
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    const response = await adminUserAPI.deleteUser(userId);
    console.log('User deleted:', response.data);
  } catch (error) {
    console.error('Failed to delete user:', error.response.data.message);
  }
};
```

## Station Management APIs

```javascript
import { stationAPI } from '../services/apiService';

// List all stations (public)
const listStations = async () => {
  try {
    const response = await stationAPI.listStations();
    console.log('Stations:', response.data);
  } catch (error) {
    console.error('Failed to get stations:', error.response.data.message);
  }
};

// Add station (admin only)
const addStation = async () => {
  try {
    const response = await stationAPI.addStation({
      station_name: "Downtown Charging Hub",
      location: "123 Main St, City",
      charging_type: "DC Fast",
      total_slots: 10,
      available_slots: 10,
      price_per_hour: 15.50
    });
    console.log('Station added:', response.data);
  } catch (error) {
    console.error('Failed to add station:', error.response.data.message);
  }
};

// Update station (admin only)
const updateStation = async (stationId) => {
  try {
    const response = await stationAPI.updateStation(stationId, {
      station_name: "Updated Station Name",
      price_per_hour: 18.00
    });
    console.log('Station updated:', response.data);
  } catch (error) {
    console.error('Failed to update station:', error.response.data.message);
  }
};

// Delete station (admin only)
const deleteStation = async (stationId) => {
  try {
    const response = await stationAPI.deleteStation(stationId);
    console.log('Station deleted:', response.data);
  } catch (error) {
    console.error('Failed to delete station:', error.response.data.message);
  }
};
```

## Slot Management APIs

```javascript
import { slotAPI } from '../services/apiService';

// List slots for a station (public)
const listSlots = async (stationId) => {
  try {
    const response = await slotAPI.listSlots(stationId);
    console.log('Slots:', response.data);
  } catch (error) {
    console.error('Failed to get slots:', error.response.data.message);
  }
};

// Get all slots (admin only)
const getAllSlots = async () => {
  try {
    const response = await slotAPI.getAllSlots();
    console.log('All slots:', response.data);
  } catch (error) {
    console.error('Failed to get all slots:', error.response.data.message);
  }
};

// Add slot (admin only)
const addSlot = async () => {
  try {
    const response = await slotAPI.addSlot({
      station_id: "64f8a1b2c3d4e5f6789012ab",
      slot_number: "A1",
      charging_type: "DC Fast",
      power_rating: "150kW",
      status: "available"
    });
    console.log('Slot added:', response.data);
  } catch (error) {
    console.error('Failed to add slot:', error.response.data.message);
  }
};

// Update slot (admin only)
const updateSlot = async (slotId) => {
  try {
    const response = await slotAPI.updateSlot(slotId, {
      status: "maintenance",
      power_rating: "180kW"
    });
    console.log('Slot updated:', response.data);
  } catch (error) {
    console.error('Failed to update slot:', error.response.data.message);
  }
};

// Delete slot (admin only)
const deleteSlot = async (slotId) => {
  try {
    const response = await slotAPI.deleteSlot(slotId);
    console.log('Slot deleted:', response.data);
  } catch (error) {
    console.error('Failed to delete slot:', error.response.data.message);
  }
};
```

## Booking Management APIs

### User Booking Operations

```javascript
import { userBookingAPI } from '../services/apiService';

// Create booking
const createBooking = async () => {
  try {
    const response = await userBookingAPI.createBooking({
      station_id: "64f8a1b2c3d4e5f6789012ab",
      slot_id: "64f8a1b2c3d4e5f6789012cd",
      booking_date: "2024-01-15",
      start_time: "10:00",
      end_time: "12:00",
      vehicle_number: "ABC123"
    });
    console.log('Booking created:', response.data);
  } catch (error) {
    console.error('Failed to create booking:', error.response.data.message);
  }
};

// Get user bookings
const getUserBookings = async () => {
  try {
    const response = await userBookingAPI.getUserBookings();
    console.log('User bookings:', response.data);
  } catch (error) {
    console.error('Failed to get bookings:', error.response.data.message);
  }
};

// Update booking
const updateBooking = async (bookingId) => {
  try {
    const response = await userBookingAPI.updateBooking(bookingId, {
      start_time: "11:00",
      end_time: "13:00"
    });
    console.log('Booking updated:', response.data);
  } catch (error) {
    console.error('Failed to update booking:', error.response.data.message);
  }
};

// Cancel booking
const cancelBooking = async (bookingId) => {
  try {
    const response = await userBookingAPI.cancelBooking(bookingId);
    console.log('Booking cancelled:', response.data);
  } catch (error) {
    console.error('Failed to cancel booking:', error.response.data.message);
  }
};
```

### Admin Booking Operations

```javascript
import { adminBookingAPI } from '../services/apiService';

// Get pending bookings
const getPendingBookings = async () => {
  try {
    const response = await adminBookingAPI.getPendingBookings();
    console.log('Pending bookings:', response.data);
  } catch (error) {
    console.error('Failed to get pending bookings:', error.response.data.message);
  }
};

// Approve booking
const approveBooking = async (bookingId) => {
  try {
    const response = await adminBookingAPI.approveBooking(bookingId);
    console.log('Booking approved:', response.data);
  } catch (error) {
    console.error('Failed to approve booking:', error.response.data.message);
  }
};

// Reject booking
const rejectBooking = async (bookingId) => {
  try {
    const response = await adminBookingAPI.rejectBooking(bookingId);
    console.log('Booking rejected:', response.data);
  } catch (error) {
    console.error('Failed to reject booking:', error.response.data.message);
  }
};
```

## Google OAuth Integration

### Setup Instructions

1. **Get Google Client ID:**
   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins

2. **Configure Environment:**
   ```bash
   # Copy env.example to .env.local
   cp env.example .env.local
   
   # Add your Google Client ID
   VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id_here
   ```

3. **Backend Configuration:**
   ```bash
   # In backend .env file
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/users/google/callback
   FRONTEND_URL=http://localhost:5173
   ```

### Using Google OAuth

```javascript
import { useAuth } from '../context/AuthContext';

const LoginComponent = () => {
  const { googleLogin, googleLoginRedirect } = useAuth();

  // Method 1: Using Google credential token (requires VITE_GOOGLE_CLIENT_ID)
  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await googleLogin(credentialResponse);
    if (result.success) {
      // Handle successful login
      console.log('Google login successful:', result.user);
    }
  };

  // Method 2: Using redirect flow (works without VITE_GOOGLE_CLIENT_ID)
  const handleGoogleRedirect = () => {
    googleLoginRedirect(); // Redirects to backend OAuth flow
  };

  return (
    <div>
      {/* Google Login Button (credential flow) */}
      {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Google Login Failed')}
        />
      ) : (
        /* Google Login Button (redirect flow) */
        <button onClick={handleGoogleRedirect}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};
```

## Usage Examples

### Complete Component Example

```javascript
import React, { useState, useEffect } from 'react';
import { stationAPI, slotAPI, userBookingAPI } from '../services/apiService';

const StationBooking = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load stations on component mount
  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    setLoading(true);
    try {
      const response = await stationAPI.listStations();
      setStations(response.data.stations || []);
    } catch (error) {
      console.error('Failed to load stations:', error);
    }
    setLoading(false);
  };

  const loadSlots = async (stationId) => {
    try {
      const response = await slotAPI.listSlots(stationId);
      setSlots(response.data.slots || []);
    } catch (error) {
      console.error('Failed to load slots:', error);
    }
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    loadSlots(station._id);
  };

  const handleBookSlot = async (slotId) => {
    try {
      const bookingData = {
        station_id: selectedStation._id,
        slot_id: slotId,
        booking_date: new Date().toISOString().split('T')[0],
        start_time: "10:00",
        end_time: "12:00",
        vehicle_number: "ABC123"
      };

      const response = await userBookingAPI.createBooking(bookingData);
      console.log('Booking successful:', response.data);
      
      // Refresh slots to show updated availability
      loadSlots(selectedStation._id);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (loading) {
    return <div>Loading stations...</div>;
  }

  return (
    <div>
      <h2>Book a Charging Slot</h2>
      
      {/* Station List */}
      <div>
        <h3>Select a Station:</h3>
        {stations.map(station => (
          <div key={station._id} onClick={() => handleStationSelect(station)}>
            <h4>{station.station_name}</h4>
            <p>{station.location}</p>
            <p>Available: {station.available_slots}/{station.total_slots}</p>
          </div>
        ))}
      </div>

      {/* Slot List */}
      {selectedStation && (
        <div>
          <h3>Available Slots at {selectedStation.station_name}:</h3>
          {slots.map(slot => (
            <div key={slot._id}>
              <p>Slot: {slot.slot_number}</p>
              <p>Type: {slot.charging_type}</p>
              <p>Power: {slot.power_rating}</p>
              <p>Status: {slot.status}</p>
              {slot.status === 'available' && (
                <button onClick={() => handleBookSlot(slot._id)}>
                  Book This Slot
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationBooking;
```

### Error Handling Best Practices

```javascript
import { apiUtils } from '../services/apiService';

const handleApiCall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    return apiUtils.handleSuccess(response);
  } catch (error) {
    const errorResult = apiUtils.handleError(error);
    
    // Show user-friendly error message
    if (errorResult.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    } else if (errorResult.status === 403) {
      // Show access denied message
      alert('Access denied. You do not have permission to perform this action.');
    } else {
      // Show generic error message
      alert(errorResult.message);
    }
    
    return errorResult;
  }
};

// Usage
const result = await handleApiCall(stationAPI.listStations);
if (result.success) {
  setStations(result.data.stations);
}
```

## API Endpoints Summary

### User Endpoints
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/verify/:token` - Verify email
- `POST /api/users/reset-password` - Send OTP
- `POST /api/users/reset-password/confirm` - Reset password
- `GET /api/users/profile` - Get profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/google` - Google OAuth redirect
- `GET /api/users/google/callback` - Google OAuth callback
- `POST /api/users/google/verify` - Verify Google token

### Admin Endpoints
- `POST /api/admins/register` - Register admin
- `POST /api/admins/login` - Login admin
- `GET /api/admins/dashboard` - Get dashboard (protected)

### Admin User Management
- `GET /api/admins/users` - Get all users (admin)
- `PUT /api/admins/users/block/:user_id` - Block user (admin)
- `PUT /api/admins/users/unblock/:user_id` - Unblock user (admin)
- `PUT /api/admins/users/update/:user_id` - Update user (admin)
- `DELETE /api/admins/users/delete/:user_id` - Delete user (admin)

### Station Endpoints
- `GET /api/stations` - List stations (public)
- `POST /api/stations` - Add station (admin)
- `PUT /api/stations/:id` - Update station (admin)
- `DELETE /api/stations/:id` - Delete station (admin)

### Slot Endpoints
- `GET /api/slots/station/:station_id` - List slots (public)
- `GET /api/slots` - Get all slots (admin)
- `POST /api/slots` - Add slot (admin)
- `PUT /api/slots/:id` - Update slot (admin)
- `DELETE /api/slots/:id` - Delete slot (admin)

### Booking Endpoints
- `POST /api/bookings/user` - Create booking (user)
- `GET /api/bookings/user` - Get user bookings (user)
- `PUT /api/bookings/user/:id` - Update booking (user)
- `PUT /api/bookings/user/:id/cancel` - Cancel booking (user)
- `GET /api/bookings/admin/pending` - Get pending bookings (admin)
- `PUT /api/bookings/admin/:id/approve` - Approve booking (admin)
- `PUT /api/bookings/admin/:id/reject` - Reject booking (admin)

## Notes

1. All protected endpoints require a valid JWT token in the Authorization header
2. Admin endpoints require admin role (super admin or station manager)
3. Google OAuth can work with or without a client ID configured
4. Error responses follow a consistent format with message and status code
5. All endpoints return JSON responses
6. File uploads are not currently implemented but can be added as needed

For more details, refer to the backend API documentation and individual controller files.