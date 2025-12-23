import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, ClipboardList, Eye, Calendar as CalendarIcon, Clock, Award, X, Save, TrendingUp, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreateExamForm } from '@/components/exams/CreateExamForm';
import { format } from 'date-fns';
import { mockExams, mockExamResults } from '@/data/mockData';
import { getExamTypeLabel, getExamTypeColor } from '@/utils/examHelpers';
import { calculateGrade, getGradeColor } from '@/utils/gradeCalculator';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function Exams() {
  const [exams, setExams] = useState(mockExams);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);
  const [editingExam, setEditingExam] = useState<any>(null);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [marksDialogOpen, setMarksDialogOpen] = useState(false);
  const [resultsDialogOpen, setResultsDialogOpen] = useState(false);
  const [studentMarks, setStudentMarks] = useState<any[]>([]);
  const { user } = useAuth();

  const role = user?.role || 'teacher';

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

  const handleEnterMarks = (exam: any) => {
    setSelectedExam(exam);
    const results = mockExamResults.filter(r => r.examId === exam.id);
    setStudentMarks(results);
    setMarksDialogOpen(true);
  };

  const handleViewResults = (exam: any) => {
    setSelectedExam(exam);
    const results = mockExamResults.filter(r => r.examId === exam.id);
    setStudentMarks(results);
    setResultsDialogOpen(true);
  };

  const handleMarkChange = (index: number, value: string) => {
    const marks = value === '' ? undefined : parseInt(value);
    if (value === '' || (!isNaN(marks!) && marks! >= 0 && marks! <= (selectedExam?.totalMarks || 100))) {
      const updated = [...studentMarks];
      updated[index] = {
        ...updated[index],
        marksObtained: marks,
        grade: marks !== undefined ? calculateGrade(marks, selectedExam?.totalMarks || 100) : undefined
      };
      setStudentMarks(updated);
    }
  };

  const saveMarks = () => {
    toast.success('Marks saved successfully');
    setMarksDialogOpen(false);
  };

  // Mock grading progress
  const getGradingProgress = (examId: string) => {
    const results = mockExamResults.filter(r => r.examId === examId && r.marksObtained !== undefined);
    const total = mockExamResults.filter(r => r.examId === examId).length;
    return { graded: results.length, total };
  };

  // Permissions based on role
  const canCreate = role === 'admin' || role === 'teacher';
  const canEdit = role === 'admin' || role === 'teacher';
  const canDelete = role === 'admin' || role === 'teacher';
  const canEnterMarks = role === 'admin' || role === 'teacher';

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Exams & Assessments</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {role === 'admin' ? 'Manage all exams across batches' : 'Create and manage exams, enter marks and publish results'}
            </p>
          </div>
          
          {canCreate && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Exam
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Exam</DialogTitle>
                </DialogHeader>
                <CreateExamForm onSuccess={() => setDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Exams List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {exams.map((exam) => {
            const progress = getGradingProgress(exam.id);
            const progressPercentage = (progress.graded / progress.total) * 100;

            return (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">{exam.name}</CardTitle>
                      <div className="flex items-center gap-1 flex-wrap mt-1.5">
                        <Badge className={getExamTypeColor(exam.type) + " text-xs"}>
                          {getExamTypeLabel(exam.type)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{exam.subject}</Badge>
                        {exam.published && (
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">Published</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center gap-2 text-xs">
                    <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{format(exam.date, 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{exam.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Award className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Total Marks:</span>
                    <span className="font-medium">{exam.totalMarks}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <ClipboardList className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Batches:</span>
                    <span className="font-medium">{exam.batches.length} batch(es)</span>
                  </div>

                  {/* Grading Progress */}
                  {canEnterMarks && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Marks Entry Progress</span>
                        <span className="font-medium">
                          {progress.graded}/{progress.total}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  )}

                  {/* Primary Actions - Enter Marks & View Results */}
                  {canEnterMarks && (
                    <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-border">
                      <Button
                        size="sm"
                        onClick={() => handleEnterMarks(exam)}
                        className="bg-primary hover:bg-primary/90 h-8 text-xs"
                      >
                        <ClipboardList className="w-3.5 h-3.5 mr-1" />
                        Enter Marks
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewResults(exam)}
                        className="h-8 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        View Results
                      </Button>
                    </div>
                  )}

                  {/* Secondary Actions - Update, Delete */}
                  <div className="flex gap-1.5 pt-1.5">
                    {canEdit && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 h-7 text-xs"
                        onClick={() => handleEditExam(exam)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Update
                      </Button>
                    )}
                    {canDelete && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 px-2"
                        onClick={() => handleDeleteExam(exam.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
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
              {canCreate && (
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setDialogOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Exam
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Edit Dialog */}
        {canEdit && (
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Exam</DialogTitle>
              </DialogHeader>
              <CreateExamForm 
                exam={editingExam}
                onSuccess={() => {
                  setEditDialogOpen(false);
                  setEditingExam(null);
                }} 
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Marks Entry Dialog */}
        {canEnterMarks && (
          <Dialog open={marksDialogOpen} onOpenChange={setMarksDialogOpen}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Enter Marks - {selectedExam?.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Exam Info */}
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{selectedExam?.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedExam?.date && format(new Date(selectedExam.date), 'PPP')} • {selectedExam?.batches?.join(', ')} • Total Marks: {selectedExam?.totalMarks}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Graded: {studentMarks.filter(s => s.marksObtained !== null && s.marksObtained !== '').length} / {studentMarks.length}
                    </p>
                  </div>
                </div>

                {/* Marks Entry Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Admission No</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="w-32">Marks Obtained</TableHead>
                        <TableHead className="w-24">Grade</TableHead>
                        <TableHead className="w-20">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentMarks.map((student, index) => {
                        const marks = student.marksObtained !== null && student.marksObtained !== '' 
                          ? Number(student.marksObtained) 
                          : null;
                        const grade = marks !== null ? calculateGrade(marks, selectedExam?.totalMarks || 100) : null;
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{student.admissionNo}</TableCell>
                            <TableCell>{student.studentName}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                max={selectedExam?.totalMarks || 100}
                                value={student.marksObtained ?? ''}
                                onChange={(e) => handleMarkChange(index, e.target.value)}
                                placeholder="Enter marks"
                                className="h-8"
                              />
                            </TableCell>
                            <TableCell>
                              {grade && (
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade)}`}>
                                  {grade}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {student.isAbsent && (
                                <span className="text-xs text-destructive">Absent</span>
                              )}
                              {!student.isAbsent && marks !== null && (
                                <span className="text-xs text-green-600">Graded</span>
                              )}
                              {!student.isAbsent && marks === null && (
                                <span className="text-xs text-amber-600">Pending</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setMarksDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveMarks} className="bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Marks
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Results View Dialog */}
        {canEnterMarks && (
          <Dialog open={resultsDialogOpen} onOpenChange={setResultsDialogOpen}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Exam Results - {selectedExam?.name}</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total Students</p>
                            <p className="text-2xl font-bold">{mockExamResults.filter(r => r.examId === selectedExam?.id).length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Average Marks</p>
                            <p className="text-2xl font-bold">
                              {(() => {
                                const results = mockExamResults.filter(r => r.examId === selectedExam?.id);
                                const avg = results.reduce((acc, r) => acc + r.marksObtained, 0) / results.length;
                                return avg.toFixed(1);
                              })()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Highest Marks</p>
                            <p className="text-2xl font-bold">
                              {Math.max(...mockExamResults.filter(r => r.examId === selectedExam?.id).map(r => r.marksObtained))}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Pass %</p>
                            <p className="text-2xl font-bold">
                              {(() => {
                                const results = mockExamResults.filter(r => r.examId === selectedExam?.id);
                                const passMarks = (selectedExam?.totalMarks || 100) * 0.4;
                                const passed = results.filter(r => r.marksObtained >= passMarks).length;
                                return ((passed / results.length) * 100).toFixed(0);
                              })()}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Detailed Results Tab */}
                <TabsContent value="detailed">
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Admission No</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Marks Obtained</TableHead>
                          <TableHead>Total Marks</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockExamResults
                          .filter(r => r.examId === selectedExam?.id)
                          .map((result, index) => {
                            const percentage = ((result.marksObtained / (selectedExam?.totalMarks || 100)) * 100).toFixed(1);
                            const grade = calculateGrade(result.marksObtained, selectedExam?.totalMarks || 100);
                            
                            return (
                              <TableRow key={result.studentId}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{result.admissionNo}</TableCell>
                                <TableCell>{result.studentName}</TableCell>
                                <TableCell className="font-semibold">{result.marksObtained}</TableCell>
                                <TableCell>{selectedExam?.totalMarks || 100}</TableCell>
                                <TableCell>{percentage}%</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade)}`}>
                                    {grade}
                                  </span>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        {canDelete && (
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
        )}
      </div>
    </MainLayout>
  );
}
