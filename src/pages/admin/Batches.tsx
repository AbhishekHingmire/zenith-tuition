import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Users, Calendar, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockBatches } from '@/data/mockData';
import { toast } from 'sonner';

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
    subject: '',
    grade: '',
    teacher: '',
    schedule: '',
    capacity: '',
    monthlyFee: '',
  });

  const handleAddBatch = () => {
    setEditingBatch(null);
    setFormData({
      name: '',
      subject: '',
      grade: '',
      teacher: '',
      schedule: '',
      capacity: '',
      monthlyFee: '',
    });
    setDialogOpen(true);
  };

  const handleEditBatch = (batch: any) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      subject: batch.subject,
      grade: batch.grade,
      teacher: batch.teacher,
      schedule: batch.schedule,
      capacity: String(batch.capacity),
      monthlyFee: String(batch.monthlyFee),
    });
    setDialogOpen(true);
  };

  const handleSaveBatch = () => {
    if (editingBatch) {
      setBatches(batches.map(b =>
        b.id === editingBatch.id
          ? { ...b, ...formData, capacity: Number(formData.capacity), monthlyFee: Number(formData.monthlyFee) }
          : b
      ));
      toast.success('Batch updated successfully');
    } else {
      const newBatch = {
        ...formData,
        id: `b${batches.length + 1}`,
        teacherId: `t${batches.length + 1}`,
        enrolledStudents: 0,
        capacity: Number(formData.capacity),
        monthlyFee: Number(formData.monthlyFee),
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Batch Management</h1>
            <p className="text-muted-foreground mt-1">Create and manage class batches</p>
          </div>
          <Button onClick={handleAddBatch} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create Batch
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <Card key={batch.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{batch.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">{batch.subject}</Badge>
                  </div>
                  <Badge className={batch.status === 'ongoing' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}>
                    {batch.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Teacher:</span>
                  <span className="font-medium truncate">{batch.teacher}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Schedule:</span>
                  <span className="font-medium text-xs">{batch.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">{batch.enrolledStudents}/{batch.capacity}</span>
                </div>
                <div className="pt-3 border-t border-border flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewBatch(batch)}
                  >
                    View Details
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
          <DialogContent className="max-w-2xl">
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
                <Label htmlFor="batchSubject">Subject *</Label>
                <Input
                  id="batchSubject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchGrade">Grade *</Label>
                <Input
                  id="batchGrade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchTeacher">Teacher *</Label>
                <Input
                  id="batchTeacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchCapacity">Capacity *</Label>
                <Input
                  id="batchCapacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchFee">Monthly Fee *</Label>
                <Input
                  id="batchFee"
                  type="number"
                  value={formData.monthlyFee}
                  onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="batchSchedule">Schedule *</Label>
                <Input
                  id="batchSchedule"
                  placeholder="e.g., Mon, Wed, Fri - 9:00 AM to 10:30 AM"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
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
                    <Badge variant="outline" className="mt-2">{viewingBatch.subject}</Badge>
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
                  <div>
                    <p className="text-sm text-muted-foreground">Schedule</p>
                    <p className="font-medium text-sm">{viewingBatch.schedule}</p>
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
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Fee</p>
                    <p className="font-medium">₹{viewingBatch.monthlyFee.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Enrolled Students</p>
                    <p className="font-medium">{viewingBatch.enrolledStudents} students</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Progress</p>
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
