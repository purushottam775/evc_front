import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Charge Your EV,
              <span className="text-green-600"> Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find and book EV charging stations near you. Fast, convenient, and reliable charging solutions for your electric vehicle.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link
                  to={user?.isAdmin ? "/admin/dashboard" : "/user/dashboard"}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-green-600"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-gray-600">Charging Stations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">10k+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-green-600 rounded-full opacity-20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=600&fit=crop"
                alt="EV Charging"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
