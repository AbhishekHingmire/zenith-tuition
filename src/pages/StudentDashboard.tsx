import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Calendar, TrendingUp, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const todaySchedule = [
  { subject: 'Mathematics', time: '9:00 AM - 10:30 AM', teacher: 'Mr. John', room: 'Room 101' },
  { subject: 'Science', time: '11:00 AM - 12:30 PM', teacher: 'Ms. Sarah', room: 'Lab 1' },
  { subject: 'English', time: '2:00 PM - 3:30 PM', teacher: 'Mrs. Emily', room: 'Room 203' },
];

const pendingAssignments = [
  { title: 'Math - Algebra Problems', subject: 'Mathematics', dueDate: 'Tomorrow', urgent: true },
  { title: 'Science - Lab Report', subject: 'Science', dueDate: 'In 2 days', urgent: false },
  { title: 'English - Essay Writing', subject: 'English', dueDate: 'In 3 days', urgent: false },
];

const recentResults = [
  { subject: 'Mathematics', marks: '85/100', grade: 'A', percentage: 85 },
  { subject: 'Science', marks: '92/100', grade: 'A+', percentage: 92 },
  { subject: 'English', marks: '78/100', grade: 'B+', percentage: 78 },
];

export default function StudentDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Alex! Ready to learn today?</p>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              My Schedule Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cls.subject}</h3>
                      <p className="text-sm text-gray-600">{cls.time} • {cls.teacher}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{cls.room}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Assignments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
                Pending Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingAssignments.map((assignment, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      assignment.urgent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {assignment.subject} • Due: {assignment.dueDate}
                        </p>
                      </div>
                      <Button size="sm" variant={assignment.urgent ? 'default' : 'outline'}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.94)}`}
                      className="text-emerald-600"
                    />
                  </svg>
                  <div className="absolute">
                    <p className="text-3xl font-bold text-gray-900">94%</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">This Month</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Present</span>
                    <span className="font-medium">17 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Absent</span>
                    <span className="font-medium">1 day</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Exam Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-indigo-600" />
              Recent Exam Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{result.subject}</h3>
                      <p className="text-sm text-gray-600">Marks: {result.marks}</p>
                    </div>
                    <span
                      className={`text-lg font-bold ${
                        result.percentage >= 90
                          ? 'text-emerald-600'
                          : result.percentage >= 75
                          ? 'text-blue-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {result.grade}
                    </span>
                  </div>
                  <Progress value={result.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Mathematics - Unit Test 2', 'Science - Mid-term', 'English - Grammar Test'].map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900">{exam}</p>
                  <span className="text-sm text-gray-600">{['Feb 20', 'Feb 25', 'Feb 28'][index]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
