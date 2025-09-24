import React, { useState, useEffect } from 'react';
import { TypingTest } from '@/components/TypingTest';
import { Results } from '@/components/Results';
import { Progress } from '@/components/Progress';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StatsCards } from '@/components/StatsCards';
import { saveTestResult, getTestResults, clearTestResults } from '@/utils/storage';
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
        description: "Your test results have been saved to track your progress.",
      });
    }
  };

  const handleViewProgress = () => {
    setCurrentState('progress');
  };

  const handleClearData = () => {
    clearTestResults();
    setSavedResults([]);
    toast({
      title: "Data Cleared",
      description: "All saved test results have been removed.",
    });
  };

  const handleBackToTest = () => {
    setCurrentState('test');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        currentState={currentState}
        onBackToTest={handleBackToTest}
        onViewProgress={handleViewProgress}
      />

      <main className="flex-1 container max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {currentState === 'test' && (
          <div className="space-y-6 sm:space-y-8">
            <StatsCards results={savedResults} />
            <TypingTest onComplete={handleTestComplete} />
          </div>
        )}

        {currentState === 'results' && currentResults && (
          <Results
            results={currentResults}
            previousResults={savedResults}
            onRetakeTest={handleRetakeTest}
            onSaveResults={handleSaveResults}
            isResultSaved={isResultSaved}
          />
        )}

        {currentState === 'progress' && (
          <Progress
            results={savedResults}
            onClearData={handleClearData}
            onBackToTest={handleBackToTest}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;