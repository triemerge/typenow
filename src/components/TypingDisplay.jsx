import React from 'react';

export const TypingDisplay = ({ words, currentWordIndex, userInput }) => {
  if (!words || words.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-8 font-mono text-lg leading-relaxed">
      <div className="flex flex-wrap gap-2">
        {words.slice(0, 50).map((word, index) => {
          let className = 'text-gray-400';
          if (index < currentWordIndex) {
            className = 'text-green-500';
          } else if (index === currentWordIndex) {
            className = 'text-foreground underline';
          }
          return (
            <span key={index} className={className}>
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};