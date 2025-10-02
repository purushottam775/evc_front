import { useEffect, useState } from 'react';

const OptimizedLoader = ({ 
  message = "Loading...", 
  submessage = "Please wait", 
  showProgress = false,
  duration = 1000 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showProgress) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / (duration / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [showProgress, duration]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
      <div className="text-center max-w-sm mx-auto">
        {/* Spinner */}
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-500 mx-auto"></div>
          {showProgress && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-green-600">
                {Math.round(progress)}%
              </span>
            </div>
          )}
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-500 text-sm">{submessage}</p>

        {/* Progress bar */}
        {showProgress && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Dots animation */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedLoader;