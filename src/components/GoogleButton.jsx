import { GoogleLogin } from '@react-oauth/google';

const GoogleButton = ({ onSuccess, onError, text = "Sign in with Google", disabled = false }) => {
  const handleGoogleRedirect = () => {
    const backendUrl = import.meta.env.VITE_API_URL || 'https://evc-backend-3.onrender.com/api';
    window.location.href = `${backendUrl}/users/google`;
  };

  return (
    <div className="w-full">
      {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          size="large"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          disabled={disabled}
        />
      ) : (
        <button
          type="button"
          onClick={handleGoogleRedirect}
          disabled={disabled}
          className="group relative w-full flex items-center justify-center px-6 py-3.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm"
        >
          <div className="absolute left-4 flex items-center justify-center w-5 h-5">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <span className="ml-3 text-sm font-medium">{text}</span>
          <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default GoogleButton;