import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'normal' | 'compact';
  onViewChange: (view: 'normal' | 'compact') => void;
  className?: string;
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center gap-1 bg-muted/50 rounded-lg p-1", className)}>
      <Button
        variant={view === 'normal' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('normal')}
        className="h-8 px-3"
      >
        <LayoutGrid className="w-4 h-4 mr-1.5" />
        <span className="text-xs">Normal</span>
      </Button>
      <Button
        variant={view === 'compact' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('compact')}
        className="h-8 px-3"
      >
        <List className="w-4 h-4 mr-1.5" />
        <span className="text-xs">Compact</span>
      </Button>
    </div>
  );
}
