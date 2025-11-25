import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
  showToast?: boolean;
}

export function CopyButton({ text, className, showToast = true }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (showToast) {
        toast.success('Copied to clipboard!');
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('h-6 w-6 p-0 hover-scale', className)}
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="w-3 h-3 text-secondary" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </Button>
  );
}

interface CopyTextProps {
  text: string;
  displayText?: string;
  className?: string;
}

export function CopyText({ text, displayText, className }: CopyTextProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <code className="text-sm bg-muted px-2 py-1 rounded">{displayText || text}</code>
      <CopyButton text={text} />
    </div>
  );
}
