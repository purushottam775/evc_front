import { useState, useEffect } from 'react';
import api from '../../utils/api';

const ManageBookings = ({ onUpdate }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/bookings/admin/pending');
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (bookingId) => {
    if (!confirm('Are you sure you want to approve this booking?')) {
      return;
    }

    try {
      await api.put(`/bookings/admin/${bookingId}/approve`);
      alert('Booking approved successfully');
      fetchBookings();
      if (onUpdate) onUpdate();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to approve booking');
    }
  };

  const handleReject = async (bookingId) => {
    if (!confirm('Are you sure you want to reject this booking?')) {
      return;
    }

    try {
      await api.put(`/bookings/admin/${bookingId}/reject`);
      alert('Booking rejected successfully');
      fetchBookings();
      if (onUpdate) onUpdate();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to reject booking');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pending Bookings</h2>
        <button
          onClick={fetchBookings}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No pending bookings</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {booking.station_id?.station_name || 'N/A'}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">User:</span> {booking.user_id?.name || 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Slot:</span> #{booking.slot_id?.slot_number || 'N/A'}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Booking ID:</span> #{booking._id}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">Date:</span>{' '}
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Time:</span>{' '}
                      {booking.start_time} - {booking.end_time}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Status:</span>{' '}
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        {booking.booking_status}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Payment:</span>{' '}
                      <span className="capitalize">{booking.payment_status}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                      onClick={() => handleApprove(booking._id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  ✓ Approve
                </button>
                <button
                      onClick={() => handleReject(booking._id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  ✗ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
