import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, Keyboard } from 'lucide-react';

export const StatsCards = ({ results }) => {
  if (results.length === 0) return null;

  const bestWpm = Math.max(...results.map(r => r.wpm));
  const avgWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length);
  const totalTests = results.length;

  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
      <Card className="p-4 text-center border border-success/20">
        <Trophy className="h-5 w-5 text-success mx-auto mb-1" />
        <div className="text-xl font-bold text-success font-mono">{bestWpm}</div>
        <div className="text-xs text-muted-foreground">BEST WPM</div>
      </Card>
      <Card className="p-4 text-center border border-accent/20">
        <TrendingUp className="h-5 w-5 text-accent mx-auto mb-1" />
        <div className="text-xl font-bold text-accent font-mono">{avgWpm}</div>
        <div className="text-xs text-muted-foreground">AVG WPM</div>
      </Card>
      <Card className="p-4 text-center border border-success/20">
        <Keyboard className="h-5 w-5 text-success mx-auto mb-1" />
        <div className="text-xl font-bold text-success font-mono">{totalTests}</div>
        <div className="text-xs text-muted-foreground">TESTS</div>
      </Card>
    </div>
  );
};