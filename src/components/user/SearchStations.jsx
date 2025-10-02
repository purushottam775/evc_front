import { useState, useEffect } from 'react';
import { stationAPI } from '../../services/apiService';
import BookingModal from './BookingModal';

const SearchStations = ({ onBookingSuccess }) => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [chargingType, setChargingType] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    filterStations();
  }, [searchLocation, chargingType, stations]);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await stationAPI.listStations();
      setStations(response.data.stations);
      setFilteredStations(response.data.stations);
    } catch (error) {
      console.error('Failed to fetch stations:', error);
    }
    setLoading(false);
  };

  const filterStations = () => {
    let filtered = stations;

    if (searchLocation) {
      filtered = filtered.filter(station =>
        station.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        station.station_name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (chargingType) {
      filtered = filtered.filter(station => station.charging_type === chargingType);
    }

    setFilteredStations(filtered);
  };

  const handleBookStation = (station) => {
    setSelectedStation(station);
    setShowBookingModal(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Charging Stations</h2>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search by location or station name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Charging Type
          </label>
          <select
            value={chargingType}
            onChange={(e) => setChargingType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="fast">Fast Charging</option>
            <option value="slow">Slow Charging</option>
          </select>
        </div>
      </div>

      {/* Stations Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stations...</p>
        </div>
      ) : filteredStations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No stations found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div key={station._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{station.station_name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  station.charging_type === 'fast' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {station.charging_type}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📍</span>
                  <span className="text-sm">{station.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">🔌</span>
                  <span className="text-sm">
                    {station.available_slots} of {station.total_slots} slots available
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">⚡</span>
                  <span className="text-sm capitalize">{station.station_status}</span>
                </div>
              </div>

              <button
                onClick={() => handleBookStation(station)}
                disabled={station.available_slots === 0}
                className={`w-full py-2 rounded-lg font-semibold transition ${
                  station.available_slots > 0
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {station.available_slots > 0 ? 'Book Now' : 'No Slots Available'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          station={selectedStation}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedStation(null);
          }}
          onBookingSuccess={() => {
            setShowBookingModal(false);
            setSelectedStation(null);
            if (onBookingSuccess) onBookingSuccess();
          }}
        />
      )}
    </div>
  );
};

export default SearchStations;
