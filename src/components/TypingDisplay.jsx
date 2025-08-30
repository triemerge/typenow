import React from 'react';

export const TypingDisplay = ({
  words,
  currentWordIndex,
  currentCharIndex,
  userInput,
  typedWords = []
}) => {
  if (!words || words.length === 0) return null;

  const renderWord = (word, wordIndex) => {
    const isCurrentWord = wordIndex === currentWordIndex;

    if (isCurrentWord) {
      return (
        <span key={wordIndex} className="px-1 bg-primary/10 rounded">
          {word.split('').map((char, charIndex) => {
            let className = 'text-dim';
            if (charIndex < userInput.length) {
              className = userInput[charIndex] === char ? 'text-correct' : 'text-incorrect';
            } else if (charIndex === currentCharIndex) {
              className = 'text-dim border-b-2 border-primary';
            }
            return (
              <span key={charIndex} className={className}>{char}</span>
            );
          })}
        </span>
      );
    } else if (wordIndex < currentWordIndex) {
      const typedWord = typedWords[wordIndex] || '';
      return (
        <span key={wordIndex}>
          {word.split('').map((char, charIndex) => {
            const typedChar = typedWord[charIndex];
            let className = 'text-dim';
            if (typedChar !== undefined) {
              className = typedChar === char ? 'text-correct' : 'text-incorrect';
            }
            return (
              <span key={charIndex} className={className}>{char}</span>
            );
          })}
        </span>
      );
    } else {
      return (
        <span key={wordIndex} className="text-dim">{word}</span>
      );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 font-mono text-xl leading-relaxed">
      <div className="flex flex-wrap gap-3">
        {words.slice(0, 60).map((word, index) => renderWord(word, index))}
      </div>
    </div>
  );
};