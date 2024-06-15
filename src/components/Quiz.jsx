import React, { useState, useEffect } from 'react';

const Quiz = ({ questions, playerName, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setError(null);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore((prev) => prev + 1);
      }
      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        onComplete(score + 1); // Adding 1 to score to reflect the current question's answer
      }
    } else {
      setError('Please select an option before proceeding.');
    }
  };

  if (timer <= 0) {
    onComplete(score); // Complete quiz when timer runs out
    return null;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      <div className="mb-4 text-lg text-gray-700">Time remaining: {timer}s</div>
      <h2 className="text-2xl mb-4 text-gray-800">{questions[currentQuestion].question}</h2>
      <ul className="mb-4">
        {questions[currentQuestion].options.map((option) => (
          <li key={option} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                className="mr-2"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <button 
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleNextQuestion}
        disabled={!selectedOption}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
};

export default Quiz;
