import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, FileText, User, CheckCircle2, Award } from 'lucide-react';
import { mockAssignments } from '@/data/mockStudentData';
import { format } from 'date-fns';

export default function StudentAssignments() {
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const completedAssignments = mockAssignments.filter(a => a.status === 'graded' || a.status === 'submitted');
  
  // Group completed assignments by subject
  const completedBySubject = completedAssignments.reduce((acc, assignment) => {
    if (!acc[assignment.subject]) {
      acc[assignment.subject] = [];
    }
    acc[assignment.subject].push(assignment);
    return acc;
  }, {} as Record<string, typeof completedAssignments>);

  const subjects = ['All', ...Object.keys(completedBySubject)];

  return (
    <MainLayout>
      <div className="space-y-4 pb-20 md:pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Assignments</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your assignments and submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <p className="text-2xl font-bold text-destructive">{pendingAssignments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedAssignments.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Panel - Pending Assignments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-5 h-5 text-destructive" />
                Pending Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingAssignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No pending assignments</p>
                  <p className="text-xs text-muted-foreground mt-1">Great job! You're all caught up</p>
                </div>
              ) : (
                pendingAssignments.map((assignment) => {
                  const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysUntilDue <= 2;
                  
                  return (
                    <div 
                      key={assignment.id} 
                      className={`p-3 border rounded-lg space-y-2 transition-colors ${
                        isUrgent ? 'border-destructive/50 bg-destructive/5' : 'hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm">{assignment.title}</h4>
                        <Badge 
                          variant={isUrgent ? "destructive" : "outline"} 
                          className="text-xs shrink-0"
                        >
                          {assignment.subject}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(assignment.dueDate, 'MMM d, h:mm a')}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {assignment.postedBy.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {assignment.totalMarks} marks
                        </div>
                      </div>
                      {isUrgent && (
                        <div className="text-xs font-medium text-destructive">
                          Due in {daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'}!
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Completed Assignments with Tabs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Completed Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedAssignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No completed assignments yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Complete pending assignments to see them here</p>
                </div>
              ) : (
                <Tabs defaultValue="All" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-1 mb-4">
                    {subjects.slice(0, 3).map((subject) => (
                      <TabsTrigger 
                        key={subject} 
                        value={subject}
                        className="text-xs"
                      >
                        {subject}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="All" className="space-y-3 mt-0">
                    {completedAssignments.map((assignment) => (
                      <div 
                        key={assignment.id} 
                        className="p-3 border border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800 rounded-lg space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <h4 className="font-semibold text-sm">{assignment.title}</h4>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0 border-green-600 text-green-600">
                            {assignment.subject}
                          </Badge>
                        </div>
                        {assignment.submission && (
                          <div className="flex items-center justify-between text-xs ml-6">
                            <span className="text-muted-foreground">
                              Completed: {format(assignment.submission.submittedDate, 'MMM d, yyyy')}
                            </span>
                            {assignment.submission.marks !== undefined && (
                              <Badge variant="secondary" className="font-semibold">
                                {assignment.submission.marks}/{assignment.totalMarks}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>

                  {Object.entries(completedBySubject).map(([subject, assignments]) => (
                    <TabsContent key={subject} value={subject} className="space-y-3 mt-0">
                      <div className="text-xs text-muted-foreground mb-3">
                        {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'} completed in {subject}
                      </div>
                      {assignments.map((assignment) => (
                        <div 
                          key={assignment.id} 
                          className="p-3 border border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800 rounded-lg space-y-2"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm">{assignment.title}</h4>
                              {assignment.submission && (
                                <div className="flex items-center justify-between text-xs mt-2">
                                  <span className="text-muted-foreground">
                                    {format(assignment.submission.submittedDate, 'MMM d, yyyy')}
                                  </span>
                                  {assignment.submission.marks !== undefined && (
                                    <Badge variant="secondary" className="font-semibold">
                                      {assignment.submission.marks}/{assignment.totalMarks}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
