import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Users, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockBatches, mockTeachers, mockSubjects } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ScheduleBuilder, ScheduleSlot, formatScheduleDisplay } from '@/components/ScheduleBuilder';

export default function Batches() {
  const [batches, setBatches] = useState(mockBatches);
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
        ? prev.teacherIds.filter(t => t !== teacherId)
        : [...prev.teacherIds, teacherId]
    }));
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
      monthlyFee: String(batch.monthlyFee),
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
    setViewingBatch(batch);
    setViewDialogOpen(true);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <Card key={batch.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{batch.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {batch.subjects?.map((subCode, idx) => {
                        const subject = mockSubjects.find(s => s.code === subCode);
                        return (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subject?.name || subCode}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <Badge className={batch.status === 'ongoing' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}>
                    {batch.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center gap-2 text-xs">
                  <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Teacher:</span>
                  <span className="font-medium truncate">{batch.teacher}</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-muted-foreground">Schedule:</span>
                    <p className="font-medium break-words">{batch.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">{batch.enrolledStudents}/{batch.capacity}</span>
                </div>
                <div className="pt-2 border-t border-border flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewBatch(batch)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditBatch(batch)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteBatch(batch.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
                <Label htmlFor="batchFee">Monthly Fee (₹) *</Label>
                <Input
                  id="batchFee"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.monthlyFee}
                  onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                />
              </div>
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Batch Details</DialogTitle>
            </DialogHeader>
            {viewingBatch && (
              <div className="space-y-4 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{viewingBatch.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {viewingBatch.subjects?.map((subCode: string, idx: number) => {
                        const subject = mockSubjects.find(s => s.code === subCode);
                        return (
                          <Badge key={idx} variant="outline">
                            {subject?.name || subCode}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <Badge className={viewingBatch.status === 'ongoing' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}>
                    {viewingBatch.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-medium">{viewingBatch.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teacher</p>
                    <p className="font-medium">{viewingBatch.teacher}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">Schedule</p>
                    {viewingBatch.schedules && viewingBatch.schedules.length > 0 ? (
                      <div className="space-y-2">
                        {viewingBatch.schedules.map((slot: ScheduleSlot, idx: number) => (
                          <div key={slot.id || idx} className="p-2 bg-muted/50 rounded-md">
                            <div className="flex flex-wrap gap-1 mb-1">
                              {slot.days.map(day => (
                                <Badge key={day} variant="secondary" className="text-xs">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs font-medium">
                              {slot.startTime} - {slot.endTime}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-medium text-sm">{viewingBatch.schedule}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{viewingBatch.enrolledStudents}/{viewingBatch.capacity} students</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{viewingBatch.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{viewingBatch.endDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Monthly Fee</p>
                    <p className="font-medium">₹{viewingBatch.monthlyFee.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Enrollment Progress</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Enrollment</span>
                      <span className="font-medium">
                        {Math.round((viewingBatch.enrolledStudents / viewingBatch.capacity) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(viewingBatch.enrolledStudents / viewingBatch.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
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
