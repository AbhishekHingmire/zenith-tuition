import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, User } from 'lucide-react';
import { mockAssignments } from '@/data/mockStudentData';
import { format } from 'date-fns';

export default function StudentAssignments() {
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const completedAssignments = mockAssignments.filter(a => a.status === 'graded' || a.status === 'submitted');

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Assignments</h1>
          <p className="text-sm text-muted-foreground mt-1">View your assignments</p>
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
              <p className="text-2xl font-bold text-secondary">{completedAssignments.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Assignments */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-base mb-3">Pending Assignments</h3>
            <div className="space-y-3">
              {pendingAssignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No pending assignments</p>
                </div>
              ) : (
                pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm">{assignment.title}</h4>
                      <Badge variant="outline" className="text-xs shrink-0">{assignment.subject}</Badge>
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
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Completed Assignments */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-base mb-3">Completed Assignments</h3>
            <div className="space-y-3">
              {completedAssignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No completed assignments</p>
                </div>
              ) : (
                completedAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm">{assignment.title}</h4>
                      <Badge variant="outline" className="text-xs shrink-0">{assignment.subject}</Badge>
                    </div>
                    {assignment.submission && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Completed: {format(assignment.submission.submittedDate, 'MMM d, yyyy')}
                        </span>
                        {assignment.submission.marks !== undefined && (
                          <span className="font-semibold">
                            {assignment.submission.marks}/{assignment.totalMarks}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
