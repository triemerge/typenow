import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Trophy, Target, Trash2 } from 'lucide-react';

export const Progress = ({
  results,
  onClearData,
  onBackToTest,
}) => {
  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center space-y-6">
        <Card className="p-12">
          <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Results Yet</h2>
          <p className="text-muted-foreground mb-6">
            Take some typing tests to see your progress here
          </p>
          <Button onClick={onBackToTest}>
            Start Your First Test
          </Button>
        </Card>
      </div>
    );
  }

  const avgWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length);
  const avgAccuracy = Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length);
  const bestWpm = Math.max(...results.map(r => r.wpm));
  const bestAccuracy = Math.max(...results.map(r => r.accuracy));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Performance Analytics</h2>
          <p className="text-muted-foreground">
            {results.length} typing session{results.length !== 1 ? 's' : ''} analyzed
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onClearData}
            variant="outline"
            size="sm"
            className="gap-2 text-error border-error/30 hover:bg-error hover:text-error-foreground"
          >
            <Trash2 size={14} />
            Clear Data
          </Button>
          <Button onClick={onBackToTest} size="sm">New Test</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center border border-success/20">
          <Trophy className="h-6 w-6 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-success font-mono">{bestWpm}</div>
          <div className="text-xs text-muted-foreground">Best WPM</div>
        </Card>
        <Card className="p-4 text-center border border-accent/20">
          <Target className="h-6 w-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-accent font-mono">{bestAccuracy}%</div>
          <div className="text-xs text-muted-foreground">Best Accuracy</div>
        </Card>
        <Card className="p-4 text-center border border-success/20">
          <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-success font-mono">{avgWpm}</div>
          <div className="text-xs text-muted-foreground">Avg WPM</div>
        </Card>
        <Card className="p-4 text-center border border-warning/20">
          <Target className="h-6 w-6 text-warning mx-auto mb-2" />
          <div className="text-2xl font-bold text-warning font-mono">{avgAccuracy}%</div>
          <div className="text-xs text-muted-foreground">Avg Accuracy</div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">Session History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-bold uppercase text-xs">Date</th>
                <th className="text-left py-3 px-4 font-bold uppercase text-xs">WPM</th>
                <th className="text-left py-3 px-4 font-bold uppercase text-xs">Accuracy</th>
                <th className="text-left py-3 px-4 font-bold uppercase text-xs">Duration</th>
              </tr>
            </thead>
            <tbody>
              {results.slice().reverse().map((result, index) => (
                <tr key={index} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="py-3 px-4 font-mono text-muted-foreground">
                    {result.timestamp.toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-3 px-4 font-bold text-primary font-mono">{result.wpm}</td>
                  <td className="py-3 px-4 font-bold text-accent font-mono">{result.accuracy}%</td>
                  <td className="py-3 px-4 text-muted-foreground font-mono">{result.duration}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};