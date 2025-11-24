import { ComparisonMetric } from "@/types/parent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  childName: string;
  metrics: ComparisonMetric[];
}

export const ComparisonWidget = ({ childName, metrics }: Props) => {
  const getTrend = (childValue: number, classAverage: number) => {
    const diff = childValue - classAverage;
    if (diff > 5) return { Icon: TrendingUp, color: 'text-secondary', label: 'Above Average' };
    if (diff < -5) return { Icon: TrendingDown, color: 'text-destructive', label: 'Below Average' };
    return { Icon: Minus, color: 'text-muted-foreground', label: 'Average' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">How is {childName} performing?</CardTitle>
        <p className="text-sm text-muted-foreground">Compared to class average</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => {
          const trend = getTrend(metric.childValue, metric.classAverage);
          const TrendIcon = trend.Icon;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <TrendIcon className={`w-4 h-4 ${trend.color}`} />
                  <span className="text-xs text-muted-foreground">{trend.label}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Your Child</span>
                  <div className="flex-1">
                    <Progress value={metric.childValue} className="h-3" />
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">{metric.childValue}{metric.unit}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Class Avg</span>
                  <div className="flex-1">
                    <Progress value={metric.classAverage} className="h-2 opacity-50" />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{metric.classAverage}{metric.unit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
