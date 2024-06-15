import React, { useState, useEffect } from 'react';
import FullScreenPrompt from './components/FullScreenPrompt';
import Quiz from './components/Quiz';
import StartQuiz from './components/StartQuiz';
import questions from '../public/questions.json'; // Adjust the import path as per your project structure
import './index.css';

function App() {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement != null
  );
  const [playerName, setPlayerName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const requestFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0); // Reset score when starting a new quiz
  };

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setQuizStarted(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-center py-4 bg-gray-800 text-white">
        <h1 className="text-3xl">Welcome to the Quiz</h1>
      </header>
      <main>
        {isFullScreen ? (
          quizStarted ? (
            <Quiz
              questions={questions}
              playerName={playerName}
              onComplete={handleQuizComplete}
            />
          ) : (
            <StartQuiz setPlayerName={setPlayerName} startQuiz={startQuiz} />
          )
        ) : (
          <FullScreenPrompt requestFullScreen={requestFullScreen} />
        )}
      </main>
      {score > 0 && (
        <div className="text-center mt-4">
          <p className="text-xl">
            Thank you, {playerName}, for taking the quiz!
          </p>
          <p className="text-xl mt-2">
            Your final score is: {score} out of {questions.length}.
          </p>
        </div>
      )}
      <footer className="text-center py-4 bg-gray-800 text-white mt-4">
        Made with ❤️ by Aditya
      </footer>
    </div>
  );
}

export default App;
