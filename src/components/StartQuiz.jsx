import React, { useState } from 'react';

const StartQuiz = ({ setPlayerName, startQuiz }) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim() !== '') {
      setPlayerName(name);
      startQuiz(); // Trigger the startQuiz function to indicate quiz should start
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <h1 className="text-4xl mb-6">Welcome to the Quiz</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 rounded text-gray-900"
      />
      <button 
        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        onClick={handleStart}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartQuiz;
