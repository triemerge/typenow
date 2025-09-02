import React, { useState, useEffect } from 'react';
import { TypingTest } from '@/components/TypingTest';
import { Results } from '@/components/Results';
import { Progress } from '@/components/Progress';
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

  return { currentState, handleTestComplete, handleRetakeTest, handleSaveResults,
    handleViewProgress, handleClearData, handleBackToTest, currentResults,
    savedResults, isResultSaved };
};

export default Index;