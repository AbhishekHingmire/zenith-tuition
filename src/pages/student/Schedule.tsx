import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Mock schedule data - student can have multiple batches with different subjects
const mockSchedule = [
  { day: 'Monday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
  { day: 'Monday', time: '11:00 AM - 12:00 PM', batch: 'Grade 10-A', subject: 'Physics', teacher: 'Prof. Sarah Johnson', room: 'Room 305' },
  { day: 'Monday', time: '02:00 PM - 03:00 PM', batch: 'Grade 10-B', subject: 'Chemistry', teacher: 'Dr. Michael Brown', room: 'Room 102' },
  { day: 'Tuesday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 201' },
  { day: 'Tuesday', time: '10:00 AM - 11:00 AM', batch: 'Grade 10-A', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
  { day: 'Tuesday', time: '02:00 PM - 03:00 PM', batch: 'Grade 10-B', subject: 'Biology', teacher: 'Dr. Lisa Wilson', room: 'Room 103' },
  { day: 'Wednesday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Physics', teacher: 'Prof. Sarah Johnson', room: 'Room 305' },
  { day: 'Wednesday', time: '11:00 AM - 12:00 PM', batch: 'Grade 10-A', subject: 'Chemistry', teacher: 'Dr. Michael Brown', room: 'Room 102' },
  { day: 'Thursday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
  { day: 'Thursday', time: '10:00 AM - 11:00 AM', batch: 'Grade 10-B', subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 204' },
  { day: 'Thursday', time: '02:00 PM - 03:00 PM', batch: 'Grade 10-A', subject: 'Biology', teacher: 'Dr. Lisa Wilson', room: 'Room 103' },
  { day: 'Friday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Physics', teacher: 'Prof. Sarah Johnson', room: 'Room 305' },
  { day: 'Friday', time: '11:00 AM - 12:00 PM', batch: 'Grade 10-B', subject: 'Mathematics', teacher: 'Dr. John Smith', room: 'Room 201' },
  { day: 'Saturday', time: '09:00 AM - 10:00 AM', batch: 'Grade 10-A', subject: 'Extra Class - Math', teacher: 'Dr. John Smith', room: 'Room 201' },
];

export default function StudentSchedule() {
  const getClassesForDay = (day: string) => {
    return mockSchedule.filter(item => item.day === day);
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Get unique batches and count classes per batch
  const batches = Array.from(new Set(mockSchedule.map(item => item.batch)));
  const totalClasses = mockSchedule.length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Timetable</h1>
          <p className="text-muted-foreground mt-1">Your weekly class schedule</p>
        </div>

        {/* Today's Classes */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Classes - {today}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getClassesForDay(today).length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No classes scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {getClassesForDay(today).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium min-w-[140px] text-center">
                        {item.time}
                      </div>
                      <div>
                        <p className="font-semibold">{item.subject}</p>
                        <p className="text-sm text-muted-foreground">{item.batch} • {item.teacher}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{item.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                const isToday = day === today;
                
                return (
                  <div key={day} className={`${isToday ? 'border-l-4 border-primary pl-4' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className={`font-semibold ${isToday ? 'text-primary' : ''}`}>{day}</h3>
                      {isToday && <Badge>Today</Badge>}
                      <span className="text-sm text-muted-foreground">
                        ({classes.length} {classes.length === 1 ? 'class' : 'classes'})
                      </span>
                    </div>
                    
                    {classes.length === 0 ? (
                      <p className="text-sm text-muted-foreground pl-4">No classes scheduled</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                        {classes.map((item, index) => (
                          <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{item.subject}</p>
                                <p className="text-xs text-muted-foreground truncate">{item.batch}</p>
                              </div>
                              <Badge variant="outline" className="ml-2 flex-shrink-0 text-xs">{item.room}</Badge>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{item.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{item.teacher}</span>
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

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{totalClasses}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Classes/Week</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{batches.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Batches Enrolled</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{Array.from(new Set(mockSchedule.map(s => s.subject))).length}</p>
                <p className="text-sm text-muted-foreground mt-1">Subjects</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
