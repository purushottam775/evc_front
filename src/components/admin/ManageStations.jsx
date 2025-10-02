import { useState, useEffect } from 'react';
import api from '../../utils/api';

const ManageStations = ({ onUpdate }) => {
  const [stations, setStations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [formData, setFormData] = useState({
    station_name: '',
    location: '',
    total_slots: '',
    charging_type: 'fast',
    station_status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await api.get('/stations');
      setStations(response.data.stations);
    } catch (error) {
      console.error('Failed to fetch stations:', error);
    }
    setLoading(false);
  };

  const handleOpenModal = (station = null) => {
    if (station) {
      setEditingStation(station);
      setFormData({
        station_name: station.station_name,
        location: station.location,
        total_slots: station.total_slots,
        charging_type: station.charging_type,
        station_status: station.station_status
      });
    } else {
      setEditingStation(null);
      setFormData({
        station_name: '',
        location: '',
        total_slots: '',
        charging_type: 'fast',
        station_status: 'active'
      });
    }
    setError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStation(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Prepare data with proper data types
    const submitData = {
      ...formData,
      total_slots: parseInt(formData.total_slots, 10) // Convert string to integer
    };

    // Validate total_slots
    if (isNaN(submitData.total_slots) || submitData.total_slots <= 0) {
      setError('Total slots must be a positive integer');
      setLoading(false);
      return;
    }
    
    if (submitData.total_slots > 100) {
      setError('Total slots cannot exceed 100');
      setLoading(false);
      return;
    }

    try {
      if (editingStation) {
        await api.put(`/stations/${editingStation._id}`, submitData);
        alert('Station updated successfully');
      } else {
        await api.post('/stations', submitData);
        alert('Station created successfully');
      }
      
      fetchStations();
      handleCloseModal();
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save station');
    }
    
    setLoading(false);
  };

  const handleDelete = async (stationId) => {
    if (!confirm('Are you sure you want to delete this station? All associated slots will also be deleted.')) {
      return;
    }

    try {
      await api.delete(`/stations/${stationId}`);
      alert('Station deleted successfully');
      fetchStations();
      if (onUpdate) onUpdate();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete station');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Stations</h2>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + Add Station
        </button>
      </div>

      {loading && !showModal ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stations...</p>
        </div>
      ) : stations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No stations found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <div key={station._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{station.station_name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  station.station_status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {station.station_status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Location:</span> {station.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Type:</span>{' '}
                  <span className="capitalize">{station.charging_type}</span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Slots:</span> {station.available_slots}/{station.total_slots}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(station)}
                  className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(station._id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingStation ? 'Edit Station' : 'Add Station'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Station Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.station_name}
                  onChange={(e) => setFormData({ ...formData, station_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Slots
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  step="1"
                  value={formData.total_slots}
                  onChange={(e) => setFormData({ ...formData, total_slots: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter number of slots (1-100)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charging Type
                </label>
                <select
                  required
                  value={formData.charging_type}
                  onChange={(e) => setFormData({ ...formData, charging_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="fast">Fast</option>
                  <option value="slow">Slow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Station Status
                </label>
                <select
                  required
                  value={formData.station_status}
                  onChange={(e) => setFormData({ ...formData, station_status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : editingStation ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStations;
