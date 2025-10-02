import { useState } from 'react';

const SimpleTest = () => {
  const [showAlert, setShowAlert] = useState(false);

  const testAlert = () => {
    alert('🔒 Invalid credentials! This is a browser alert - it ALWAYS works!');
  };

  const testConsole = () => {
    console.log('🔒 Invalid credentials! Check console for this message');
    alert('Check console (F12) for the error message');
  };

  const testDiv = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4">🧪 Simple Test Page</h1>
        <p className="mb-4">Testing different ways to show error messages:</p>
        
        <button
          onClick={testAlert}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 mb-4"
        >
          Test Browser Alert (Always Works)
        </button>

        <button
          onClick={testConsole}
          className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 mb-4"
        >
          Test Console Log
        </button>

        <button
          onClick={testDiv}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-4"
        >
          Test Red Div Message
        </button>

        {showAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
            🔒 Invalid credentials! This is a red div message
          </div>
        )}

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

export default SimpleTest;