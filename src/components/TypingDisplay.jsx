import React, { useMemo, useState, useEffect } from 'react';

export const TypingDisplay = ({
  words,
  currentWordIndex,
  currentCharIndex,
  userInput,
  typedWords = []
}) => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const getCharLimit = () => {
    switch (screenSize) {
      case 'mobile': return 22;
      case 'tablet': return 40;
      case 'desktop': return 60;
      default: return 60;
    }
  };

  const lines = useMemo(() => {
    const charLimit = getCharLimit();
    const result = [];
    let currentLine = [];
    let currentLineLength = 0;

    for (const word of words) {
      const wordWithSpace = currentLine.length === 0 ? word : ` ${word}`;
      const wordLength = wordWithSpace.length;

      if (currentLineLength + wordLength > charLimit && currentLine.length > 0) {
        result.push([...currentLine]);
        currentLine = [word];
        currentLineLength = word.length;
      } else {
        currentLine.push(word);
        currentLineLength += wordLength;
      }
    }
    if (currentLine.length > 0) result.push(currentLine);
    return result;
  }, [words, screenSize]);

  const currentLineIndex = useMemo(() => {
    let totalWords = 0;
    for (let i = 0; i < lines.length; i++) {
      if (totalWords + lines[i].length > currentWordIndex) return i;
      totalWords += lines[i].length;
    }
    return lines.length - 1;
  }, [lines, currentWordIndex]);

  const renderWord = (word, globalWordIndex) => {
    const isCurrentWord = globalWordIndex === currentWordIndex;

    if (isCurrentWord) {
      return (
        <span key={globalWordIndex} className="px-1 bg-primary/10 rounded">
          {word.split('').map((char, charIndex) => {
            let className = 'text-dim';
            if (charIndex < userInput.length) {
              className = userInput[charIndex] === char ? 'text-correct' : 'text-incorrect';
            } else if (charIndex === currentCharIndex) {
              className = 'text-dim border-b-2 border-primary';
            }
            return <span key={charIndex} className={className}>{char}</span>;
          })}
        </span>
      );
    } else if (globalWordIndex < currentWordIndex) {
      const typedWord = typedWords[globalWordIndex] || '';
      return (
        <span key={globalWordIndex}>
          {word.split('').map((char, charIndex) => {
            const typedChar = typedWord[charIndex];
            let className = 'text-dim';
            if (typedChar !== undefined) {
              className = typedChar === char ? 'text-correct' : 'text-incorrect';
            }
            return <span key={charIndex} className={className}>{char}</span>;
          })}
        </span>
      );
    } else {
      return <span key={globalWordIndex} className="text-dim">{word}</span>;
    }
  };

  const renderLine = (line, lineIndex) => {
    const isCurrentLine = lineIndex === currentLineIndex;
    let startWordIndex = 0;
    for (let i = 0; i < lineIndex; i++) startWordIndex += lines[i].length;

    return (
      <div
        key={lineIndex}
        className={`flex gap-3 min-h-[2rem] items-center transition-all duration-300 ${
          isCurrentLine ? 'opacity-100' : 'opacity-70'
        }`}
      >
        {line.map((word, wordIndexInLine) => {
          const globalWordIndex = startWordIndex + wordIndexInLine;
          return renderWord(word, globalWordIndex);
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="relative bg-background border border-border rounded-lg overflow-hidden"
        style={{ height: screenSize === 'mobile' ? '35vh' : '40vh', minHeight: screenSize === 'mobile' ? '280px' : '300px' }}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 p-4 sm:p-8 overflow-hidden">
            <div className="h-full flex items-center">
              <div className="text-2xl font-mono leading-relaxed w-full overflow-hidden">
                {currentLineIndex > 0 && lines[currentLineIndex - 1] &&
                  renderLine(lines[currentLineIndex - 1], currentLineIndex - 1)
                }
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-8 bg-accent/5 border-y border-accent/20">
            <div className="h-full flex items-center">
              <div className="text-2xl font-mono leading-relaxed w-full overflow-hidden">
                {lines[currentLineIndex] && renderLine(lines[currentLineIndex], currentLineIndex)}
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-8 overflow-hidden">
            <div className="h-full flex items-center">
              <div className="text-2xl font-mono leading-relaxed w-full overflow-hidden">
                {lines[currentLineIndex + 1] &&
                  renderLine(lines[currentLineIndex + 1], currentLineIndex + 1)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};