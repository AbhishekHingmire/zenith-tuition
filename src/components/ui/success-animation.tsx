import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface SuccessAnimationProps {
  message?: string;
  show: boolean;
  onComplete?: () => void;
  className?: string;
}

export function SuccessAnimation({ 
  message = 'Success!', 
  show, 
  onComplete,
  className 
}: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in',
      className
    )}>
      <div className="bg-card border rounded-lg p-8 shadow-lg animate-scale-in">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="w-16 h-16 text-secondary animate-scale-in" />
          <p className="text-lg font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
}

export function ConfettiSuccess() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-fade-in"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            backgroundColor: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'][Math.floor(Math.random() * 3)],
            animation: `confetti ${2 + Math.random() * 2}s linear forwards`,
          }}
        />
      ))}
    </div>
  );
}
