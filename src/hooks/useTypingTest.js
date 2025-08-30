import { useState, useEffect, useRef, useCallback } from 'react';

const COMMON_WORDS = [
  'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
  'and', 'runs', 'under', 'bright', 'blue', 'sky', 'birds', 'sing',
  'sweet', 'songs', 'echo', 'across', 'field', 'with', 'bloom',
  'pretty', 'views', 'every', 'guest', 'visits', 'magic', 'place',
  'filled', 'joy', 'happy', 'often', 'relax', 'enjoy', 'watch',
  'cloud', 'drift', 'slow', 'quiet', 'breeze', 'light', 'shade',
  'learn', 'study', 'read', 'write', 'speak', 'listen', 'think',
  'dream', 'build', 'make', 'design', 'plan', 'help', 'guide',
  'teach', 'share', 'give', 'show', 'tell', 'start', 'begin',
  'open', 'close', 'grow', 'reach', 'earn', 'win', 'lose',
  'fight', 'test', 'focus', 'aim', 'power', 'brave', 'trust',
  'above', 'below', 'around', 'never', 'often', 'early', 'later',
  'again', 'still', 'just', 'even', 'only', 'quite', 'very',
  'truly', 'alone', 'nearby', 'beyond', 'within', 'north', 'south',
  'east', 'west', 'left', 'right', 'upper', 'lower', 'front',
  'back', 'inner', 'outer', 'near', 'far', 'close', 'here',
  'there', 'place', 'spot', 'area', 'region', 'zone', 'city',
  'town', 'story', 'music', 'movie', 'drama', 'actor', 'artist',
  'writer', 'singer', 'player', 'coach', 'judge', 'nurse', 'doctor',
  'pilot', 'chef', 'farmer', 'coder', 'maker', 'owner', 'buyer',
  'guest', 'host', 'child', 'adult', 'human', 'group', 'team',
  'friend', 'leader', 'member', 'agent', 'user', 'admin', 'staff',
];

export const useTypingTest = (onComplete) => {
  const [timeLimit, setTimeLimitState] = useState(30);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [words, setWords] = useState([]);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [typedWords, setTypedWords] = useState([]);

  const inputRef = useRef(null);
  const correctCharsRef = useRef(0);
  const totalCharsRef = useRef(0);

  useEffect(() => { correctCharsRef.current = correctChars; }, [correctChars]);
  useEffect(() => { totalCharsRef.current = totalChars; }, [totalChars]);

  const generateWords = useCallback((count = 500) => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      generated.push(COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
    }
    return generated;
  }, []);

  useEffect(() => {
    setWords(generateWords());
  }, [generateWords]);

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
              timestamp: new Date(),
            });
          }
          return newTime;
        });
      }, 1000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [hasStarted, timeRemaining, timeLimit, onComplete]);

  const startTest = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  }, [hasStarted]);

  const resetTest = useCallback(() => {
    setHasStarted(false);
    setTimeRemaining(timeLimit);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setUserInput('');
    setTotalChars(0);
    setCorrectChars(0);
    setTypedWords([]);
    setWords(generateWords());
    inputRef.current?.focus();
  }, [timeLimit, generateWords]);

  const setTimeLimit = useCallback((newLimit) => {
    setTimeLimitState(newLimit);
    if (!hasStarted) {
      setTimeRemaining(newLimit);
    }
  }, [hasStarted]);

  const handleKeyPress = useCallback((e) => {
    if (!hasStarted) startTest();

    if (e.key === ' ') {
      e.preventDefault();
      setTypedWords(prev => {
        const newTypedWords = [...prev];
        newTypedWords[currentWordIndex] = userInput;
        return newTypedWords;
      });
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setUserInput('');
      }
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (currentCharIndex > 0) {
        setCurrentCharIndex(prev => prev - 1);
        setUserInput(prev => prev.slice(0, -1));
      }
    } else if (e.key.length === 1) {
      const newInput = userInput + e.key;
      setUserInput(newInput);
      setCurrentCharIndex(prev => prev + 1);
      setTotalChars(prev => prev + 1);
      const currentWord = words[currentWordIndex];
      if (currentWord && currentCharIndex < currentWord.length && e.key === currentWord[currentCharIndex]) {
        setCorrectChars(prev => prev + 1);
      }
    }
  }, [hasStarted, startTest, currentWordIndex, currentCharIndex, userInput, words]);

  return {
    timeLimit,
    timeRemaining,
    hasStarted,
    currentWordIndex,
    currentCharIndex,
    userInput,
    words,
    typedWords,
    setTimeLimit,
    resetTest,
    handleKeyPress,
    inputRef,
  };
};