import { useEffect } from 'react';

// Preload dashboard components for faster navigation
export const usePreloadDashboard = (userRole) => {
  useEffect(() => {
    const preloadComponent = async (componentPath) => {
      try {
        await import(componentPath);
      } catch (error) {
        console.warn(`Failed to preload component: ${componentPath}`, error);
      }
    };

    // Preload based on user role
    if (userRole === 'super admin' || userRole === 'station manager') {
      preloadComponent('../pages/admin/AdminDashboard');
    } else {
      preloadComponent('../pages/user/UserDashboard');
    }

    // Preload common components
    preloadComponent('../components/user/SearchStations');
    preloadComponent('../components/user/MyBookings');
    preloadComponent('../components/user/Profile');
  }, [userRole]);
};

export default usePreloadDashboard;