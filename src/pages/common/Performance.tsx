import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  TrendingUp, 
  TrendingDown,
  Star,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const mockPerformanceData = {
  teachingStats: {
    classesThisMonth: 45,
    totalStudents: 120,
    averageAttendance: 87,
    assignmentsPosted: 12,
    examsConduc: 3,
  },
  studentFeedback: {
    averageRating: 4.5,
    totalReviews: 89,
    recentComments: [
      "Explains concepts very clearly",
      "Very patient and helpful",
      "Makes difficult topics easy to understand"
    ],
    strengths: ["Clear Explanations", "Patient", "Engaging"],
    improvements: ["More practice problems", "Slower pace"]
  },
  classPerformance: [
    { batch: 'Grade 10-A', avgScore: 78, trend: '+5%', students: 35 },
    { batch: 'Grade 11-B', avgScore: 72, trend: '-2%', students: 40 },
    { batch: 'Grade 9-C', avgScore: 85, trend: '+8%', students: 45 }
  ],
  attendanceTracking: {
    markingConsistency: 95,
    classesMissed: 2,
    decliningStudents: 5
  },
  assignmentGrading: {
    pendingGrading: 15,
    avgTurnaroundTime: 2,
    submissionRate: 85
  },
  whatsappCommunication: {
    queriesResponded: 42,
    totalQueries: 45,
    avgResponseTime: 4,
    pendingQueries: 3
  }
};

export default function Performance() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Performance Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your teaching metrics and performance</p>
        </div>

        {/* Teaching Stats */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Teaching Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Classes</p>
                    <p className="text-2xl font-bold">{mockPerformanceData.teachingStats.classesThisMonth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="text-2xl font-bold">{mockPerformanceData.teachingStats.totalStudents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                    <p className="text-2xl font-bold">{mockPerformanceData.teachingStats.averageAttendance}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assignments</p>
                    <p className="text-2xl font-bold">{mockPerformanceData.teachingStats.assignmentsPosted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Exams</p>
                    <p className="text-2xl font-bold">{mockPerformanceData.teachingStats.examsConduc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Student Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Student Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{mockPerformanceData.studentFeedback.averageRating}</div>
                <div className="text-sm text-muted-foreground">/ 5 stars</div>
                <div className="text-xs text-muted-foreground mt-1">{mockPerformanceData.studentFeedback.totalReviews} reviews</div>
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Recent Feedback:</p>
                  <div className="space-y-2">
                    {mockPerformanceData.studentFeedback.recentComments.map((comment, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>"{comment}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm font-medium mb-2">Strengths:</p>
                <div className="flex flex-wrap gap-2">
                  {mockPerformanceData.studentFeedback.strengths.map((strength, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-secondary/20">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Areas for Improvement:</p>
                <div className="flex flex-wrap gap-2">
                  {mockPerformanceData.studentFeedback.improvements.map((improvement, idx) => (
                    <Badge key={idx} variant="outline">
                      {improvement}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Batch-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPerformanceData.classPerformance.map((batch) => (
                <div key={batch.batch} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{batch.batch}</h3>
                      <Badge variant="outline">{batch.students} students</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Average Score</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{batch.avgScore}%</span>
                      {batch.trend.startsWith('+') ? (
                        <Badge variant="secondary" className="bg-secondary/20">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {batch.trend}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {batch.trend}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Marking Consistency</p>
                <div className="flex items-center gap-3">
                  <Progress value={mockPerformanceData.attendanceTracking.markingConsistency} className="h-3" />
                  <span className="font-semibold">{mockPerformanceData.attendanceTracking.markingConsistency}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  You've marked attendance on time 95% of the time
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Classes Missed</p>
                  <p className="text-2xl font-bold">{mockPerformanceData.attendanceTracking.classesMissed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Declining Students</p>
                  <p className="text-2xl font-bold text-destructive">{mockPerformanceData.attendanceTracking.decliningStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Grading */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment & Grading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Pending Grading</p>
                    <p className="text-sm text-muted-foreground">Assignments to review</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">{mockPerformanceData.assignmentGrading.pendingGrading}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Turnaround</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xl font-bold">{mockPerformanceData.assignmentGrading.avgTurnaroundTime} days</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submission Rate</p>
                  <span className="text-xl font-bold">{mockPerformanceData.assignmentGrading.submissionRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Communication */}
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Queries Responded</p>
                  <p className="text-2xl font-bold">
                    {mockPerformanceData.whatsappCommunication.queriesResponded}/
                    {mockPerformanceData.whatsappCommunication.totalQueries}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Queries</p>
                  <p className="text-2xl font-bold text-primary">{mockPerformanceData.whatsappCommunication.pendingQueries}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Average Response Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xl font-bold">{mockPerformanceData.whatsappCommunication.avgResponseTime} hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
