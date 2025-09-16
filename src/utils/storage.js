const STORAGE_KEY = 'typenow-results';

export const getTestResults = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const results = JSON.parse(saved);
    return results.map(r => ({
      ...r,
      timestamp: new Date(r.timestamp),
    }));
  } catch (error) {
    console.error('Failed to load test results:', error);
    return [];
  }
};

export const saveTestResult = (result) => {
  try {
    const existing = getTestResults();
    const toSave = {
      ...result,
      timestamp: result.timestamp instanceof Date
        ? result.timestamp.toISOString()
        : result.timestamp,
    };
    existing.push(toSave);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Failed to save test result:', error);
  }
};

export const clearTestResults = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear test results:', error);
  }
};