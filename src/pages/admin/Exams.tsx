import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Plus, Calendar as CalendarIcon, Clock, Award, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockSubjects, mockBatches } from '@/data/mockData';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface Exam {
  id: string;
  name: string;
  date: Date;
  duration: number;
  subjects: string[];
  batches: string[];
  totalMarks: number;
  passingMarks: number;
  gradingCriteria: {
    grade: string;
    minPercentage: number;
    maxPercentage: number;
  }[];
  instructions: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: Date;
}

const defaultGradingCriteria = [
  { grade: 'A+', minPercentage: 90, maxPercentage: 100 },
  { grade: 'A', minPercentage: 80, maxPercentage: 89 },
  { grade: 'B+', minPercentage: 70, maxPercentage: 79 },
  { grade: 'B', minPercentage: 60, maxPercentage: 69 },
  { grade: 'C', minPercentage: 50, maxPercentage: 59 },
  { grade: 'D', minPercentage: 40, maxPercentage: 49 },
  { grade: 'F', minPercentage: 0, maxPercentage: 39 },
];

export default function AdminExams() {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 'e1',
      name: 'Mathematics Mid-term Exam',
      date: new Date(2025, 5, 15),
      duration: 120,
      subjects: ['MATH'],
      batches: ['b1', 'b2'],
      totalMarks: 100,
      passingMarks: 40,
      gradingCriteria: defaultGradingCriteria,
      instructions: 'Bring calculator. No mobile phones allowed.',
      status: 'upcoming',
      createdAt: new Date(),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [viewingExam, setViewingExam] = useState<Exam | null>(null);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    date: undefined as Date | undefined,
    duration: '',
    subjects: [] as string[],
    batches: [] as string[],
    totalMarks: '',
    passingMarks: '',
    instructions: '',
    gradingCriteria: defaultGradingCriteria,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSubject = (subjectCode: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectCode)
        ? prev.subjects.filter(s => s !== subjectCode)
        : [...prev.subjects, subjectCode]
    }));
  };

  const toggleBatch = (batchId: string) => {
    setFormData(prev => ({
      ...prev,
      batches: prev.batches.includes(batchId)
        ? prev.batches.filter(b => b !== batchId)
        : [...prev.batches, batchId]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Exam name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Exam name must be less than 100 characters';
    }

    if (!formData.date) {
      newErrors.date = 'Exam date is required';
    } else if (formData.date < new Date()) {
      newErrors.date = 'Exam date cannot be in the past';
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    } else if (Number(formData.duration) > 480) {
      newErrors.duration = 'Duration cannot exceed 480 minutes (8 hours)';
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = 'At least one subject is required';
    }

    if (formData.batches.length === 0) {
      newErrors.batches = 'At least one batch is required';
    }

    if (!formData.totalMarks || Number(formData.totalMarks) <= 0) {
      newErrors.totalMarks = 'Total marks must be greater than 0';
    } else if (Number(formData.totalMarks) > 1000) {
      newErrors.totalMarks = 'Total marks cannot exceed 1000';
    }

    if (!formData.passingMarks || Number(formData.passingMarks) <= 0) {
      newErrors.passingMarks = 'Passing marks must be greater than 0';
    } else if (Number(formData.passingMarks) > Number(formData.totalMarks)) {
      newErrors.passingMarks = 'Passing marks cannot exceed total marks';
    }

    if (formData.instructions.length > 500) {
      newErrors.instructions = 'Instructions must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExam = () => {
    setEditingExam(null);
    setFormData({
      name: '',
      date: undefined,
      duration: '',
      subjects: [],
      batches: [],
      totalMarks: '',
      passingMarks: '',
      instructions: '',
      gradingCriteria: defaultGradingCriteria,
    });
    setErrors({});
    setDialogOpen(true);
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      date: exam.date,
      duration: String(exam.duration),
      subjects: exam.subjects,
      batches: exam.batches,
      totalMarks: String(exam.totalMarks),
      passingMarks: String(exam.passingMarks),
      instructions: exam.instructions,
      gradingCriteria: exam.gradingCriteria,
    });
    setErrors({});
    setDialogOpen(true);
  };

  const handleSaveExam = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    const examData: Exam = {
      id: editingExam?.id || `e${exams.length + 1}`,
      name: formData.name.trim(),
      date: formData.date!,
      duration: Number(formData.duration),
      subjects: formData.subjects,
      batches: formData.batches,
      totalMarks: Number(formData.totalMarks),
      passingMarks: Number(formData.passingMarks),
      gradingCriteria: formData.gradingCriteria,
      instructions: formData.instructions.trim(),
      status: 'upcoming',
      createdAt: editingExam?.createdAt || new Date(),
    };

    if (editingExam) {
      setExams(exams.map(e => e.id === editingExam.id ? examData : e));
      toast.success('Exam updated successfully');
    } else {
      setExams([...exams, examData]);
      toast.success('Exam created successfully');
    }

    setDialogOpen(false);
  };

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

  const handleViewExam = (exam: Exam) => {
    setViewingExam(exam);
    setViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-primary text-primary-foreground">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-accent text-accent-foreground">Ongoing</Badge>;
      case 'completed':
        return <Badge className="bg-secondary text-secondary-foreground">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Exams Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Create and manage all exams across batches</p>
          </div>
          <Button 
            onClick={handleAddExam}
            className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Exam
          </Button>
        </div>

        {/* Exams List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{exam.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {exam.subjects.map((subCode, idx) => {
                        const subject = mockSubjects.find(s => s.code === subCode);
                        return (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subject?.name || subCode}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  {getStatusBadge(exam.status)}
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
                  <span className="font-medium">{exam.duration} mins</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Award className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Total Marks:</span>
                  <span className="font-medium">{exam.totalMarks}</span>
                  <span className="text-muted-foreground">| Passing:</span>
                  <span className="font-medium">{exam.passingMarks}</span>
                </div>
                <div className="pt-2 border-t border-border flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewExam(exam)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditExam(exam)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteExam(exam.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {exams.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Exams Created</h3>
              <p className="text-muted-foreground text-sm mb-4">Create your first exam to get started</p>
              <Button onClick={handleAddExam}>
                <Plus className="w-4 h-4 mr-2" />
                Create Exam
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Exam Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExam ? 'Edit Exam' : 'Create New Exam'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Exam Name */}
              <div className="space-y-2">
                <Label htmlFor="examName">Exam Name *</Label>
                <Input
                  id="examName"
                  placeholder="e.g., Mathematics Mid-term Exam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-2">
                  <Label>Exam Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground",
                          errors.date && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData({ ...formData, date })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={errors.duration ? 'border-destructive' : ''}
                  />
                  {errors.duration && <p className="text-xs text-destructive">{errors.duration}</p>}
                </div>
              </div>

              {/* Subjects */}
              <div className="space-y-2">
                <Label>Subjects * (Select multiple)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-md max-h-48 overflow-y-auto">
                  {mockSubjects.map((subject) => (
                    <div key={subject.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exam-${subject.code}`}
                        checked={formData.subjects.includes(subject.code)}
                        onCheckedChange={() => toggleSubject(subject.code)}
                      />
                      <label
                        htmlFor={`exam-${subject.code}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.subjects && <p className="text-xs text-destructive">{errors.subjects}</p>}
              </div>

              {/* Batches */}
              <div className="space-y-2">
                <Label>Batches * (Select multiple)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border rounded-md max-h-48 overflow-y-auto">
                  {mockBatches.map((batch) => (
                    <div key={batch.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`batch-${batch.id}`}
                        checked={formData.batches.includes(batch.id)}
                        onCheckedChange={() => toggleBatch(batch.id)}
                      />
                      <label
                        htmlFor={`batch-${batch.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {batch.name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.batches && <p className="text-xs text-destructive">{errors.batches}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Total Marks */}
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks *</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                    className={errors.totalMarks ? 'border-destructive' : ''}
                  />
                  {errors.totalMarks && <p className="text-xs text-destructive">{errors.totalMarks}</p>}
                </div>

                {/* Passing Marks */}
                <div className="space-y-2">
                  <Label htmlFor="passingMarks">Passing Marks *</Label>
                  <Input
                    id="passingMarks"
                    type="number"
                    placeholder="e.g., 40"
                    value={formData.passingMarks}
                    onChange={(e) => setFormData({ ...formData, passingMarks: e.target.value })}
                    className={errors.passingMarks ? 'border-destructive' : ''}
                  />
                  {errors.passingMarks && <p className="text-xs text-destructive">{errors.passingMarks}</p>}
                </div>
              </div>

              {/* Grading Criteria */}
              <div className="space-y-2">
                <Label>Grading Criteria</Label>
                <div className="border rounded-md p-4 space-y-2 max-h-48 overflow-y-auto">
                  {formData.gradingCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <Badge variant="outline" className="min-w-[40px] justify-center">
                        {criteria.grade}
                      </Badge>
                      <span className="text-muted-foreground">
                        {criteria.minPercentage}% - {criteria.maxPercentage}%
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Default grading criteria applied</p>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Enter exam instructions..."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  rows={3}
                  className={errors.instructions ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.instructions.length}/500 characters
                </p>
                {errors.instructions && <p className="text-xs text-destructive">{errors.instructions}</p>}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveExam} className="bg-primary hover:bg-primary/90">
                {editingExam ? 'Update' : 'Create'} Exam
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Exam Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Exam Details</DialogTitle>
            </DialogHeader>
            {viewingExam && (
              <div className="space-y-4 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{viewingExam.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {viewingExam.subjects.map((subCode, idx) => {
                        const subject = mockSubjects.find(s => s.code === subCode);
                        return (
                          <Badge key={idx} variant="outline">
                            {subject?.name || subCode}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  {getStatusBadge(viewingExam.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{format(viewingExam.date, 'PPP')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{viewingExam.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Marks</p>
                    <p className="font-medium">{viewingExam.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Passing Marks</p>
                    <p className="font-medium">{viewingExam.passingMarks}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Batches</p>
                  <div className="flex gap-2 flex-wrap">
                    {viewingExam.batches.map((batchId) => {
                      const batch = mockBatches.find(b => b.id === batchId);
                      return (
                        <Badge key={batchId} variant="outline">{batch?.name || batchId}</Badge>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Grading Criteria</p>
                  <div className="space-y-2">
                    {viewingExam.gradingCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Badge variant="outline" className="min-w-[50px] justify-center">
                          {criteria.grade}
                        </Badge>
                        <span className="text-sm">
                          {criteria.minPercentage}% - {criteria.maxPercentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {viewingExam.instructions && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Instructions</p>
                    <p className="text-sm whitespace-pre-wrap">{viewingExam.instructions}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the exam.
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
