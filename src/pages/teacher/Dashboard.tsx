import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Users, 
  ClipboardList, 
  BookOpen, 
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const todaySchedule = [
    { time: '09:00 AM', batch: 'Grade 10-A', subject: 'Mathematics', room: 'Room 201' },
    { time: '11:00 AM', batch: 'Grade 11-B', subject: 'Physics', room: 'Room 305' },
    { time: '02:00 PM', batch: 'Grade 9-C', subject: 'Mathematics', room: 'Room 201' },
  ];

  const pendingTasks = [
    { id: 1, task: 'Grade Assignment: Quadratic Equations', batch: 'Grade 10-A', due: '2 days', urgent: true },
    { id: 2, task: 'Enter Exam Marks: Mid-term Physics', batch: 'Grade 11-B', due: '5 days', urgent: false },
    { id: 3, task: 'Prepare Study Material: Thermodynamics', batch: 'Grade 11-B', due: '1 week', urgent: false },
  ];

  const recentActivity = [
    { text: 'Rahul Kumar submitted assignment', time: '10 mins ago' },
    { text: 'Priya Sharma asked a doubt in Mathematics', time: '1 hour ago' },
    { text: 'Admin approved your leave request', time: '2 hours ago' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, Dr. John Smith! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your classes today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Classes Today</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">120</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Grading</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <ClipboardList className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Today's Schedule</span>
                <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/schedule')}>
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
                        {item.time}
                      </div>
                      <div>
                        <p className="font-medium">{item.batch}</p>
                        <p className="text-sm text-muted-foreground">{item.subject} • {item.room}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{task.task}</p>
                        {task.urgent && <Badge variant="destructive">Urgent</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{task.batch}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {task.due}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-20" onClick={() => navigate('/teacher/attendance')}>
                <div className="text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs">Mark Attendance</p>
                </div>
              </Button>
              <Button variant="outline" className="h-20" onClick={() => navigate('/teacher/assignments')}>
                <div className="text-center">
                  <ClipboardList className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs">Create Assignment</p>
                </div>
              </Button>
              <Button variant="outline" className="h-20" onClick={() => navigate('/teacher/materials')}>
                <div className="text-center">
                  <BookOpen className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs">Upload Material</p>
                </div>
              </Button>
              <Button variant="outline" className="h-20" onClick={() => navigate('/teacher/exams')}>
                <div className="text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs">Create Exam</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
