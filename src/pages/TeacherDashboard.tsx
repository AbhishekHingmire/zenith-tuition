import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, CheckSquare, BookOpen, Bell } from 'lucide-react';

const todayClasses = [
  { batch: 'Grade 10 - Mathematics', time: '9:00 AM - 10:30 AM', students: 25, room: 'Room 101' },
  { batch: 'Grade 9 - Science', time: '11:00 AM - 12:30 PM', students: 28, room: 'Room 203' },
  { batch: 'Grade 11 - Physics', time: '2:00 PM - 3:30 PM', students: 22, room: 'Lab 1' },
];

const pendingTasks = [
  { task: 'Grade Math Assignment - Grade 10', count: 25, dueDate: 'Today' },
  { task: 'Mark Attendance - Science Batch', count: 1, dueDate: 'Today' },
  { task: 'Enter Marks - Unit Test', count: 28, dueDate: 'Tomorrow' },
];

const announcements = [
  { title: 'Parent-Teacher Meeting', date: '2024-02-15', priority: 'high' },
  { title: 'Mid-term Exams Schedule Released', date: '2024-02-10', priority: 'medium' },
];

export default function TeacherDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Good morning! Here's your schedule for today.</p>
        </div>

        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              My Classes Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{cls.batch}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {cls.time}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {cls.students} students
                      </span>
                      <span>{cls.room}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Start Class
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="w-5 h-5 mr-2 text-emerald-600" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{task.task}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {task.count} item{task.count > 1 ? 's' : ''} • Due: {task.dueDate}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-amber-600" />
                Recent Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.map((announcement, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{announcement.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{announcement.date}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          announcement.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {announcement.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <CheckSquare className="w-5 h-5 mr-2" />
                Mark Attendance
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <BookOpen className="w-5 h-5 mr-2" />
                Post Assignment
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <CheckSquare className="w-5 h-5 mr-2" />
                Enter Marks
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Users className="w-5 h-5 mr-2" />
                View Students
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
