import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, RotateCcw, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

export const Results = ({
  results,
  previousResults,
  onRetakeTest,
  onSaveResults,
  isResultSaved = false,
}) => {
  const chartData = previousResults.slice(-10).map((result, index) => ({
    test: index + 1,
    wpm: result.wpm,
    accuracy: result.accuracy,
  }));
  chartData.push({
    test: chartData.length + 1,
    wpm: results.wpm,
    accuracy: results.accuracy,
  });

  const getWpmVariant = (wpm) => {
    if (wpm >= 60) return 'success';
    if (wpm >= 30) return 'warning';
    return 'error';
  };
  const getWpmLabel = (wpm) => {
    if (wpm >= 70) return 'Excellent';
    if (wpm >= 50) return 'Good';
    if (wpm >= 30) return 'Average';
    return 'Needs Practice';
  };
  const getAccVariant = (acc) => {
    if (acc >= 95) return 'success';
    if (acc >= 80) return 'warning';
    return 'error';
  };
  const getAccLabel = (acc) => {
    if (acc >= 95) return 'Excellent';
    if (acc >= 90) return 'Good';
    if (acc >= 80) return 'Fair';
    return 'Needs Work';
  };

  const chartConfig = {
    wpm: { label: "WPM", color: "hsl(var(--primary))" },
    accuracy: { label: "Accuracy", color: "hsl(var(--accent))" },
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold text-primary">Test Complete!</h2>
        <p className="text-sm text-muted-foreground mt-1">Performance analysis complete</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-6 text-center border border-success/20">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-full bg-success/10">
              <Trophy className="h-8 w-8 text-success" />
            </div>
          </div>
          <div className="text-4xl font-bold text-success mb-1 font-mono">{results.wpm}</div>
          <div className="text-xs text-muted-foreground mb-3 font-medium tracking-wide">WORDS PER MINUTE</div>
          <Badge variant={getWpmVariant(results.wpm)} className="text-xs px-3 py-1">
            {getWpmLabel(results.wpm)}
          </Badge>
        </Card>

        <Card className="p-6 text-center border border-accent/20">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-full bg-accent/10">
              <Target className="h-8 w-8 text-accent" />
            </div>
          </div>
          <div className="text-4xl font-bold text-accent mb-1 font-mono">{results.accuracy}%</div>
          <div className="text-xs text-muted-foreground mb-3 font-medium tracking-wide">ACCURACY RATE</div>
          <Badge variant={getAccVariant(results.accuracy)} className="text-xs px-3 py-1">
            {getAccLabel(results.accuracy)}
          </Badge>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
            <div className="text-muted-foreground text-xs font-medium uppercase">Duration</div>
            <div className="font-bold text-xl font-mono">{results.duration}s</div>
          </div>
          <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
            <div className="text-muted-foreground text-xs font-medium uppercase">Total Chars</div>
            <div className="font-bold text-xl font-mono">{results.totalChars}</div>
          </div>
          <div className="p-2 rounded-lg bg-success/10 border border-success/20">
            <div className="text-muted-foreground text-xs font-medium uppercase">Correct</div>
            <div className="font-bold text-xl font-mono text-success">{results.correctChars}</div>
          </div>
          <div className="p-2 rounded-lg bg-error/10 border border-error/20">
            <div className="text-muted-foreground text-xs font-medium uppercase">Errors</div>
            <div className="font-bold text-xl font-mono text-error">{results.totalChars - results.correctChars}</div>
          </div>
        </div>
      </Card>

      {chartData.length > 1 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Performance Trend</h3>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="test" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="wpm" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 3 }} />
                <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      )}

      <div className="flex gap-4 justify-center">
        <Button onClick={onRetakeTest} className="gap-2">
          <RotateCcw size={18} />
          Retake Test
        </Button>
        <Button onClick={onSaveResults} variant="outline" className="gap-2 border-2" disabled={isResultSaved}>
          <Save size={18} />
          {isResultSaved ? 'Results Saved' : 'Save Results'}
        </Button>
      </div>
    </div>
  );
};