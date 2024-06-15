import React from 'react';

const FullScreenPrompt = ({ requestFullScreen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <p className="text-xl mb-4">Please enable full-screen mode to take the quiz.</p>
      <button 
        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        onClick={requestFullScreen}
      >
        Enable Full Screen
      </button>
    </div>
  );
};

export default FullScreenPrompt;
