import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              The most convenient way to charge your electric vehicle
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-xl transition">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3">Easy Search</h3>
              <p className="text-gray-600">
                Find charging stations near you with our advanced search and filter options
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Fast Booking</h3>
              <p className="text-gray-600">
                Book your charging slot in seconds with our streamlined booking process
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Track Everything</h3>
              <p className="text-gray-600">
                Monitor your bookings, history, and charging patterns in one place
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Sign Up</h3>
                <p className="text-gray-600">
                  Create your account in minutes with just your email and basic information
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Find Station</h3>
                <p className="text-gray-600">
                  Search for available charging stations near your location
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Book & Charge</h3>
                <p className="text-gray-600">
                  Select your preferred time slot and start charging your EV
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
