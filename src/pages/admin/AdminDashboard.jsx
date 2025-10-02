import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ManageBookings from '../../components/admin/ManageBookings';
import ManageStations from '../../components/admin/ManageStations';
import ManageSlots from '../../components/admin/ManageSlots';
import ManageUsers from '../../components/admin/ManageUsers';
import api from '../../utils/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [stats, setStats] = useState({
    totalStations: 0,
    totalUsers: 0,
    pendingBookings: 0,
    totalBookings: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [stationsRes, usersRes, bookingsRes] = await Promise.all([
        api.get('/stations'),
        api.get('/admins/users'),
        api.get('/bookings/admin/pending')
      ]);

      setStats({
        totalStations: stationsRes.data.stations?.length || 0,
        totalUsers: usersRes.data.users?.length || 0,
        pendingBookings: bookingsRes.data.bookings?.length || 0,
        totalBookings: bookingsRes.data.bookings?.length || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const tabs = [
    { id: 'bookings', label: 'Manage Bookings', icon: '📋' },
    { id: 'stations', label: 'Manage Stations', icon: '🏢' },
    { id: 'slots', label: 'Manage Slots', icon: '🔌' },
    { id: 'users', label: 'Manage Users', icon: '👥' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                <span className="text-2xl">🏢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Stations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
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
          {activeTab === 'bookings' && <ManageBookings onUpdate={fetchStats} />}
          {activeTab === 'stations' && <ManageStations onUpdate={fetchStats} />}
          {activeTab === 'slots' && <ManageSlots />}
          {activeTab === 'users' && <ManageUsers onUpdate={fetchStats} />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
