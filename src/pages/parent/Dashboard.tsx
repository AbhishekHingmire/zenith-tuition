import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsightCard } from '@/components/ui/insight-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parentInsights } from '@/data/mockInsights';
import { mockStudents } from '@/data/mockData';
import { mockAssignments } from '@/data/mockStudentData';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const child = mockStudents[0];
  const attendance = child.attendancePercentage;
  const performance = 88; // Mock performance score
  const grade = child.batch.includes('10') ? '10' : child.batch.includes('9') ? '9' : '8';
  const feeStatus = child.status === 'active' ? 'paid' : 'pending';
  
  const upcomingExams = [
    { name: 'Mid-Term Math', subject: 'Mathematics', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), totalMarks: 100 },
    { name: 'Science Unit Test', subject: 'Science', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), totalMarks: 50 }
  ];
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').slice(0, 3);

  return (
    <MainLayout>
      <div className="space-y-6 pb-20 md:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your child's progress and activities</p>
        </div>

        {/* Priority Alerts */}
        {attendance < 75 && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-destructive">Action Required: Low Attendance</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {child.name}'s attendance is {attendance}%. Minimum 75% required.
              </p>
            </div>
            <Button size="sm" variant="destructive">Review</Button>
          </div>
        )}

        {/* AI Insights */}
        <div className="grid gap-4">
          {parentInsights.map((insight, index) => (
            <InsightCard
              key={index}
              type={insight.type}
              icon={insight.icon}
              title={insight.title}
              message={insight.message}
              action={insight.action}
              onActionClick={() => console.log('Action clicked')}
            />
          ))}
        </div>

        {/* Child Info Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {child.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{child.name}</h2>
                <p className="text-muted-foreground">Admission No: {child.admissionNo}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge>Grade {grade}</Badge>
                  <Badge variant="secondary">{child.batch}</Badge>
                  <Badge variant={feeStatus === 'paid' ? 'default' : 'destructive'}>
                    Fee: {feeStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="text-2xl font-bold text-foreground">{attendance}%</p>
                </div>
                <Clock className={attendance >= 75 ? "text-green-500" : "text-destructive"} />
              </div>
              <Progress value={attendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="text-2xl font-bold text-foreground">{performance}%</p>
                </div>
                <TrendingUp className="text-primary" />
              </div>
              <Progress value={performance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                  <p className="text-2xl font-bold text-foreground">{pendingAssignments.length}</p>
                </div>
                <BookOpen className="text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="text-2xl font-bold text-foreground">#5</p>
                </div>
                <Award className="text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Out of 30</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Attendance</span>
                <span className="text-sm text-muted-foreground">{attendance}% vs 87% (Class Avg)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Progress value={attendance} className="h-2" />
                <Progress value={87} className="h-2 opacity-50" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Academic Performance</span>
                <span className="text-sm text-muted-foreground">{performance}% vs 73% (Class Avg)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Progress value={performance} className="h-2" />
                <Progress value={73} className="h-2 opacity-50" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Assignment Completion</span>
                <span className="text-sm text-muted-foreground">90% vs 82% (Class Avg)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Progress value={90} className="h-2" />
                <Progress value={82} className="h-2 opacity-50" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{exam.name}</h4>
                      <p className="text-sm text-muted-foreground">{exam.subject}</p>
                    </div>
                    <Badge variant="secondary">
                      {Math.ceil((new Date(exam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>📅 {new Date(exam.date).toLocaleDateString()}</span>
                    <span>📝 {exam.totalMarks} marks</span>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline" onClick={() => navigate('/parent/reports')}>
                View All Exams
              </Button>
            </CardContent>
          </Card>

          {/* Pending Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Pending Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <Badge variant="destructive">Due</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>📅 {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    <span>📝 {assignment.totalMarks} marks</span>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline" onClick={() => navigate('/parent/assignments')}>
                View All Assignments
              </Button>
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
              <Button className="h-auto py-4 flex-col gap-2" variant="outline" onClick={() => navigate('/parent/fees')}>
                <DollarSign className="w-5 h-5" />
                <span>Pay Fees</span>
              </Button>
              <Button className="h-auto py-4 flex-col gap-2" variant="outline" onClick={() => navigate('/parent/leave-request')}>
                <Calendar className="w-5 h-5" />
                <span>Request Leave</span>
              </Button>
              <Button className="h-auto py-4 flex-col gap-2" variant="outline" onClick={() => navigate('/parent/messages')}>
                <BookOpen className="w-5 h-5" />
                <span>Message Teacher</span>
              </Button>
              <Button className="h-auto py-4 flex-col gap-2" variant="outline" onClick={() => navigate('/parent/reports')}>
                <TrendingUp className="w-5 h-5" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
