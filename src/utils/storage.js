const STORAGE_KEY = 'typing-test-results';

export const saveTestResult = (result) => {
  try {
    const existingResults = getTestResults();
    const updatedResults = [...existingResults, result];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
  } catch (error) {
    console.error('Failed to save test result:', error);
  }
};

export const getTestResults = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load test results:', error);
    return [];
  }
};

export const clearTestResults = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear test results:', error);
  }
};