import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, Keyboard } from 'lucide-react';

export const StatsCards = ({ results }) => {
  if (results.length === 0) return null;

  const bestWpm = Math.max(...results.map(r => r.wpm));
  const avgWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length);
  const totalTests = results.length;

  return (
    <div className="flex flex-row gap-2 md:grid md:grid-cols-3 md:gap-4 max-w-2xl mx-auto">
      <Card className="group relative overflow-hidden border border-success/20 hover:border-success/40 transition-all duration-300 hover:shadow-lg hover:scale-105 flex-1 p-3 sm:p-6 text-xs sm:text-base">
        <div className="relative z-10 text-center">
          <div className="p-1 sm:p-2 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors duration-300 w-fit mx-auto mb-1 sm:mb-2">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-success font-mono">{bestWpm}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">BEST WPM</div>
        </div>
      </Card>

      <Card className="group relative overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:scale-105 flex-1 p-3 sm:p-6 text-xs sm:text-base">
        <div className="relative z-10 text-center">
          <div className="p-1 sm:p-2 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 w-fit mx-auto mb-1 sm:mb-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-accent font-mono">{avgWpm}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">AVG WPM</div>
        </div>
      </Card>

      <Card className="group relative overflow-hidden border border-success/20 hover:border-success/40 transition-all duration-300 hover:shadow-lg hover:scale-105 flex-1 p-3 sm:p-6 text-xs sm:text-base">
        <div className="relative z-10 text-center">
          <div className="p-1 sm:p-2 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors duration-300 w-fit mx-auto mb-1 sm:mb-2">
            <Keyboard className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-success font-mono">{totalTests}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">TESTS</div>
        </div>
      </Card>
    </div>
  );
};