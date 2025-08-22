import React, { useEffect, useRef, useState } from 'react';
import { TypingDisplay } from './TypingDisplay';
import { useTypingTest } from '@/hooks/useTypingTest';

export const TypingTest = ({ onComplete }) => {
  const { words, initWords } = useTypingTest();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [hasStarted, setHasStarted] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    initWords();
  }, [initWords]);

  useEffect(() => {
    if (hasStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            const wpm = Math.round((correctChars / 5) / (30 / 60));
            const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
            onComplete({ wpm, accuracy, duration: 30, totalChars, correctChars });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasStarted, timeRemaining, correctChars, totalChars, onComplete]);

  const handleKeyDown = (e) => {
    if (!hasStarted) setHasStarted(true);

    if (e.key === ' ') {
      e.preventDefault();
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');
    } else if (e.key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      const newInput = userInput + e.key;
      setUserInput(newInput);
      setTotalChars(prev => prev + 1);
      const currentWord = words[currentWordIndex];
      if (currentWord && userInput.length < currentWord.length && e.key === currentWord[userInput.length]) {
        setCorrectChars(prev => prev + 1);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4" onClick={() => inputRef.current?.focus()}>
      <div className="text-2xl font-bold text-primary text-center">
        {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
      </div>

      <TypingDisplay
        words={words}
        currentWordIndex={currentWordIndex}
        userInput={userInput}
      />

      <input
        ref={inputRef}
        className="opacity-0 absolute"
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
      />

      {!hasStarted && (
        <p className="text-center text-gray-400 text-sm">start typing to begin</p>
      )}
    </div>
  );
};