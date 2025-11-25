import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TourStep {
  target: string;
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTourProps {
  steps: TourStep[];
  onComplete: () => void;
  show: boolean;
}

export function OnboardingTour({ steps, onComplete, show }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!show) return;

    const targetElement = document.querySelector(steps[currentStep].target);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const placement = steps[currentStep].placement || 'bottom';
      
      let top = 0;
      let left = 0;

      switch (placement) {
        case 'bottom':
          top = rect.bottom + window.scrollY + 10;
          left = rect.left + window.scrollX + rect.width / 2;
          break;
        case 'top':
          top = rect.top + window.scrollY - 10;
          left = rect.left + window.scrollX + rect.width / 2;
          break;
        case 'left':
          top = rect.top + window.scrollY + rect.height / 2;
          left = rect.left + window.scrollX - 10;
          break;
        case 'right':
          top = rect.top + window.scrollY + rect.height / 2;
          left = rect.right + window.scrollX + 10;
          break;
      }

      setPosition({ top, left });
      targetElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      
      return () => {
        targetElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      };
    }
  }, [currentStep, show, steps]);

  if (!show) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={handleSkip} />
      <Card
        className="fixed z-50 w-80 animate-scale-in"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: 'translateX(-50%)',
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{steps[currentStep].title}</h3>
              <p className="text-xs text-muted-foreground">{steps[currentStep].description}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 -mt-1 -mr-1"
              onClick={handleSkip}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-colors',
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={handlePrev}
                >
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Previous
                </Button>
              )}
              <Button
                size="sm"
                className="h-7 text-xs hover-scale"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                {currentStep < steps.length - 1 && <ArrowRight className="w-3 h-3 ml-1" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
