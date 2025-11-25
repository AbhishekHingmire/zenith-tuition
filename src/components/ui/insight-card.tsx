import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  type: 'success' | 'warning' | 'info' | 'error';
  icon: string;
  title: string;
  message: string;
  action?: string;
  onActionClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function InsightCard({
  type,
  icon,
  title,
  message,
  action,
  onActionClick,
  onDismiss,
  className,
}: InsightCardProps) {
  const typeStyles = {
    success: 'border-l-secondary bg-secondary/5',
    warning: 'border-l-accent bg-accent/5',
    info: 'border-l-primary bg-primary/5',
    error: 'border-l-destructive bg-destructive/5',
  };

  return (
    <Card className={cn('border-l-4 animate-fade-in', typeStyles[type], className)}>
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
            {action && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 mt-2 text-xs hover-scale"
                onClick={onActionClick}
              >
                {action}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 flex-shrink-0"
              onClick={onDismiss}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
