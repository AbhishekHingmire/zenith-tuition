import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Calendar, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Download,
  TrendingUp
} from 'lucide-react';
import { mockAssignments } from '@/data/mockStudentData';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function StudentAssignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<typeof mockAssignments[0] | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const submittedAssignments = mockAssignments.filter(a => a.status === 'submitted');
  const gradedAssignments = mockAssignments.filter(a => a.status === 'graded');

  const handleSubmit = () => {
    if (!selectedAssignment) return;

    if (answerText.trim().length < 50) {
      toast.error('Please provide a detailed answer (minimum 50 characters)');
      return;
    }

    toast.success('Assignment submitted successfully!', {
      description: 'Your teacher will review it soon.'
    });
    
    setIsSubmitDialogOpen(false);
    setAnswerText('');
    setSelectedAssignment(null);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const diff = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'text-destructive';
    if (daysLeft <= 1) return 'text-destructive';
    if (daysLeft <= 3) return 'text-accent';
    return 'text-muted-foreground';
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-secondary/20 text-secondary border-secondary/20';
      case 'medium': return 'bg-accent/20 text-accent border-accent/20';
      case 'hard': return 'bg-destructive/20 text-destructive border-destructive/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Assignments</h1>
          <p className="text-muted-foreground mt-1">View and submit your assignments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-2xl sm:text-3xl font-bold text-destructive">{pendingAssignments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm text-muted-foreground mb-1">Submitted</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent">{submittedAssignments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm text-muted-foreground mb-1">Graded</p>
              <p className="text-2xl sm:text-3xl font-bold text-secondary">{gradedAssignments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm text-muted-foreground mb-1">Avg Score</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">88%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pending
              {pendingAssignments.length > 0 && (
                <Badge variant="destructive" className="ml-2">{pendingAssignments.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>

          {/* PENDING TAB */}
          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending assignments</p>
                </CardContent>
              </Card>
            ) : (
              pendingAssignments.map((assignment) => {
                const daysLeft = getDaysUntilDue(assignment.dueDate);
                const isOverdue = daysLeft < 0;
                const isUrgent = daysLeft <= 2 && daysLeft >= 0;

                return (
                  <Card 
                    key={assignment.id}
                    className={`border-2 ${isOverdue || isUrgent ? 'border-destructive' : 'border-border'}`}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-foreground mb-1">
                                  {assignment.title}
                                </h3>
                                <Badge variant="outline">{assignment.subject}</Badge>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={isOverdue || isUrgent ? 'destructive' : 'secondary'}
                            className={`${isOverdue || isUrgent ? 'animate-pulse' : ''} whitespace-nowrap`}
                          >
                            {isOverdue 
                              ? `Overdue by ${Math.abs(daysLeft)} days!` 
                              : `Due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
                            }
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {assignment.description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground truncate">
                              {format(assignment.dueDate, 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">
                              ~{assignment.estimatedTime || 60} mins
                            </span>
                          </div>
                          <div>
                            <Badge variant="outline" className={`capitalize ${getDifficultyColor(assignment.difficulty)}`}>
                              {assignment.difficulty || 'medium'}
                            </Badge>
                          </div>
                          <div className="font-semibold text-foreground">
                            {assignment.totalMarks} marks
                          </div>
                        </div>

                        {assignment.attachments && assignment.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {assignment.attachments.map((file, idx) => (
                              <Button key={idx} variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                {file.name}
                              </Button>
                            ))}
                          </div>
                        )}

                        <Dialog open={isSubmitDialogOpen && selectedAssignment?.id === assignment.id} onOpenChange={setIsSubmitDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full sm:w-auto touch-manipulation min-h-[44px]"
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              Submit Assignment
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{assignment.title}</DialogTitle>
                              <DialogDescription>
                                Submit your work before {format(assignment.dueDate, 'MMM d, yyyy h:mm a')}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 py-4">
                              <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
                                <p><strong>Subject:</strong> {assignment.subject}</p>
                                <p><strong>Total Marks:</strong> {assignment.totalMarks}</p>
                                <p><strong>Difficulty:</strong> <span className="capitalize">{assignment.difficulty}</span></p>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-semibold">Instructions</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {assignment.description}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="answer">Your Answer *</Label>
                                <Textarea
                                  id="answer"
                                  placeholder="Type your answer here..."
                                  value={answerText}
                                  onChange={(e) => setAnswerText(e.target.value)}
                                  rows={8}
                                  className="resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                  {answerText.length} characters (minimum 50 required)
                                </p>
                              </div>

                              <div className="space-y-3">
                                <Label>Upload Files (Optional)</Label>
                                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Drag & drop or click to upload
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="completed" />
                                  <Label htmlFor="completed" className="text-sm cursor-pointer">
                                    I have completed all steps
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="reviewed" />
                                  <Label htmlFor="reviewed" className="text-sm cursor-pointer">
                                    I have reviewed my work
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="own-work" />
                                  <Label htmlFor="own-work" className="text-sm cursor-pointer">
                                    I confirm this is my own work
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleSubmit}>
                                Submit Assignment
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* SUBMITTED TAB */}
          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{assignment.subject}</p>
                      {assignment.submission && (
                        <div className="space-y-2 text-sm">
                          <p className="text-muted-foreground">
                            Submitted on: {format(assignment.submission.submittedDate, 'MMM d, yyyy h:mm a')}
                          </p>
                          <Badge variant="secondary">Under Review</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* GRADED TAB */}
          <TabsContent value="graded" className="space-y-4">
            {gradedAssignments.map((assignment) => {
              const percentage = assignment.submission?.marks 
                ? (assignment.submission.marks / assignment.totalMarks) * 100 
                : 0;

              return (
                <Card key={assignment.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground mb-1">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                        </div>
                        <Badge className="bg-secondary whitespace-nowrap">
                          {assignment.submission?.grade}
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Score</span>
                            <span className="font-semibold">
                              {assignment.submission?.marks}/{assignment.totalMarks} ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                          <Progress value={percentage} className="h-3" />
                        </div>
                      </div>

                      {assignment.submission?.feedback && (
                        <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                          <p className="text-sm font-medium mb-1">Teacher's Feedback:</p>
                          <p className="text-sm text-muted-foreground">{assignment.submission.feedback}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
