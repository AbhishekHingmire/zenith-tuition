import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, MapPin, RefreshCw, CalendarDays } from 'lucide-react';
import { mockTodaySchedule } from '@/data/mockStudentData';
import { format } from 'date-fns';

export default function StudentSchedule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const weekSchedule = {
    Monday: mockTodaySchedule,
    Tuesday: mockTodaySchedule,
    Wednesday: mockTodaySchedule,
    Thursday: mockTodaySchedule,
    Friday: mockTodaySchedule,
    Saturday: mockTodaySchedule.slice(0, 2),
    Sunday: [],
  };

  const getCurrentClassIndex = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    return mockTodaySchedule.findIndex((classItem) => {
      const [startHour, startMinute] = classItem.startTime.split(':').map(Number);
      const [endHour, endMinute] = classItem.endTime.split(':').map(Number);
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
    });
  };

  const isClassPast = (endTime: string) => {
    const [hour, minute] = endTime.split(':').map(Number);
    const classEndInMinutes = hour * 60 + minute;
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    return currentTimeInMinutes > classEndInMinutes;
  };

  const currentClassIndex = getCurrentClassIndex();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <MainLayout>
      <div className="space-y-4 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Timetable</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {format(currentTime, 'EEEE, MMMM d, yyyy')} • {format(currentTime, 'h:mm a')}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="hidden sm:flex">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left Panel - Today's Timetable (40%) */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today's Timetable
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  Class 10 - Science Batch
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockTodaySchedule.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No classes today</p>
                    <p className="text-xs text-muted-foreground mt-1">Enjoy your day off!</p>
                  </div>
                ) : (
                  mockTodaySchedule.map((classItem, index) => {
                    const isCurrentClass = index === currentClassIndex;
                    const isPast = isClassPast(classItem.endTime);
                    
                    return (
                      <div
                        key={classItem.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          isCurrentClass
                            ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20'
                            : isPast
                            ? 'border-border bg-muted/30 opacity-60'
                            : 'border-border hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex-shrink-0 text-center min-w-[60px]">
                          <div className={`font-bold text-sm ${isCurrentClass ? 'text-primary' : isPast ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {classItem.startTime}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {classItem.endTime}
                          </div>
                          {isCurrentClass && (
                            <Badge variant="default" className="mt-1 text-[9px] px-1 py-0">
                              Now
                            </Badge>
                          )}
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm truncate ${isPast ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {classItem.subject}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground truncate mt-0.5">
                            <User className="w-3 h-3 flex-shrink-0" />
                            {classItem.teacher}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground truncate mt-0.5">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {classItem.room}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize flex-shrink-0">
                          {classItem.type}
                        </Badge>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Weekly Timetable with Tabs (60%) */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="w-5 h-5 text-primary" />
                    Weekly Timetable
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={currentDay} className="w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <TabsList className="grid w-full grid-cols-7 gap-0.5 h-auto p-0.5">
                      {Object.keys(weekSchedule).map((day) => (
                        <TabsTrigger 
                          key={day} 
                          value={day}
                          className={`text-[10px] sm:text-xs px-1 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
                            day === currentDay ? 'font-bold' : ''
                          }`}
                        >
                          {day.slice(0, 3)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  
                  {Object.entries(weekSchedule).map(([day, classes]) => (
                    <TabsContent key={day} value={day} className="space-y-2 mt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-semibold text-muted-foreground">
                          {day} • {classes.length} {classes.length === 1 ? 'class' : 'classes'}
                        </div>
                        {day === currentDay && (
                          <Badge variant="default" className="text-[10px] px-2 py-0">
                            Today
                          </Badge>
                        )}
                      </div>
                      
                      {classes.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded-lg">
                          <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No classes scheduled</p>
                        </div>
                      ) : (
                        classes.map((classItem, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-3 p-2.5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-shrink-0 text-center min-w-[50px]">
                              <div className="font-bold text-xs text-primary">
                                {classItem.startTime}
                              </div>
                              <div className="text-[10px] text-muted-foreground">
                                {classItem.endTime}
                              </div>
                            </div>
                            <div className="h-10 w-px bg-border" />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs truncate">
                                {classItem.subject}
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground truncate mt-0.5">
                                <User className="w-2.5 h-2.5 flex-shrink-0" />
                                {classItem.teacher}
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground truncate mt-0.5">
                                <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                                {classItem.room}
                              </div>
                            </div>
                            <Badge variant="outline" className="text-[9px] px-1 py-0 capitalize flex-shrink-0">
                              {classItem.type}
                            </Badge>
                          </div>
                        ))
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
