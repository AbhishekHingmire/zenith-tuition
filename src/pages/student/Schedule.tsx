import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { InteractiveTimetable } from '@/components/student/InteractiveTimetable';
import { mockTodaySchedule } from '@/data/mockStudentData';
import { Clock, MapPin, User } from 'lucide-react';

export default function StudentSchedule() {
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
          <p className="text-muted-foreground mt-1">View your class timetable</p>
        </div>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            <InteractiveTimetable schedule={mockTodaySchedule} />
          </TabsContent>

          <TabsContent value="week" className="space-y-4">
            {Object.entries(weekSchedule).map(([day, classes]) => (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classes.map((classItem) => (
                      <div
                        key={classItem.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">{classItem.subject}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span className="whitespace-nowrap">{classItem.startTime} - {classItem.endTime}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{classItem.teacher}</span>
                            </div>
                            <span>•</span>
                            <span>{classItem.room}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize whitespace-nowrap">
                          {classItem.type.replace('-', ' ')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
