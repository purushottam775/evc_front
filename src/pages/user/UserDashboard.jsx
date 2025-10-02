import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SearchStations from '../../components/user/SearchStations';
import MyBookings from '../../components/user/MyBookings';
import Profile from '../../components/user/Profile';
import { userAPI } from '../../services/apiService';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('search');
  const [stats, setStats] = useState({
    total_bookings: 0,
    cancelled: 0,
    pending: 0,
    rejected: 0,
    approved: 0
  });

  useEffect(() => {
    if (user && user._id) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user || !user._id) {
      console.warn('User not loaded yet');
      return;
    }
    
    try {
      const response = await userAPI.getUserStats(user._id);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Set default stats on error
      setStats({
        total_bookings: 0,
        cancelled: 0,
        pending: 0,
        rejected: 0,
        approved: 0
      });
    }
  };

  const refreshDashboard = () => {
    fetchStats();
    // You can add more refresh logic here if needed
  };

  const tabs = [
    { id: 'search', label: 'Search Stations', icon: '🔍' },
    { id: 'bookings', label: 'My Bookings', icon: '📋' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600">Manage your EV charging bookings</p>
          </div>
          <button
            onClick={refreshDashboard}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span className="text-lg">🔄</span>
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_bookings || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
                <span className="text-2xl">🚫</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-100 rounded-lg p-3">
                <span className="text-2xl">🚫</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-600">{stats.cancelled || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'search' && <SearchStations onBookingSuccess={fetchStats} />}
          {activeTab === 'bookings' && <MyBookings onUpdate={fetchStats} />}
          {activeTab === 'profile' && <Profile onUpdate={fetchStats} />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
