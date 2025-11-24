import { ClassSchedule } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, CheckCircle, XCircle, Minus } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  schedule: ClassSchedule[];
}

export const InteractiveTimetable = ({ schedule }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getCurrentTimeInMinutes = () => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  };

  const getTimeInMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const isOngoing = (startTime: string, endTime: string) => {
    const current = getCurrentTimeInMinutes();
    const start = getTimeInMinutes(startTime);
    const end = getTimeInMinutes(endTime);
    return current >= start && current < end;
  };

  const isPast = (endTime: string) => {
    return getCurrentTimeInMinutes() > getTimeInMinutes(endTime);
  };

  const getClassTypeColor = (type: ClassSchedule['type']) => {
    switch (type) {
      case 'lecture': return 'bg-primary/10 text-primary border-primary/20';
      case 'lab': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'test': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'doubt-session': return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const getAttendanceIcon = (status?: ClassSchedule['attendanceStatus']) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'absent': return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Today's Schedule</span>
          <Badge variant="outline" className="font-mono">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule.map((classItem) => {
            const ongoing = isOngoing(classItem.startTime, classItem.endTime);
            const past = isPast(classItem.endTime);

            return (
              <div
                key={classItem.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  ongoing
                    ? 'border-primary bg-primary/5 animate-pulse'
                    : past
                    ? 'border-border bg-muted/50 opacity-60'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-semibold text-foreground text-lg">
                        {classItem.subject}
                      </h3>
                      {ongoing && (
                        <Badge variant="destructive" className="animate-pulse">
                          LIVE NOW
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`capitalize ${getClassTypeColor(classItem.type)}`}
                      >
                        {classItem.type.replace('-', ' ')}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>
                          {classItem.startTime} - {classItem.endTime}
                          <span className="ml-2 text-xs">
                            ({Math.round((getTimeInMinutes(classItem.endTime) - getTimeInMinutes(classItem.startTime)))} min)
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{classItem.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{classItem.room}</span>
                      </div>
                      {classItem.attendanceStatus && (
                        <div className="flex items-center gap-2">
                          {getAttendanceIcon(classItem.attendanceStatus)}
                          <span className="capitalize">{classItem.attendanceStatus}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {classItem.materials && classItem.materials.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Materials:</p>
                    <div className="flex flex-wrap gap-2">
                      {classItem.materials.map((material, idx) => (
                        <Badge key={idx} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                          📎 {material.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {schedule.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
              <p className="text-lg font-semibold mb-2">No classes today!</p>
              <p className="text-sm text-muted-foreground">Enjoy your free day</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
