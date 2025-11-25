import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calendar, ChevronDown, Clock, User } from 'lucide-react';
import { mockTodaySchedule } from '@/data/mockStudentData';

export default function StudentSchedule() {
  const [timetableOpen, setTimetableOpen] = useState(true);

  const weekSchedule = {
    Monday: mockTodaySchedule,
    Tuesday: mockTodaySchedule,
    Wednesday: mockTodaySchedule,
    Thursday: mockTodaySchedule,
    Friday: mockTodaySchedule,
    Saturday: mockTodaySchedule.slice(0, 2),
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">View your class timetable</p>
        </div>

        {/* Today's Timetable Panel */}
        <Collapsible open={timetableOpen} onOpenChange={setTimetableOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Today's Timetable
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${timetableOpen ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3 pt-0">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Class 10 - Science Batch • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
                {mockTodaySchedule.map((classItem) => (
                  <div key={classItem.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 text-center min-w-[55px]">
                      <div className="font-bold text-sm text-primary">{classItem.startTime}</div>
                      <div className="text-[10px] text-muted-foreground">{classItem.endTime}</div>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{classItem.subject}</div>
                      <div className="text-xs text-muted-foreground truncate">{classItem.teacher}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-muted-foreground">{classItem.room}</div>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 mt-0.5 capitalize">
                        {classItem.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Weekly Timetable Panel */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Timetable
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {Object.entries(weekSchedule).map(([day, classes]) => (
                <div key={day}>
                  <div className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${day === new Date().toLocaleDateString('en-US', { weekday: 'long' }) ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                    {day}
                  </div>
                  <div className="space-y-1.5 ml-3">
                    {classes.map((classItem) => (
                      <div key={`${day}-${classItem.id}`} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs hover:bg-muted/50 transition-colors">
                        <span className="font-semibold text-primary min-w-[45px]">{classItem.startTime}</span>
                        <span className="font-medium flex-1 truncate">{classItem.subject}</span>
                        <span className="text-muted-foreground text-[10px] truncate">{classItem.room}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
