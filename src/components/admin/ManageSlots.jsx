import { useState, useEffect } from 'react';
import api from '../../utils/api';

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const [stations, setStations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [formData, setFormData] = useState({
    station_id: '',
    slot_number: '',
    slot_status: 'available'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSlots();
    fetchStations();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const response = await api.get('/slots');
      setSlots(response.data.slots);
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    }
    setLoading(false);
  };

  const fetchStations = async () => {
    try {
      const response = await api.get('/stations');
      setStations(response.data.stations);
    } catch (error) {
      console.error('Failed to fetch stations:', error);
    }
  };

  const handleOpenModal = (slot = null) => {
    if (slot) {
      setEditingSlot(slot);
      setFormData({
        station_id: slot.station_id,
        slot_number: slot.slot_number,
        slot_status: slot.slot_status
      });
    } else {
      setEditingSlot(null);
      setFormData({
        station_id: '',
        slot_number: '',
        slot_status: 'available'
      });
    }
    setError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlot(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Prepare data with proper data types
    const submitData = {
      ...formData,
      slot_number: parseInt(formData.slot_number, 10) // Convert string to integer
    };

    // Validate slot_number
    if (isNaN(submitData.slot_number) || submitData.slot_number <= 0) {
      setError('Slot number must be a positive integer');
      setLoading(false);
      return;
    }
    
    if (submitData.slot_number > 50) {
      setError('Slot number cannot exceed 50');
      setLoading(false);
      return;
    }

    try {
      if (editingSlot) {
        await api.put(`/slots/${editingSlot._id}`, submitData);
        alert('Slot updated successfully');
      } else {
        await api.post('/slots', submitData);
        alert('Slot created successfully');
      }
      
      fetchSlots();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save slot');
    }
    
    setLoading(false);
  };

  const handleDelete = async (slotId) => {
    if (!confirm('Are you sure you want to delete this slot?')) {
      return;
    }

    try {
      await api.delete(`/slots/${slotId}`);
      alert('Slot deleted successfully');
      fetchSlots();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete slot');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Slots</h2>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + Add Slot
        </button>
      </div>

      {loading && !showModal ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading slots...</p>
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No slots found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slot ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slot Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {slots.map((slot) => (
                <tr key={slot._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{slot._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {slot.station_id?.station_name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {slot.slot_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      slot.slot_status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : slot.slot_status === 'occupied'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {slot.slot_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleOpenModal(slot)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingSlot ? 'Edit Slot' : 'Add Slot'}
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
                  Station
                </label>
                <select
                  required
                  value={formData.station_id}
                  onChange={(e) => setFormData({ ...formData, station_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Station</option>
                  {stations.map((station) => (
                    <option key={station._id} value={station._id}>
                      {station.station_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slot Number
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="50"
                  step="1"
                  value={formData.slot_number}
                  onChange={(e) => setFormData({ ...formData, slot_number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter slot number (1-50)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slot Status
                </label>
                <select
                  required
                  value={formData.slot_status}
                  onChange={(e) => setFormData({ ...formData, slot_status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
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
                  {loading ? 'Saving...' : editingSlot ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;
