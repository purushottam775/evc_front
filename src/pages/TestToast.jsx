import { useEffect } from 'react';
import { toast } from 'react-toastify';

const TestToast = () => {
  useEffect(() => {
    // Show toast immediately when component loads
    toast.error('🔥 TOAST IS WORKING! If you see this, the library works!', {
      position: "top-center",
      autoClose: 10000,
      style: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        fontWeight: '700',
        border: '3px solid #dc2626',
        fontSize: '18px',
        zIndex: 99999,
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4">🧪 Toast Test Page</h1>
        <p className="mb-4">If toast library is working, you should see a big red popup at the top center of the screen.</p>
        
        <button
          onClick={() => {
            toast.error('🔒 Invalid credentials! Please check your email and password.', {
              position: "top-center",
              autoClose: 5000,
              style: {
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                fontWeight: '700',
                border: '3px solid #dc2626',
                fontSize: '16px',
                zIndex: 99999,
              }
            });
          }}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
        >
          Click to Test Login Error Popup
        </button>

        <button
          onClick={() => {
            toast.success('✅ Success! This is how a success toast looks', {
              position: "top-center",
              autoClose: 3000,
            });
          }}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 mt-4"
        >
          Test Success Popup
        </button>

        <button
          onClick={() => {
            toast.error('🔒 Admin Login Failed! Invalid credentials!', {
              position: "top-center",
              autoClose: 5000,
              style: {
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                fontWeight: '700',
                border: '3px solid #dc2626',
                fontSize: '16px',
                zIndex: 99999,
              }
            });
          }}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 mt-4"
        >
          Test Admin Login Error Popup
        </button>

        <a 
          href="/login" 
          className="block text-center mt-6 text-blue-600 hover:underline"
        >
          Go to Login Page
        </a>
      </div>
    </div>
  );
};

export default TestToast;
