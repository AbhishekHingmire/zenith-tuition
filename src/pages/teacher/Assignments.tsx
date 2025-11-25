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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BookOpen, 
  Plus, 
  Calendar as CalendarIcon, 
  Upload, 
  FileText, 
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockSubjects, mockBatches } from '@/data/mockData';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';

interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  batches: string[];
  dueDate: Date;
  totalMarks: number;
  rubric: RubricCriteria[];
  attachments: { name: string; size: number; type: string }[];
  allowLateSubmission: boolean;
  lateSubmissionPenalty: number;
  status: 'active' | 'draft' | 'closed';
  createdAt: Date;
  submissions: {
    total: number;
    submitted: number;
    graded: number;
  };
}

interface Submission {
  id: string;
  assignmentId: string;
  studentName: string;
  studentId: string;
  submittedAt: Date;
  files: { name: string; size: number }[];
  status: 'pending' | 'graded' | 'late';
  marks?: number;
  feedback?: string;
  rubricScores?: { criteriaId: string; score: number }[];
}

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'a1',
      title: 'Quadratic Equations - Problem Set',
      description: 'Solve the given set of quadratic equations and show all working.',
      subject: 'MATH',
      batches: ['b1', 'b2'],
      dueDate: new Date(2025, 5, 20, 23, 59),
      totalMarks: 50,
      rubric: [
        { id: 'r1', name: 'Correct Solutions', description: 'Accuracy of answers', maxPoints: 25 },
        { id: 'r2', name: 'Working Shown', description: 'Clear step-by-step working', maxPoints: 15 },
        { id: 'r3', name: 'Presentation', description: 'Neatness and organization', maxPoints: 10 },
      ],
      attachments: [{ name: 'problem-set.pdf', size: 245000, type: 'application/pdf' }],
      allowLateSubmission: true,
      lateSubmissionPenalty: 10,
      status: 'active',
      createdAt: new Date(),
      submissions: { total: 50, submitted: 32, graded: 15 },
    },
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 's1',
      assignmentId: 'a1',
      studentName: 'Rahul Kumar',
      studentId: 'st1',
      submittedAt: new Date(2025, 5, 19, 14, 30),
      files: [{ name: 'rahul-solutions.pdf', size: 156000 }],
      status: 'pending',
    },
    {
      id: 's2',
      assignmentId: 'a1',
      studentName: 'Priya Sharma',
      studentId: 'st2',
      submittedAt: new Date(2025, 5, 18, 18, 45),
      files: [{ name: 'priya-answers.pdf', size: 198000 }],
      status: 'graded',
      marks: 45,
      feedback: 'Excellent work! Clear explanations.',
      rubricScores: [
        { criteriaId: 'r1', score: 23 },
        { criteriaId: 'r2', score: 14 },
        { criteriaId: 'r3', score: 8 },
      ],
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [submissionsDialogOpen, setSubmissionsDialogOpen] = useState(false);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [viewingAssignment, setViewingAssignment] = useState<Assignment | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [gradingSubmission, setGradingSubmission] = useState<Submission | null>(null);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    batches: [] as string[],
    dueDate: undefined as Date | undefined,
    dueTime: '23:59',
    totalMarks: '',
    allowLateSubmission: true,
    lateSubmissionPenalty: '10',
    rubric: [] as RubricCriteria[],
    attachments: [] as File[],
  });

  const [rubricForm, setRubricForm] = useState({
    name: '',
    description: '',
    maxPoints: '',
  });

  const [gradingForm, setGradingForm] = useState({
    marks: '',
    feedback: '',
    rubricScores: {} as Record<string, string>,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleBatch = (batchId: string) => {
    setFormData(prev => ({
      ...prev,
      batches: prev.batches.includes(batchId)
        ? prev.batches.filter(b => b !== batchId)
        : [...prev.batches, batchId]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= 20 * 1024 * 1024); // 20MB limit
    
    if (validFiles.length < files.length) {
      toast.error('Some files exceed 20MB limit and were not added');
    }
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const addRubricCriteria = () => {
    if (!rubricForm.name.trim() || !rubricForm.maxPoints) {
      toast.error('Please fill in all rubric fields');
      return;
    }

    const newCriteria: RubricCriteria = {
      id: `r${formData.rubric.length + 1}`,
      name: rubricForm.name.trim(),
      description: rubricForm.description.trim(),
      maxPoints: Number(rubricForm.maxPoints),
    };

    setFormData(prev => ({
      ...prev,
      rubric: [...prev.rubric, newCriteria]
    }));

    setRubricForm({ name: '', description: '', maxPoints: '' });
    toast.success('Rubric criteria added');
  };

  const removeRubricCriteria = (id: string) => {
    setFormData(prev => ({
      ...prev,
      rubric: prev.rubric.filter(r => r.id !== id)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Assignment title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }

    if (formData.batches.length === 0) {
      newErrors.batches = 'At least one batch is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else if (formData.dueDate < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    if (!formData.totalMarks || Number(formData.totalMarks) <= 0) {
      newErrors.totalMarks = 'Total marks must be greater than 0';
    } else if (Number(formData.totalMarks) > 500) {
      newErrors.totalMarks = 'Total marks cannot exceed 500';
    }

    const rubricTotal = formData.rubric.reduce((sum, r) => sum + r.maxPoints, 0);
    if (formData.rubric.length > 0 && rubricTotal !== Number(formData.totalMarks)) {
      newErrors.rubric = `Rubric total (${rubricTotal}) must equal total marks (${formData.totalMarks})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAssignment = () => {
    setEditingAssignment(null);
    setFormData({
      title: '',
      description: '',
      subject: '',
      batches: [],
      dueDate: undefined,
      dueTime: '23:59',
      totalMarks: '',
      allowLateSubmission: true,
      lateSubmissionPenalty: '10',
      rubric: [],
      attachments: [],
    });
    setErrors({});
    setDialogOpen(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      subject: assignment.subject,
      batches: assignment.batches,
      dueDate: assignment.dueDate,
      dueTime: format(assignment.dueDate, 'HH:mm'),
      totalMarks: String(assignment.totalMarks),
      allowLateSubmission: assignment.allowLateSubmission,
      lateSubmissionPenalty: String(assignment.lateSubmissionPenalty),
      rubric: assignment.rubric,
      attachments: [],
    });
    setErrors({});
    setDialogOpen(true);
  };

  const handleSaveAssignment = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    const [hours, minutes] = formData.dueTime.split(':').map(Number);
    const dueDateTime = new Date(formData.dueDate!);
    dueDateTime.setHours(hours, minutes, 0, 0);

    const assignmentData: Assignment = {
      id: editingAssignment?.id || `a${assignments.length + 1}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      subject: formData.subject,
      batches: formData.batches,
      dueDate: dueDateTime,
      totalMarks: Number(formData.totalMarks),
      rubric: formData.rubric,
      attachments: formData.attachments.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type,
      })),
      allowLateSubmission: formData.allowLateSubmission,
      lateSubmissionPenalty: Number(formData.lateSubmissionPenalty),
      status: 'active',
      createdAt: editingAssignment?.createdAt || new Date(),
      submissions: editingAssignment?.submissions || { total: 0, submitted: 0, graded: 0 },
    };

    if (editingAssignment) {
      setAssignments(assignments.map(a => a.id === editingAssignment.id ? assignmentData : a));
      toast.success('Assignment updated successfully');
    } else {
      setAssignments([...assignments, assignmentData]);
      toast.success('Assignment created successfully');
    }

    setDialogOpen(false);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      setAssignments(assignments.filter(a => a.id !== assignmentToDelete));
      toast.success('Assignment deleted successfully');
    }
    setDeleteDialogOpen(false);
    setAssignmentToDelete(null);
  };

  const handleViewAssignment = (assignment: Assignment) => {
    setViewingAssignment(assignment);
    setViewDialogOpen(true);
  };

  const handleViewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionsDialogOpen(true);
  };

  const handleGradeSubmission = (submission: Submission) => {
    setGradingSubmission(submission);
    const assignment = assignments.find(a => a.id === submission.assignmentId);
    
    if (assignment) {
      const initialScores: Record<string, string> = {};
      assignment.rubric.forEach(criteria => {
        const existingScore = submission.rubricScores?.find(s => s.criteriaId === criteria.id);
        initialScores[criteria.id] = existingScore ? String(existingScore.score) : '';
      });

      setGradingForm({
        marks: submission.marks ? String(submission.marks) : '',
        feedback: submission.feedback || '',
        rubricScores: initialScores,
      });
    }
    
    setGradeDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (!gradingSubmission) return;

    const assignment = assignments.find(a => a.id === gradingSubmission.assignmentId);
    if (!assignment) return;

    let finalMarks = 0;
    const rubricScores: { criteriaId: string; score: number }[] = [];

    if (assignment.rubric.length > 0) {
      // Calculate from rubric
      assignment.rubric.forEach(criteria => {
        const score = Number(gradingForm.rubricScores[criteria.id]) || 0;
        rubricScores.push({ criteriaId: criteria.id, score });
        finalMarks += score;
      });
    } else {
      // Use direct marks
      finalMarks = Number(gradingForm.marks);
    }

    if (finalMarks > assignment.totalMarks) {
      toast.error(`Marks cannot exceed ${assignment.totalMarks}`);
      return;
    }

    setSubmissions(submissions.map(s => 
      s.id === gradingSubmission.id 
        ? {
            ...s,
            status: 'graded' as const,
            marks: finalMarks,
            feedback: gradingForm.feedback.trim(),
            rubricScores,
          }
        : s
    ));

    toast.success('Submission graded successfully');
    setGradeDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-secondary text-secondary-foreground">Active</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return null;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Assignments</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Create and manage homework assignments</p>
          </div>
          <Button 
            onClick={handleAddAssignment}
            className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Assignment
          </Button>
        </div>

        {/* Assignments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {assignments.map((assignment) => {
            const subject = mockSubjects.find(s => s.code === assignment.subject);
            const submissionPercentage = (assignment.submissions.submitted / assignment.submissions.total) * 100 || 0;

            return (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">{assignment.title}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <Badge variant="outline" className="text-xs">
                          {subject?.name || assignment.subject}
                        </Badge>
                        {getStatusBadge(assignment.status)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {assignment.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Due:</span>
                      <span className="font-medium">{format(assignment.dueDate, 'PPP, p')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Total Marks:</span>
                      <span className="font-medium">{assignment.totalMarks}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Submissions</span>
                      <span className="font-medium">
                        {assignment.submissions.submitted}/{assignment.submissions.total}
                      </span>
                    </div>
                    <Progress value={submissionPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Graded: {assignment.submissions.graded}</span>
                      <span>Pending: {assignment.submissions.submitted - assignment.submissions.graded}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewSubmissions(assignment)}
                    >
                      View Submissions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewAssignment(assignment)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditAssignment(assignment)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {assignments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Assignments Created</h3>
              <p className="text-muted-foreground text-sm mb-4">Create your first assignment to get started</p>
              <Button onClick={handleAddAssignment}>
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Assignment Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="rubric">Grading Rubric</TabsTrigger>
                <TabsTrigger value="files">Attachments</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Quadratic Equations - Problem Set"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the assignment objectives and requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/1000 characters
                  </p>
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                      <SelectTrigger className={errors.subject ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSubjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.code}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks *</Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.totalMarks}
                      onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                      className={errors.totalMarks ? 'border-destructive' : ''}
                    />
                    {errors.totalMarks && <p className="text-xs text-destructive">{errors.totalMarks}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Assign to Batches *</Label>
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
                  <div className="space-y-2">
                    <Label>Due Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.dueDate && "text-muted-foreground",
                            errors.dueDate && "border-destructive"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dueDate ? format(formData.dueDate, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.dueDate}
                          onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dueDate && <p className="text-xs text-destructive">{errors.dueDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueTime">Due Time *</Label>
                    <Input
                      id="dueTime"
                      type="time"
                      value={formData.dueTime}
                      onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowLate"
                      checked={formData.allowLateSubmission}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, allowLateSubmission: checked as boolean })
                      }
                    />
                    <Label htmlFor="allowLate" className="cursor-pointer">
                      Allow late submissions
                    </Label>
                  </div>

                  {formData.allowLateSubmission && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="penalty">Late Submission Penalty (%)</Label>
                      <Input
                        id="penalty"
                        type="number"
                        placeholder="e.g., 10"
                        value={formData.lateSubmissionPenalty}
                        onChange={(e) => setFormData({ ...formData, lateSubmissionPenalty: e.target.value })}
                        className="w-32"
                      />
                      <p className="text-xs text-muted-foreground">
                        Penalty applied per day late
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Rubric Tab */}
              <TabsContent value="rubric" className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-3">Add Grading Criteria</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="criteriaName">Criteria Name</Label>
                        <Input
                          id="criteriaName"
                          placeholder="e.g., Correct Solutions"
                          value={rubricForm.name}
                          onChange={(e) => setRubricForm({ ...rubricForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="criteriaDesc">Description</Label>
                        <Input
                          id="criteriaDesc"
                          placeholder="e.g., Accuracy of answers"
                          value={rubricForm.description}
                          onChange={(e) => setRubricForm({ ...rubricForm, description: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="criteriaPoints">Max Points</Label>
                        <Input
                          id="criteriaPoints"
                          type="number"
                          placeholder="e.g., 25"
                          value={rubricForm.maxPoints}
                          onChange={(e) => setRubricForm({ ...rubricForm, maxPoints: e.target.value })}
                          className="w-32"
                        />
                      </div>
                      <Button type="button" onClick={addRubricCriteria} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Criteria
                      </Button>
                    </div>
                  </div>

                  {formData.rubric.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Grading Rubric</Label>
                        <span className="text-sm text-muted-foreground">
                          Total: {formData.rubric.reduce((sum, r) => sum + r.maxPoints, 0)} points
                        </span>
                      </div>
                      <div className="border rounded-md divide-y">
                        {formData.rubric.map((criteria) => (
                          <div key={criteria.id} className="p-3 flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm">{criteria.name}</h5>
                              <p className="text-xs text-muted-foreground">{criteria.description}</p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {criteria.maxPoints} points
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeRubricCriteria(criteria.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.rubric && <p className="text-xs text-destructive">{errors.rubric}</p>}

                  {formData.rubric.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <p>No grading criteria added yet.</p>
                      <p className="mt-1">Add criteria above or leave empty to grade manually.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Files Tab */}
              <TabsContent value="files" className="space-y-4">
                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                    />
                    <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload files</p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (Max 20MB per file)
                    </p>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Attached Files ({formData.attachments.length})</Label>
                      <div className="border rounded-md divide-y">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="p-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeAttachment(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveAssignment} className="bg-primary hover:bg-primary/90">
                {editingAssignment ? 'Update' : 'Create'} Assignment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Assignment Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Assignment Details</DialogTitle>
            </DialogHeader>
            {viewingAssignment && (
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{viewingAssignment.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {mockSubjects.find(s => s.code === viewingAssignment.subject)?.name}
                    </Badge>
                    {getStatusBadge(viewingAssignment.status)}
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{viewingAssignment.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{format(viewingAssignment.dueDate, 'PPP, p')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Marks</p>
                    <p className="font-medium">{viewingAssignment.totalMarks}</p>
                  </div>
                </div>

                {viewingAssignment.rubric.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Grading Rubric</p>
                    <div className="space-y-2">
                      {viewingAssignment.rubric.map((criteria) => (
                        <div key={criteria.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{criteria.name}</h5>
                              <p className="text-xs text-muted-foreground mt-0.5">{criteria.description}</p>
                            </div>
                            <Badge variant="outline">{criteria.maxPoints} pts</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {viewingAssignment.attachments.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Attachments</p>
                    <div className="space-y-2">
                      {viewingAssignment.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 border rounded">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Submissions Management Dialog */}
        <Dialog open={submissionsDialogOpen} onOpenChange={setSubmissionsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Submissions - {selectedAssignment?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedAssignment && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{selectedAssignment.submissions.total}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="text-2xl font-bold text-secondary">{selectedAssignment.submissions.submitted}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Graded</p>
                      <p className="text-2xl font-bold text-primary">{selectedAssignment.submissions.graded}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {submissions
                    .filter(s => s.assignmentId === selectedAssignment.id)
                    .map((submission) => (
                      <Card key={submission.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{submission.studentName}</h4>
                                {submission.status === 'graded' ? (
                                  <Badge className="bg-secondary text-secondary-foreground">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Graded
                                  </Badge>
                                ) : submission.status === 'late' ? (
                                  <Badge variant="destructive">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Late
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                Submitted: {format(submission.submittedAt, 'PPP, p')}
                              </p>
                              {submission.files.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {submission.files.map((file, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      <FileText className="w-3 h-3 mr-1" />
                                      {file.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {submission.marks !== undefined && (
                                <div className="mt-2">
                                  <Badge className="bg-primary text-primary-foreground">
                                    {submission.marks}/{selectedAssignment.totalMarks} marks
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleGradeSubmission(submission)}
                            >
                              {submission.status === 'graded' ? 'Edit Grade' : 'Grade'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {submissions.filter(s => s.assignmentId === selectedAssignment.id).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>No submissions yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Grade Submission Dialog */}
        <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Grade Submission</DialogTitle>
            </DialogHeader>
            {gradingSubmission && (
              <div className="space-y-4 py-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-1">{gradingSubmission.studentName}</h4>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {format(gradingSubmission.submittedAt, 'PPP, p')}
                  </p>
                  {gradingSubmission.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {gradingSubmission.files.map((file, idx) => (
                        <Button key={idx} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          {file.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {(() => {
                  const assignment = assignments.find(a => a.id === gradingSubmission.assignmentId);
                  if (!assignment) return null;

                  if (assignment.rubric.length > 0) {
                    return (
                      <div className="space-y-3">
                        <Label>Grade Using Rubric</Label>
                        {assignment.rubric.map((criteria) => (
                          <div key={criteria.id} className="space-y-2 p-3 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-sm">{criteria.name}</h5>
                                <p className="text-xs text-muted-foreground">{criteria.description}</p>
                              </div>
                              <Badge variant="outline">Max: {criteria.maxPoints}</Badge>
                            </div>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              max={criteria.maxPoints}
                              value={gradingForm.rubricScores[criteria.id] || ''}
                              onChange={(e) => setGradingForm({
                                ...gradingForm,
                                rubricScores: {
                                  ...gradingForm.rubricScores,
                                  [criteria.id]: e.target.value
                                }
                              })}
                            />
                          </div>
                        ))}
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <p className="text-sm font-medium">
                            Total: {Object.values(gradingForm.rubricScores).reduce((sum, val) => sum + (Number(val) || 0), 0)}/{assignment.totalMarks}
                          </p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="space-y-2">
                        <Label htmlFor="marks">Marks *</Label>
                        <Input
                          id="marks"
                          type="number"
                          placeholder="0"
                          min="0"
                          max={assignment.totalMarks}
                          value={gradingForm.marks}
                          onChange={(e) => setGradingForm({ ...gradingForm, marks: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Max: {assignment.totalMarks}</p>
                      </div>
                    );
                  }
                })()}

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Add feedback for the student..."
                    value={gradingForm.feedback}
                    onChange={(e) => setGradingForm({ ...gradingForm, feedback: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setGradeDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveGrade} className="bg-primary hover:bg-primary/90">
                Save Grade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the assignment and all submissions.
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
