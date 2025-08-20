import { Keyboard } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Keyboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">TypeNow</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};