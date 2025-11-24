import { PerformanceAlert } from "@/types/parent";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface Props {
  alerts: PerformanceAlert[];
}

export const PerformanceAlertBanner = ({ alerts }: Props) => {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const Icon = alert.type === 'error' ? AlertCircle : alert.type === 'warning' ? AlertTriangle : CheckCircle;
        const variant = alert.type === 'error' ? 'destructive' : alert.type === 'warning' ? 'default' : 'default';
        const colorClass = alert.type === 'error' ? 'border-destructive bg-destructive/10' : alert.type === 'warning' ? 'border-accent bg-accent/10' : 'border-secondary bg-secondary/10';

        return (
          <Alert key={index} variant={variant} className={colorClass}>
            <Icon className="h-5 w-5" />
            <AlertDescription className="flex items-center gap-2 ml-2">
              <span className="flex-1">{alert.message}</span>
              {alert.actionRequired && (
                <Badge variant="outline" className="ml-auto">Action Required</Badge>
              )}
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
};
