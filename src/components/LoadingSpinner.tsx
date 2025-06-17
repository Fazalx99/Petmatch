
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-bounce">🐾</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
