import { toast } from 'react-toastify';

export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: 'error-toast',
    style: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      fontWeight: '600',
      border: '2px solid #ef4444',
    }
  });
};

export const showInvalidCredentials = () => {
  toast.error('Invalid credentials. Please check your email and password.', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: 'error-toast-shake',
    style: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      fontWeight: '600',
      border: '2px solid #dc2626',
      fontSize: '15px',
      boxShadow: '0 8px 20px rgba(220, 38, 38, 0.25)',
      zIndex: 9999,
    }
  });
};

export const showLoginFailed = (message) => {
  toast.error(`Login Failed: ${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      fontWeight: '600',
      border: '2px solid #dc2626',
      fontSize: '15px',
      boxShadow: '0 8px 20px rgba(220, 38, 38, 0.25)',
      zIndex: 9999,
    }
  });
};

export const showInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showBookingSuccess = () => {
  toast.success('🎉 Booking request sent successfully! We\'ll notify you once approved.', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: 'booking-success-toast',
  });
};

export const showBookingApproved = () => {
  toast.success('✅ Great! Your booking has been approved! See you at the station!', {
    position: "top-center",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showWelcome = (name) => {
  toast.success(`👋 Welcome back, ${name}! Ready to charge up?`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
