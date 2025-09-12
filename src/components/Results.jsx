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

  const getPerformanceColor = (metric, value) => {
    switch (metric) {
      case 'wpm':
        if (value >= 60) return 'success';
        if (value >= 30) return 'warning';
        return 'error';
      case 'accuracy':
        if (value >= 95) return 'success';
        if (value >= 80) return 'warning';
        return 'error';
      default:
        return 'primary';
    }
  };

  const getPerformanceLabel = (metric, value) => {
    switch (metric) {
      case 'wpm':
        if (value >= 70) return 'Excellent';
        if (value >= 50) return 'Good';
        if (value >= 30) return 'Average';
        return 'Needs Practice';
      case 'accuracy':
        if (value >= 95) return 'Excellent';
        if (value >= 90) return 'Good';
        if (value >= 80) return 'Fair';
        return 'Needs Work';
      default:
        return '';
    }
  };

  const chartConfig = {
    wpm: { label: "WPM", color: "hsl(var(--primary))" },
    accuracy: { label: "Accuracy", color: "hsl(var(--accent))" },
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in px-2 sm:px-4">
      <div className="text-center space-y-1 sm:space-y-2 py-2 sm:py-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">Test Complete!</h2>
        <p className="text-sm sm:text-base text-muted-foreground/80 font-medium">Performance analysis complete</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto">
        <Card className="group relative overflow-hidden border border-success/20 hover:border-success/40 transition-all duration-300 hover:shadow-lg hover:scale-105 p-4 sm:p-6 text-center">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-success mb-1 font-mono">{results.wpm}</div>
            <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium tracking-wide">WORDS PER MINUTE</div>
            <Badge variant={getPerformanceColor('wpm', results.wpm)} className="text-xs px-3 py-1 font-semibold shadow-sm">
              {getPerformanceLabel('wpm', results.wpm)}
            </Badge>
          </div>
        </Card>

        <Card className="group relative overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:scale-105 p-4 sm:p-6 text-center">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-accent mb-1 font-mono">{results.accuracy}%</div>
            <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium tracking-wide">ACCURACY RATE</div>
            <Badge variant={getPerformanceColor('accuracy', results.accuracy)} className="text-xs px-3 py-1 font-semibold shadow-sm">
              {getPerformanceLabel('accuracy', results.accuracy)}
            </Badge>
          </div>
        </Card>
      </div>

      <Card className="group relative overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md p-3 sm:p-6">
        <div className="relative z-10">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 text-foreground">
            <div className="p-1 rounded-md bg-muted/50">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="text-center sm:text-left p-2 rounded-lg bg-muted/30 border border-border/30">
              <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">Duration</div>
              <div className="font-bold text-lg sm:text-xl font-mono text-foreground">{results.duration}s</div>
            </div>
            <div className="text-center sm:text-left p-2 rounded-lg bg-muted/30 border border-border/30">
              <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">Total Chars</div>
              <div className="font-bold text-lg sm:text-xl font-mono text-foreground">{results.totalChars}</div>
            </div>
            <div className="text-center sm:text-left p-2 rounded-lg bg-success/10 border border-success/20">
              <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">Correct</div>
              <div className="font-bold text-lg sm:text-xl font-mono text-success">{results.correctChars}</div>
            </div>
            <div className="text-center sm:text-left p-2 rounded-lg bg-error/10 border border-error/20">
              <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">Errors</div>
              <div className="font-bold text-lg sm:text-xl font-mono text-error">{results.totalChars - results.correctChars}</div>
            </div>
          </div>
        </div>
      </Card>

      {chartData.length > 1 && (
        <Card className="group relative overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md p-3 sm:p-6">
          <div className="relative z-10">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-foreground">Performance Trend Analysis</h3>
            <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px] w-full">
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
          </div>
        </Card>
      )}

      <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center px-4 sm:px-0 pb-2">
        <Button onClick={onRetakeTest} className="btn-primary gap-2 w-full sm:w-auto sm:min-w-[140px] h-12 sm:h-10 text-base font-medium" size="lg">
          <RotateCcw size={18} />
          Retake Test
        </Button>
        <Button onClick={onSaveResults} variant="outline" className="gap-2 w-full sm:w-auto sm:min-w-[140px] h-12 sm:h-10 text-base font-medium border-2 hover:bg-muted/50" size="lg" disabled={isResultSaved}>
          <Save size={18} />
          {isResultSaved ? 'Results Saved' : 'Save Results'}
        </Button>
      </div>
    </div>
  );
};