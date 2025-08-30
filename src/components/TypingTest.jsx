import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw } from 'lucide-react';
import { TypingDisplay } from './TypingDisplay';
import { useTypingTest } from '@/hooks/useTypingTest';

export const TypingTest = ({ onComplete }) => {
  const {
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
  } = useTypingTest(onComplete);

  const handleTimeLimitChange = (value) => {
    setTimeLimit(parseInt(value));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
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

      <div onClick={() => inputRef.current?.focus()} className="cursor-text">
        <TypingDisplay
          words={words}
          currentWordIndex={currentWordIndex}
          currentCharIndex={currentCharIndex}
          userInput={userInput}
          typedWords={typedWords}
        />

        <input
          ref={inputRef}
          className="opacity-0 absolute"
          onKeyDown={handleKeyPress}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {!hasStarted && (
        <p className="text-center text-muted-foreground/60 text-sm">start typing to begin</p>
      )}
    </div>
  );
};