import React from 'react';

export const TypingDisplay = ({ words, currentWordIndex, currentCharIndex, userInput }) => {
  if (!words || words.length === 0) return null;

  const renderWord = (word, wordIndex) => {
    const isCurrentWord = wordIndex === currentWordIndex;
    const isPastWord = wordIndex < currentWordIndex;

    return (
      <span key={wordIndex}>
        {word.split('').map((char, charIndex) => {
          let className = 'text-dim';

          if (isCurrentWord) {
            if (charIndex < userInput.length) {
              className = userInput[charIndex] === char ? 'text-correct' : 'text-incorrect';
            } else if (charIndex === currentCharIndex) {
              className = 'text-dim border-b-2 border-primary';
            }
          } else if (isPastWord) {
            className = 'text-correct';
          }

          return (
            <span key={charIndex} className={className}>{char}</span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 font-mono text-xl leading-relaxed">
      <div className="flex flex-wrap gap-3">
        {words.slice(0, 60).map((word, index) => renderWord(word, index))}
      </div>
    </div>
  );
};