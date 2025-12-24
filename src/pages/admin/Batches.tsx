import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { BookOpen, Plus, Users, Calendar, Edit, Trash2, Eye, Clock, User, GraduationCap, IndianRupee, TrendingUp, Award, Target, AlertTriangle, BarChart3, Download, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockBatches, mockTeachers, mockSubjects } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ScheduleBuilder, ScheduleSlot, formatScheduleDisplay } from '@/components/ScheduleBuilder';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

export default function Batches() {
  const [batches, setBatches] = useState(mockBatches);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingBatch, setViewingBatch] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    subjects: [] as string[],
    grade: '',
    teacherIds: [] as string[],
    schedules: [] as ScheduleSlot[],
    capacity: '',
    startDate: '',
    endDate: '',
    feeType: 'yearly' as 'yearly' | 'monthly',
    totalFee: '',
    monthlyFee: '',
  });

  const toggleBatchSubject = (subjectCode: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectCode)
        ? prev.subjects.filter(s => s !== subjectCode)
        : [...prev.subjects, subjectCode]
    }));
  };

  const toggleTeacher = (teacherId: string) => {
    setFormData(prev => ({
      ...prev,
      teacherIds: prev.teacherIds.includes(teacherId)
        ? prev.teacherIds.filter(id => id !== teacherId)
        : [...prev.teacherIds, teacherId]
    }));
  };

  // Pagination logic
  const totalPages = Math.ceil(batches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBatches = batches.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleAddBatch = () => {
    setEditingBatch(null);
    setFormData({
      name: '',
      subjects: [],
      grade: '',
      teacherIds: [],
      schedules: [],
      capacity: '',
      startDate: '',
      endDate: '',
      feeType: 'yearly',
      totalFee: '',
      monthlyFee: '',
    });
    setDialogOpen(true);
  };

  const handleEditBatch = (batch: any) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      subjects: batch.subjects || [],
      grade: batch.grade,
      teacherIds: batch.teacherIds || [],
      schedules: batch.schedules || [],
      capacity: String(batch.capacity),
      startDate: batch.startDate,
      endDate: batch.endDate,
      feeType: batch.feeType || 'yearly',
      totalFee: String(batch.totalFee || ''),
      monthlyFee: String(batch.monthlyFee || ''),
    });
    setDialogOpen(true);
  };

  const handleSaveBatch = () => {
    // Validate teachers have at least one matching subject
    const selectedTeachers = mockTeachers.filter(t => formData.teacherIds.includes(t.id));
    const invalidTeachers = selectedTeachers.filter(teacher => 
      !teacher.subjects.some(subCode => formData.subjects.includes(subCode))
    );
    
    if (invalidTeachers.length > 0) {
      toast.error(`Teacher(s) ${invalidTeachers.map(t => t.name).join(', ')} don't teach any selected subject`);
      return;
    }

    if (formData.schedules.length === 0) {
      toast.error('Please add at least one schedule slot');
      return;
    }

    const hasInvalidSchedule = formData.schedules.some(s => s.days.length === 0);
    if (hasInvalidSchedule) {
      toast.error('Each schedule must have at least one day selected');
      return;
    }

    const teacherNames = selectedTeachers.map(t => t.name).join(', ');
    const scheduleDisplay = formatScheduleDisplay(formData.schedules);
    
    if (editingBatch) {
      setBatches(batches.map(b =>
        b.id === editingBatch.id
          ? { 
              ...b, 
              name: formData.name,
              subjects: formData.subjects,
              grade: formData.grade,
              teacher: teacherNames,
              teacherIds: formData.teacherIds,
              schedules: formData.schedules,
              schedule: scheduleDisplay,
              capacity: Number(formData.capacity),
              startDate: formData.startDate,
              endDate: formData.endDate,
              feeType: formData.feeType,
              totalFee: Number(formData.totalFee) || (formData.feeType === 'yearly' ? Number(formData.monthlyFee) * 12 : Number(formData.monthlyFee)),
              monthlyFee: Number(formData.monthlyFee)
            }
          : b
      ));
      toast.success('Batch updated successfully');
    } else {
      const newBatch = {
        id: `b${batches.length + 1}`,
        name: formData.name,
        subjects: formData.subjects,
        grade: formData.grade,
        teacher: teacherNames,
        teacherIds: formData.teacherIds,
        schedules: formData.schedules,
        schedule: scheduleDisplay,
        enrolledStudents: 0,
        capacity: Number(formData.capacity),
        startDate: formData.startDate || new Date().toISOString().split('T')[0],
        endDate: formData.endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        feeType: formData.feeType,
        totalFee: Number(formData.totalFee) || (formData.feeType === 'yearly' ? Number(formData.monthlyFee) * 12 : Number(formData.monthlyFee)),
        monthlyFee: Number(formData.monthlyFee),
        status: 'ongoing',
      };
      setBatches([...batches, newBatch]);
      toast.success('Batch created successfully');
    }
    setDialogOpen(false);
  };

  const handleDeleteBatch = (batchId: string) => {
    setBatchToDelete(batchId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (batchToDelete) {
      setBatches(batches.filter(b => b.id !== batchToDelete));
      toast.success('Batch deleted successfully');
    }
    setDeleteDialogOpen(false);
    setBatchToDelete(null);
  };

  const handleViewBatch = (batch: any) => {
    // Generate analytics data for the batch
    const batchWithAnalytics = {
      ...batch,
      analytics: {
        // Top Performers (mock data)
        topPerformers: [
          { id: '1', name: 'Rahul Kumar', avgScore: 92, rank: 1, attendance: 96 },
          { id: '2', name: 'Priya Sharma', avgScore: 88, rank: 2, attendance: 94 },
          { id: '3', name: 'Amit Patel', avgScore: 85, rank: 3, attendance: 90 },
        ],
        // Low Attendance Students
        lowAttendance: [
          { id: '4', name: 'Vikram Singh', attendance: 65, absent: 12, late: 5 },
          { id: '5', name: 'Neha Gupta', attendance: 72, absent: 9, late: 3 },
        ],
        // Subject-wise Average
        subjectAverage: [
          { subject: 'Mathematics', average: 78, topScore: 95, lowScore: 45 },
          { subject: 'Physics', average: 75, topScore: 92, lowScore: 50 },
          { subject: 'Chemistry', average: 82, topScore: 98, lowScore: 55 },
        ],
        // Overall Stats
        overallStats: {
          avgAttendance: 85,
          avgScore: 78,
          passRate: 92,
          totalClasses: 120,
        }
      }
    };
    
    setViewingBatch(batchWithAnalytics);
    setViewDialogOpen(true);
  };

  const handleDownloadBatchReport = () => {
    if (!viewingBatch) return;
    
    const reportContent = `BATCH PERFORMANCE REPORT
========================
Batch: ${viewingBatch.name}
Grade: ${viewingBatch.grade}
Teacher: ${viewingBatch.teacher}
Period: ${viewingBatch.startDate} to ${viewingBatch.endDate}
Generated: ${format(new Date(), 'MMMM dd, yyyy')}

OVERALL STATISTICS:
- Total Students: ${viewingBatch.enrolledStudents}/${viewingBatch.capacity}
- Average Attendance: ${viewingBatch.analytics?.overallStats.avgAttendance}%
- Average Score: ${viewingBatch.analytics?.overallStats.avgScore}%
- Pass Rate: ${viewingBatch.analytics?.overallStats.passRate}%

TOP PERFORMERS:
${viewingBatch.analytics?.topPerformers.map((s: any, i: number) => `${i+1}. ${s.name} - Avg: ${s.avgScore}% | Attendance: ${s.attendance}%`).join('\n')}

SUBJECT-WISE PERFORMANCE:
${viewingBatch.analytics?.subjectAverage.map((s: any) => `${s.subject}: Avg ${s.average}% (High: ${s.topScore}, Low: ${s.lowScore})`).join('\n')}

LOW ATTENDANCE STUDENTS:
${viewingBatch.analytics?.lowAttendance.map((s: any) => `${s.name}: ${s.attendance}% (Absent: ${s.absent}, Late: ${s.late})`).join('\n')}
`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${viewingBatch.name.replace(/\s+/g, '_')}_Report_${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Batch report downloaded!');
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Batch Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Create and manage class batches</p>
          </div>
          <Button onClick={handleAddBatch} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create Batch
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {paginatedBatches.map((batch) => (
            <Card key={batch.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 px-3 pt-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm truncate">{batch.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {batch.subjects?.slice(0, 2).map((subCode, idx) => {
                        const subject = mockSubjects.find(s => s.code === subCode);
                        return (
                          <Badge key={idx} variant="outline" className="text-[10px] px-1.5 py-0">
                            {subject?.name || subCode}
                          </Badge>
                        );
                      })}
                      {batch.subjects?.length > 2 && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          +{batch.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge className={batch.status === 'ongoing' ? 'bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0' : 'bg-muted text-muted-foreground text-[10px] px-1.5 py-0'}>
                    {batch.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5 pt-0 px-3 pb-3">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Users className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium truncate">{batch.teacher}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Users className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{batch.enrolledStudents}/{batch.capacity} Students</span>
                </div>
                <div className="pt-1.5 border-t border-border flex gap-1.5">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 h-7 text-[11px]"
                    onClick={() => handleViewBatch(batch)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 px-2"
                    onClick={() => handleEditBatch(batch)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10 h-7 px-2"
                    onClick={() => handleDeleteBatch(batch.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Card>
          <CardContent className="pt-4">
            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={batches.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBatch ? 'Edit Batch' : 'Create New Batch'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="batchName">Batch Name *</Label>
                <Input
                  id="batchName"
                  placeholder="e.g., Grade 10 - Mathematics"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchGrade">Grade *</Label>
                <Input
                  id="batchGrade"
                  placeholder="e.g., 10"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Subjects * (Select multiple)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-md max-h-48 overflow-y-auto">
                  {mockSubjects.map((subject) => (
                    <div key={subject.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`batch-${subject.code}`}
                        checked={formData.subjects.includes(subject.code)}
                        onCheckedChange={() => toggleBatchSubject(subject.code)}
                      />
                      <label
                        htmlFor={`batch-${subject.code}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Teachers * (Select one or more)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border rounded-md max-h-48 overflow-y-auto">
                  {mockTeachers.map((teacher) => {
                    const teacherSubjects = teacher.subjects.map(code => mockSubjects.find(s => s.code === code)?.name).filter(Boolean);
                    return (
                      <div key={teacher.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={`teacher-${teacher.id}`}
                          checked={formData.teacherIds.includes(teacher.id)}
                          onCheckedChange={() => toggleTeacher(teacher.id)}
                        />
                        <label
                          htmlFor={`teacher-${teacher.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          <div>{teacher.name}</div>
                          <div className="text-xs text-muted-foreground">{teacherSubjects.join(', ')}</div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchCapacity">Capacity *</Label>
                <Input
                  id="batchCapacity"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feeType">Fee Type *</Label>
                <Select
                  value={formData.feeType}
                  onValueChange={(value: 'yearly' | 'monthly') => setFormData({ ...formData, feeType: value })}
                >
                  <SelectTrigger id="feeType">
                    <SelectValue placeholder="Select fee type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.feeType === 'yearly' ? (
                <div className="space-y-2">
                  <Label htmlFor="totalFee">Total Yearly Fee (₹) *</Label>
                  <Input
                    id="totalFee"
                    type="number"
                    placeholder="e.g., 60000"
                    value={formData.totalFee}
                    onChange={(e) => {
                      const yearly = Number(e.target.value);
                      setFormData({ 
                        ...formData, 
                        totalFee: e.target.value,
                        monthlyFee: yearly > 0 ? String(Math.round(yearly / 12)) : ''
                      });
                    }}
                  />
                  {formData.totalFee && (
                    <p className="text-xs text-muted-foreground">
                      Monthly equivalent: ₹{Math.round(Number(formData.totalFee) / 12).toLocaleString()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="monthlyFee">Monthly Fee (₹) *</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.monthlyFee}
                    onChange={(e) => {
                      const monthly = Number(e.target.value);
                      setFormData({ 
                        ...formData, 
                        monthlyFee: e.target.value,
                        totalFee: monthly > 0 ? String(monthly * 12) : ''
                      });
                    }}
                  />
                  {formData.monthlyFee && (
                    <p className="text-xs text-muted-foreground">
                      Yearly equivalent: ₹{(Number(formData.monthlyFee) * 12).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-2 sm:col-span-2">
                <Label>Schedule * (Add time slots for different days)</Label>
                <ScheduleBuilder
                  schedules={formData.schedules}
                  onChange={(schedules) => setFormData({ ...formData, schedules })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchStartDate">Start Date</Label>
                <Input
                  id="batchStartDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchEndDate">End Date</Label>
                <Input
                  id="batchEndDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveBatch} className="bg-primary hover:bg-primary/90">
                {editingBatch ? 'Update' : 'Create'} Batch
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <div>
                  <DialogTitle className="text-2xl">{viewingBatch?.name}</DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">Comprehensive Batch Analytics & Report</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={viewingBatch?.status === 'ongoing' ? 'bg-green-500' : 'bg-gray-400'}>
                    {viewingBatch?.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleDownloadBatchReport}>
                    <Download className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </DialogHeader>
            {viewingBatch && (
              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4 mt-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Enrolled</p>
                            <p className="text-lg font-bold">{viewingBatch.enrolledStudents}/{viewingBatch.capacity}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Avg Score</p>
                            <p className="text-lg font-bold">{viewingBatch.analytics?.overallStats.avgScore}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Pass Rate</p>
                            <p className="text-lg font-bold">{viewingBatch.analytics?.overallStats.passRate}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Attendance</p>
                            <p className="text-lg font-bold">{viewingBatch.analytics?.overallStats.avgAttendance}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Batch Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Grade:</span>
                          <span className="font-medium">{viewingBatch.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Teacher:</span>
                          <span className="font-medium">{viewingBatch.teacher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">
                            {format(new Date(viewingBatch.startDate), 'MMM dd')} - {format(new Date(viewingBatch.endDate), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Fee Structure</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <Badge variant="outline">{viewingBatch.feeType === 'yearly' ? 'Yearly' : 'Monthly'}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-bold">
                            ₹{(viewingBatch.feeType === 'yearly' ? viewingBatch.totalFee : viewingBatch.monthlyFee).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">
                            {viewingBatch.feeType === 'yearly' ? 'Per Month' : 'Per Year'}:
                          </span>
                          <span className="text-xs">
                            ₹{viewingBatch.feeType === 'yearly' 
                              ? viewingBatch.monthlyFee.toLocaleString() 
                              : (viewingBatch.monthlyFee * 12).toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Subjects & Schedule */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Subjects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {viewingBatch.subjects?.map((subCode: string, idx: number) => {
                          const subject = mockSubjects.find(s => s.code === subCode);
                          return <Badge key={idx} variant="secondary">{subject?.name || subCode}</Badge>;
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-4 mt-4">
                  {/* Top Performers */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        Top Performers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {viewingBatch.analytics?.topPerformers.map((student: any, idx: number) => (
                          <div key={student.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full font-bold text-sm">
                                #{idx + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{student.name}</p>
                                <p className="text-xs text-muted-foreground">Rank {student.rank}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-green-600">{student.avgScore}%</p>
                              <p className="text-xs text-muted-foreground">Attendance: {student.attendance}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Subject-wise Performance */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Subject-wise Average Scores
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {viewingBatch.analytics?.subjectAverage.map((subject: any) => (
                          <div key={subject.subject} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{subject.subject}</span>
                              <span className="text-sm font-bold">{subject.average}%</span>
                            </div>
                            <Progress value={subject.average} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Low: {subject.lowScore}</span>
                              <span>High: {subject.topScore}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Attendance Tab */}
                <TabsContent value="attendance" className="space-y-4 mt-4">
                  {/* Low Attendance Students */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        Students with Low Attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {viewingBatch.analytics?.lowAttendance.length > 0 ? (
                        <div className="space-y-2">
                          {viewingBatch.analytics.lowAttendance.map((student: any) => (
                            <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                              <div>
                                <p className="font-semibold text-sm">{student.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Absent: {student.absent} days • Late: {student.late} days
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-lg text-red-600">{student.attendance}%</p>
                                <Badge variant="destructive" className="text-xs">Needs Attention</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">No low attendance issues</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Overall Attendance Stats */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Attendance Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Average Attendance</p>
                          <p className="text-2xl font-bold text-green-600">{viewingBatch.analytics?.overallStats.avgAttendance}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Classes</p>
                          <p className="text-2xl font-bold">{viewingBatch.analytics?.overallStats.totalClasses}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Students Tab */}
                <TabsContent value="students" className="space-y-4 mt-4">
                  {viewingBatch.students && viewingBatch.students.length > 0 ? (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Enrolled Students ({viewingBatch.students.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Admission No.</TableHead>
                                <TableHead>Enrolled Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {viewingBatch.students.map((student: any, index: number) => (
                                <TableRow key={student.id} className="hover:bg-muted/30">
                                  <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                                  <TableCell className="font-medium">{student.name}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="font-mono text-xs">{student.admissionNo}</Badge>
                                  </TableCell>
                                  <TableCell className="text-sm text-muted-foreground">
                                    {format(new Date(student.enrolledDate), 'MMM dd, yyyy')}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center text-muted-foreground">
                        No students enrolled yet
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the batch.
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
