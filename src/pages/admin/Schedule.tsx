import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, MapPin, BookOpen } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mockSchedule = [
  { day: 'Monday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
  { day: 'Monday', time: '10:00 AM - 11:00 AM', batch: 'Grade 9-B', subject: 'Science', teacher: 'Mrs. Patel', room: 'Room 102' },
  { day: 'Monday', time: '11:00 AM - 12:00 PM', batch: 'Grade 11-A', subject: 'Physics', teacher: 'Dr. Kumar', room: 'Room 305' },
  
  { day: 'Tuesday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Science', teacher: 'Mrs. Patel', room: 'Room 102' },
  { day: 'Tuesday', time: '10:00 AM - 11:00 AM', batch: 'Grade 9-B', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
  { day: 'Tuesday', time: '11:00 AM - 12:00 PM', batch: 'Grade 11-A', subject: 'Chemistry', teacher: 'Dr. Singh', room: 'Room 303' },
  
  { day: 'Wednesday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'English', teacher: 'Ms. Khan', room: 'Room 105' },
  { day: 'Wednesday', time: '10:00 AM - 11:00 AM', batch: 'Grade 9-B', subject: 'English', teacher: 'Ms. Khan', room: 'Room 105' },
  { day: 'Wednesday', time: '11:00 AM - 12:00 PM', batch: 'Grade 11-A', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
  
  { day: 'Thursday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Physics', teacher: 'Dr. Kumar', room: 'Room 305' },
  { day: 'Thursday', time: '10:00 AM - 11:00 AM', batch: 'Grade 9-B', subject: 'Social Studies', teacher: 'Mr. Verma', room: 'Room 104' },
  { day: 'Thursday', time: '11:00 AM - 12:00 PM', batch: 'Grade 11-A', subject: 'English', teacher: 'Ms. Khan', room: 'Room 105' },
  
  { day: 'Friday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Computer Science', teacher: 'Mr. Sharma', room: 'Lab 1' },
  { day: 'Friday', time: '10:00 AM - 11:00 AM', batch: 'Grade 9-B', subject: 'Computer Science', teacher: 'Mr. Sharma', room: 'Lab 1' },
  { day: 'Friday', time: '11:00 AM - 12:00 PM', batch: 'Grade 11-A', subject: 'Physics Lab', teacher: 'Dr. Kumar', room: 'Lab 2' },
];

export default function AdminSchedule() {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');

  const batches = ['all', 'Grade 10-A', 'Grade 9-B', 'Grade 11-A'];

  const filteredSchedule = mockSchedule.filter(item => {
    const matchesBatch = selectedBatch === 'all' || item.batch === selectedBatch;
    const matchesDay = selectedDay === 'all' || item.day === selectedDay;
    return matchesBatch && matchesDay;
  });

  const getClassesForDay = (day: string) => {
    return filteredSchedule.filter(item => item.day === day);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Master Schedule</h1>
          <p className="text-muted-foreground mt-1">View and manage all class schedules</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Filter by Batch</label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map(batch => (
                      <SelectItem key={batch} value={batch}>
                        {batch === 'all' ? 'All Batches' : batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Filter by Day</label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Days</SelectItem>
                    {weekDays.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weekDays.map((day) => {
                const classes = getClassesForDay(day);
                
                if (classes.length === 0 && selectedDay === 'all') return null;
                
                return (
                  <div key={day}>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-lg">{day}</h3>
                      <Badge variant="outline">{classes.length} classes</Badge>
                    </div>
                    
                    {classes.length === 0 ? (
                      <p className="text-sm text-muted-foreground pl-4">No classes scheduled</p>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                        {classes.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-muted/30">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-semibold text-sm">{item.batch}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <BookOpen className="w-3 h-3" />
                                  {item.subject}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">{item.room}</Badge>
                            </div>
                            
                            <div className="space-y-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>{item.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-3 h-3" />
                                <span>{item.teacher}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{mockSchedule.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Classes/Week</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">5</p>
                <p className="text-sm text-muted-foreground mt-1">Active Teachers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">3</p>
                <p className="text-sm text-muted-foreground mt-1">Active Batches</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">6</p>
                <p className="text-sm text-muted-foreground mt-1">Rooms in Use</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
