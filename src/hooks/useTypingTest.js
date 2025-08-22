import { useState, useCallback } from 'react';

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
];

export const useTypingTest = () => {
  const [words, setWords] = useState([]);

  const generateWords = useCallback((count = 200) => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      generated.push(COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
    }
    return generated;
  }, []);

  const initWords = useCallback(() => {
    setWords(generateWords());
  }, [generateWords]);

  return {
    words,
    initWords,
    generateWords,
  };
};