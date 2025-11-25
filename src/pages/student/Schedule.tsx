import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User } from 'lucide-react';
import { mockTodaySchedule } from '@/data/mockStudentData';

export default function StudentSchedule() {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
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
      <div className="space-y-4 pb-20 md:pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Timetable</h1>
          <p className="text-sm text-muted-foreground mt-1">View your class timetable</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Panel - Today's Timetable */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Today's Timetable
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                Class 10 - Science Batch • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockTodaySchedule.map((classItem) => (
                <div key={classItem.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-shrink-0 text-center min-w-[55px]">
                    <div className="font-bold text-sm text-primary">{classItem.startTime}</div>
                    <div className="text-[10px] text-muted-foreground">{classItem.endTime}</div>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{classItem.subject}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                      <User className="w-3 h-3 flex-shrink-0" />
                      {classItem.teacher}
                    </div>
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
          </Card>

          {/* Right Panel - Weekly Timetable with Tabs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={currentDay} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
                  {Object.keys(weekSchedule).map((day) => (
                    <TabsTrigger 
                      key={day} 
                      value={day}
                      className={`text-xs ${day === currentDay ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : ''}`}
                    >
                      {day.slice(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {Object.entries(weekSchedule).map(([day, classes]) => (
                  <TabsContent key={day} value={day} className="space-y-2 mt-4">
                    <div className="text-xs font-semibold text-muted-foreground mb-3">
                      {day} • {classes.length} classes
                    </div>
                    {classes.map((classItem, index) => (
                      <div key={index} className="flex items-center gap-3 p-2.5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-shrink-0 text-center min-w-[50px]">
                          <div className="font-bold text-xs text-primary">{classItem.startTime}</div>
                          <div className="text-[10px] text-muted-foreground">{classItem.endTime}</div>
                        </div>
                        <div className="h-8 w-px bg-border" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs truncate">{classItem.subject}</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1 truncate">
                            <User className="w-2.5 h-2.5 flex-shrink-0" />
                            {classItem.teacher}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-muted-foreground">{classItem.room}</div>
                          <Badge variant="outline" className="text-[9px] px-1 py-0 mt-0.5 capitalize">
                            {classItem.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
