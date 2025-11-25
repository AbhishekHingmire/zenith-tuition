import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, FileText, User, CheckCircle2, Award, Eye, Download, File } from 'lucide-react';
import { mockAssignments } from '@/data/mockStudentData';
import { format } from 'date-fns';
import { useState } from 'react';

export default function StudentAssignments() {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const completedAssignments = mockAssignments.filter(a => a.status === 'graded' || a.status === 'submitted')
    .sort((a, b) => {
      // Sort by completion date (most recent first)
      const dateA = a.submission?.submittedDate || new Date(0);
      const dateB = b.submission?.submittedDate || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

  const handleViewDetails = (assignment: any) => {
    setSelectedAssignment(assignment);
    setViewDialogOpen(true);
  };

  const handleDownload = (fileName: string) => {
    // Simulate download
    console.log('Downloading:', fileName);
  };

  return (
    <MainLayout>
      <div className="space-y-4 pb-20 md:pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Assignments</h1>
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

        {/* Tab-Based Layout */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="gap-2">
              Pending
              <Badge variant="destructive" className="text-xs">
                {pendingAssignments.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              Completed
              <Badge className="text-xs bg-green-600 hover:bg-green-700">
                {completedAssignments.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1 - Pending Assignments */}
          <TabsContent value="pending" className="mt-4">
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
                        className={`p-2.5 border rounded-lg space-y-1.5 transition-colors ${
                          isUrgent ? 'border-destructive/50 bg-destructive/5' : 'hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-xs line-clamp-1">{assignment.title}</h4>
                          <Badge 
                            variant={isUrgent ? "destructive" : "outline"} 
                            className="text-[10px] px-1.5 py-0 shrink-0"
                          >
                            {assignment.subject}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(assignment.dueDate, 'MMM d, h:mm a')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {assignment.totalMarks} marks
                          </div>
                        </div>
                        {isUrgent && (
                          <div className="text-[10px] font-medium text-destructive">
                            Due in {daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'}!
                          </div>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full h-7 text-xs mt-1.5"
                          onClick={() => handleViewDetails(assignment)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2 - Completed Assignments */}
          <TabsContent value="completed" className="mt-4">
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
                      className="p-2.5 border border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800 rounded-lg space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5 flex-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <h4 className="font-semibold text-xs line-clamp-1">{assignment.title}</h4>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 border-green-600 text-green-600">
                          {assignment.subject}
                        </Badge>
                      </div>
                      {assignment.submission && (
                        <div className="flex items-center justify-between text-[10px] ml-5">
                          <span className="text-muted-foreground">
                            Completed: {format(assignment.submission.submittedDate, 'MMM d, yyyy')}
                          </span>
                          {assignment.submission.marks !== undefined && (
                            <Badge className="font-semibold bg-green-600 text-white hover:bg-green-700 text-[10px] px-1.5 py-0">
                              {assignment.submission.marks}/{assignment.totalMarks}
                            </Badge>
                          )}
                        </div>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full h-7 text-xs mt-1.5 ml-5"
                        onClick={() => handleViewDetails(assignment)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Assignment Details</DialogTitle>
            </DialogHeader>
            {selectedAssignment && (
              <div className="space-y-4 py-2">
                {/* Header Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedAssignment.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{selectedAssignment.subject}</Badge>
                    <Badge className={selectedAssignment.status === 'pending' ? 'bg-destructive' : 'bg-green-600'}>
                      {selectedAssignment.status === 'pending' ? 'Pending' : 'Completed'}
                    </Badge>
                  </div>
                </div>

                {/* Assignment Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Posted By</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{selectedAssignment.postedBy.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Due Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{format(selectedAssignment.dueDate, 'MMM d, yyyy h:mm a')}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Total Marks</p>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">{selectedAssignment.totalMarks} marks</span>
                    </div>
                  </div>
                  {selectedAssignment.submission && (
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Marks Obtained</p>
                      <Badge className="bg-green-600 text-white">
                        {selectedAssignment.submission.marks}/{selectedAssignment.totalMarks}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm font-semibold mb-2">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAssignment.description || 'Complete the assignment on the given topic. Follow the instructions provided in the attached materials.'}
                  </p>
                </div>

                {/* Attachments */}
                <div>
                  <p className="text-sm font-semibold mb-2">Attached Materials</p>
                  <div className="space-y-2">
                    {/* Mock attachments - in real app, this would come from assignment data */}
                    {[
                      { name: 'Question_Bank.pdf', type: 'PDF', size: '2.4 MB' },
                      { name: 'Reference_Image.jpg', type: 'Image', size: '856 KB' },
                      { name: 'Instructions.docx', type: 'Document', size: '124 KB' },
                    ].map((file, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <File className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDownload(file.name)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submission Info (if completed) */}
                {selectedAssignment.submission && (
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold mb-2">Submission Details</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Submitted On:</span>
                        <span className="font-medium">{format(selectedAssignment.submission.submittedDate, 'MMM d, yyyy h:mm a')}</span>
                      </div>
                      {selectedAssignment.submission.feedback && (
                        <div>
                          <span className="text-muted-foreground">Teacher Feedback:</span>
                          <p className="mt-1 p-2 bg-muted rounded text-sm">{selectedAssignment.submission.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
