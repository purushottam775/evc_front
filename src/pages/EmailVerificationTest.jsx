import { useState } from 'react';
import { Link } from 'react-router-dom';

const EmailVerificationTest = () => {
  const [testToken, setTestToken] = useState('');

  const handleTestVerification = () => {
    if (testToken.trim()) {
      window.open(`/verify-email?token=${testToken}`, '_blank');
    } else {
      alert('Please enter a test token');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-3xl">🧪</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Email Verification Test
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Test the email verification flow with different scenarios
          </p>
        </div>

        <div className="space-y-6">
          {/* Test Token Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Verification Token
            </label>
            <input
              type="text"
              value={testToken}
              onChange={(e) => setTestToken(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a test token"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter any token to test the verification flow
            </p>
          </div>

          {/* Test Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleTestVerification}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🧪 Test Verification with Token
            </button>

            <button
              onClick={() => window.open('/verify-email?token=valid_token_123', '_blank')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              ✅ Test Success Scenario
            </button>

            <button
              onClick={() => window.open('/verify-email?token=invalid_token', '_blank')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              ❌ Test Error Scenario
            </button>

            <button
              onClick={() => window.open('/verify-email', '_blank')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              ⚠️ Test No Token Scenario
            </button>
          </div>

          {/* Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Test Scenarios:</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Valid Token:</strong> Should show success message</li>
              <li>• <strong>Invalid Token:</strong> Should show error message</li>
              <li>• <strong>No Token:</strong> Should show error message</li>
              <li>• <strong>Custom Token:</strong> Test with your own token</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="text-center space-y-2">
            <Link
              to="/register"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              ← Back to Registration
            </Link>
            <Link
              to="/login"
              className="block text-sm text-green-600 hover:text-green-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationTest;