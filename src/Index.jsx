import React, { useState } from 'react';
import { TypingTest } from '@/components/TypingTest';

const Index = () => {
  const [results, setResults] = useState(null);

  const handleComplete = (res) => {
    setResults(res);
  };

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      {results ? (
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Test Complete!</h2>
          <p className="text-xl">WPM: {results.wpm}</p>
          <p className="text-xl">Accuracy: {results.accuracy}%</p>
          <button
            onClick={() => setResults(null)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      ) : (
        <TypingTest onComplete={handleComplete} />
      )}
    </main>
  );
};

export default Index;