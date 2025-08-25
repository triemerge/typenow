import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw } from 'lucide-react';
import { TypingDisplay } from './TypingDisplay';
import { useTypingTest } from '@/hooks/useTypingTest';

export const TypingTest = ({ onComplete }) => {
  const { words, initWords, generateWords } = useTypingTest();
  const [timeLimit, setTimeLimit] = useState(30);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [hasStarted, setHasStarted] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const inputRef = useRef(null);
  const correctCharsRef = useRef(0);
  const totalCharsRef = useRef(0);

  useEffect(() => { correctCharsRef.current = correctChars; }, [correctChars]);
  useEffect(() => { totalCharsRef.current = totalChars; }, [totalChars]);

  useEffect(() => {
    initWords();
  }, [initWords]);

  useEffect(() => {
    let intervalId;
    if (hasStarted && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime === 0) {
            const wpm = Math.round((correctCharsRef.current / 5) / (timeLimit / 60));
            const accuracy = totalCharsRef.current > 0
              ? Math.round((correctCharsRef.current / totalCharsRef.current) * 100)
              : 0;
            onComplete({
              wpm, accuracy, duration: timeLimit,
              totalChars: totalCharsRef.current,
              correctChars: correctCharsRef.current,
            });
          }
          return newTime;
        });
      }, 1000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [hasStarted, timeRemaining, timeLimit, onComplete]);

  const handleTimeLimitChange = (value) => {
    const newLimit = parseInt(value);
    setTimeLimit(newLimit);
    setTimeRemaining(newLimit);
  };

  const resetTest = () => {
    setHasStarted(false);
    setTimeRemaining(timeLimit);
    setCurrentWordIndex(0);
    setUserInput('');
    setCorrectChars(0);
    setTotalChars(0);
    initWords();
    inputRef.current?.focus();
  };

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select value={timeLimit.toString()} onValueChange={handleTimeLimitChange} disabled={hasStarted}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">60 seconds</SelectItem>
              <SelectItem value="120">120 seconds</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-2xl font-bold text-primary">
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <Button onClick={resetTest} variant="outline" size="sm" className="gap-2">
          <RotateCcw size={16} />
          Reset
        </Button>
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