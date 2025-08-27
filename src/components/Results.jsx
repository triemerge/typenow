import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Target, RotateCcw, Save } from 'lucide-react';

export const Results = ({
  results,
  onRetakeTest,
  onSaveResults,
  isResultSaved = false,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold text-primary">Test Complete!</h2>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-6 text-center">
          <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-4xl font-bold font-mono">{results.wpm}</div>
          <div className="text-sm text-muted-foreground">WORDS PER MINUTE</div>
        </Card>

        <Card className="p-6 text-center">
          <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-4xl font-bold font-mono">{results.accuracy}%</div>
          <div className="text-sm text-muted-foreground">ACCURACY</div>
        </Card>
      </div>

      <div className="flex gap-4 justify-center">
        <Button onClick={onRetakeTest} className="gap-2">
          <RotateCcw size={18} />
          Retake Test
        </Button>
        <Button onClick={onSaveResults} variant="outline" className="gap-2" disabled={isResultSaved}>
          <Save size={18} />
          {isResultSaved ? 'Saved' : 'Save Results'}
        </Button>
      </div>
    </div>
  );
};