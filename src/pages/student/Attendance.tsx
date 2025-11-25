import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const mockAttendance = {
  overall: 87,
  present: 52,
  absent: 6,
  leave: 2,
  total: 60,
  subjectWise: [
    { subject: 'Mathematics', percentage: 90, present: 27, total: 30 },
    { subject: 'Physics', percentage: 85, present: 17, total: 20 },
    { subject: 'Chemistry', percentage: 88, present: 22, total: 25 },
    { subject: 'English', percentage: 84, present: 21, total: 25 },
  ],
  dailyRecords: [
    { date: new Date(2025, 10, 1), status: 'present' },
    { date: new Date(2025, 10, 2), status: 'present' },
    { date: new Date(2025, 10, 3), status: 'absent' },
    { date: new Date(2025, 10, 4), status: 'present' },
    { date: new Date(2025, 10, 5), status: 'leave' },
    { date: new Date(2025, 10, 8), status: 'present' },
    { date: new Date(2025, 10, 9), status: 'present' },
    { date: new Date(2025, 10, 10), status: 'present' },
    { date: new Date(2025, 10, 11), status: 'absent' },
    { date: new Date(2025, 10, 12), status: 'present' },
    { date: new Date(2025, 10, 15), status: 'present' },
    { date: new Date(2025, 10, 16), status: 'present' },
    { date: new Date(2025, 10, 17), status: 'present' },
    { date: new Date(2025, 10, 18), status: 'present' },
    { date: new Date(2025, 10, 19), status: 'present' },
    { date: new Date(2025, 10, 22), status: 'present' },
    { date: new Date(2025, 10, 23), status: 'present' },
    { date: new Date(2025, 10, 24), status: 'absent' },
  ],
};

export default function StudentAttendance() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getStatusForDay = (day: Date) => {
    const record = mockAttendance.dailyRecords.find(r => isSameDay(r.date, day));
    return record?.status || null;
  };

  const getStatusColor = (status: string | null) => {
    if (!status) return 'bg-muted';
    switch (status) {
      case 'present': return 'bg-secondary/80';
      case 'absent': return 'bg-destructive/80';
      case 'leave': return 'bg-accent/80';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string | null) => {
    if (!status) return null;
    switch (status) {
      case 'present': return <CheckCircle className="w-3 h-3 text-white" />;
      case 'absent': return <XCircle className="w-3 h-3 text-white" />;
      case 'leave': return <Clock className="w-3 h-3 text-white" />;
      default: return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">View your attendance records</p>
        </div>

        {/* Overall Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-5xl font-bold text-secondary">{mockAttendance.overall}%</p>
              <p className="text-sm text-muted-foreground mt-1">Overall Attendance</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-secondary">{mockAttendance.present}</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{mockAttendance.absent}</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{mockAttendance.leave}</p>
                <p className="text-xs text-muted-foreground">Leave</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Monthly Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{format(currentMonth, 'MMMM yyyy')}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {daysInMonth.map((day) => {
                const status = getStatusForDay(day);
                return (
                  <div
                    key={day.toString()}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 ${getStatusColor(status)}`}
                  >
                    <span className={`text-xs font-medium ${status ? 'text-white' : 'text-foreground'}`}>
                      {format(day, 'd')}
                    </span>
                    {status && <div className="mt-0.5">{getStatusIcon(status)}</div>}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-secondary/80" />
                <span>Present</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-destructive/80" />
                <span>Absent</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-accent/80" />
                <span>Leave</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-muted" />
                <span>No Class</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subject-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAttendance.subjectWise.map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{subject.subject}</span>
                  <span className="text-muted-foreground">
                    {subject.present}/{subject.total} ({subject.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${subject.percentage >= 85 ? 'bg-secondary' : subject.percentage >= 75 ? 'bg-accent' : 'bg-destructive'}`}
                    style={{ width: `${subject.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
