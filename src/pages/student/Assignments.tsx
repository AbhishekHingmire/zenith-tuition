import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, User, CheckCircle2, Award } from 'lucide-react';
import { mockAssignments } from '@/data/mockStudentData';
import { format } from 'date-fns';

export default function StudentAssignments() {
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const completedAssignments = mockAssignments.filter(a => a.status === 'graded' || a.status === 'submitted')
    .sort((a, b) => {
      // Sort by completion date (most recent first)
      const dateA = a.submission?.submittedDate || new Date(0);
      const dateB = b.submission?.submittedDate || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

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

          {/* Right Panel - Completed Assignments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Completed Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedAssignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No completed assignments yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Complete pending assignments to see them here</p>
                </div>
              ) : (
                completedAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="p-3 border border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800 rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <h4 className="font-semibold text-sm">{assignment.title}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0 border-green-600 text-green-600">
                        {assignment.subject}
                      </Badge>
                    </div>
                    {assignment.submission && (
                      <div className="flex items-center justify-between text-xs ml-7">
                        <span className="text-muted-foreground">
                          Completed: {format(assignment.submission.submittedDate, 'MMM d, yyyy')}
                        </span>
                        {assignment.submission.marks !== undefined && (
                          <Badge className="font-semibold bg-green-600 text-white hover:bg-green-700">
                            {assignment.submission.marks}/{assignment.totalMarks}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
