import React, { useState, useEffect } from 'react';
import { TypingTest } from '@/components/TypingTest';
import { Results } from '@/components/Results';
import { saveTestResult, getTestResults } from '@/utils/storage';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [currentState, setCurrentState] = useState('test');
  const [currentResults, setCurrentResults] = useState(null);
  const [savedResults, setSavedResults] = useState([]);
  const [isResultSaved, setIsResultSaved] = useState(false);

  useEffect(() => {
    setSavedResults(getTestResults());
  }, []);

  const handleTestComplete = (results) => {
    setCurrentResults(results);
    setCurrentState('results');
    setIsResultSaved(false);
  };

  const handleRetakeTest = () => {
    setCurrentResults(null);
    setCurrentState('test');
    setIsResultSaved(false);
  };

  const handleSaveResults = () => {
    if (currentResults && !isResultSaved) {
      saveTestResult(currentResults);
      setSavedResults(getTestResults());
      setIsResultSaved(true);
      toast({
        title: "Results Saved!",
        description: "Your test results have been saved.",
      });
    }
  };

  return (
    <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
      {currentState === 'test' && (
        <TypingTest onComplete={handleTestComplete} />
      )}

      {currentState === 'results' && currentResults && (
        <Results
          results={currentResults}
          onRetakeTest={handleRetakeTest}
          onSaveResults={handleSaveResults}
          isResultSaved={isResultSaved}
        />
      )}
    </main>
  );
};

export default Index;