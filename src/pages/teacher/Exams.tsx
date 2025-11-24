import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ClipboardList, Eye } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CreateExamForm } from '@/components/exams/CreateExamForm';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { mockExams } from '@/data/mockData';
import { getExamTypeLabel, getExamTypeColor } from '@/utils/examHelpers';
import { toast } from 'sonner';

export default function Exams() {
  const [exams, setExams] = useState(mockExams);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);
  const [editingExam, setEditingExam] = useState<any>(null);
  const navigate = useNavigate();

  const handleDeleteExam = (examId: string) => {
    setExamToDelete(examId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (examToDelete) {
      setExams(exams.filter(e => e.id !== examToDelete));
      toast.success('Exam deleted successfully');
    }
    setDeleteDialogOpen(false);
    setExamToDelete(null);
  };

  const handleEditExam = (exam: any) => {
    setEditingExam(exam);
    setEditDialogOpen(true);
  };

  // Mock grading progress (in real app, fetch from backend)
  const getGradingProgress = (examId: string) => {
    const progress = Math.floor(Math.random() * 26); // 0-25
    return { graded: progress, total: 25 };
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Exams & Assessments</h1>
            <p className="text-muted-foreground mt-1">Create and manage exams, enter marks and publish results</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                <Plus className="w-5 h-5 mr-2" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <CreateExamForm onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Exams List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {exams.map((exam) => {
            const progress = getGradingProgress(exam.id);
            const progressPercentage = (progress.graded / progress.total) * 100;

            return (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{exam.name}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getExamTypeColor(exam.type)}>
                          {getExamTypeLabel(exam.type)}
                        </Badge>
                        <Badge variant="outline">{exam.subject}</Badge>
                        {exam.published && (
                          <Badge className="bg-emerald-100 text-emerald-700">Published</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Exam Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-medium">{format(exam.date, 'PPP')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium">{exam.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Marks</p>
                      <p className="font-medium">{exam.totalMarks}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Batches</p>
                      <p className="font-medium">{exam.batches.length}</p>
                    </div>
                  </div>

                  {/* Grading Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Marks Entry Progress</span>
                      <span className="font-medium">
                        {progress.graded}/{progress.total} students graded
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button
                      onClick={() => navigate(`/teacher/exams/${exam.id}/marks`)}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Enter Marks
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/teacher/exams/${exam.id}/results`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditExam(exam)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteExam(exam.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {exams.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No exams created yet</h3>
              <p className="text-muted-foreground mb-6">Create your first exam to start managing assessments</p>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-5 h-5 mr-2" />
                Create First Exam
              </Button>
            </div>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <CreateExamForm onSuccess={() => setEditDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the exam and all associated marks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
