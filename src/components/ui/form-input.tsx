import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, AlertCircle } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, success, helperText, icon, ...props }, ref) => {
    const hasValidation = error || success;
    const showIcon = hasValidation || icon;

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={props.id} className={cn(error && "text-destructive")}>
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <div className="relative">
          {icon && !hasValidation && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <Input
            ref={ref}
            className={cn(
              "transition-all duration-200",
              icon && !hasValidation && "pl-10",
              hasValidation && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              success && "border-green-500 focus-visible:ring-green-500",
              className
            )}
            {...props}
          />
          {hasValidation && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error && <X className="w-4 h-4 text-destructive" />}
              {success && <Check className="w-4 h-4 text-green-500" />}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className={cn(
            "flex items-start gap-1 text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error && <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />}
            <p>{error || helperText}</p>
          </div>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  showCount?: boolean;
  maxCount?: number;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, success, helperText, showCount, maxCount, ...props }, ref) => {
    const [count, setCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <Label htmlFor={props.id} className={cn(error && "text-destructive")}>
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {showCount && (
              <span className={cn(
                "text-xs",
                maxCount && count > maxCount ? "text-destructive" : "text-muted-foreground"
              )}>
                {count}{maxCount && `/${maxCount}`}
              </span>
            )}
          </div>
        )}
        <div className="relative">
          <Textarea
            ref={ref}
            className={cn(
              "transition-all duration-200 min-h-[100px]",
              error && "border-destructive focus-visible:ring-destructive",
              success && "border-green-500 focus-visible:ring-green-500",
              className
            )}
            onChange={handleChange}
            {...props}
          />
          {(error || success) && (
            <div className="absolute right-3 top-3">
              {error && <X className="w-4 h-4 text-destructive" />}
              {success && <Check className="w-4 h-4 text-green-500" />}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className={cn(
            "flex items-start gap-1 text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error && <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />}
            <p>{error || helperText}</p>
          </div>
        )}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";
