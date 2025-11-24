import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockTeachers, mockSubjects } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function Teachers() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingTeacher, setViewingTeacher] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subjects: [] as string[],
    qualification: '',
  });

  const toggleSubject = (subjectCode: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectCode)
        ? prev.subjects.filter(s => s !== subjectCode)
        : [...prev.subjects, subjectCode]
    }));
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subjects: [],
      qualification: '',
    });
    setDialogOpen(true);
  };

  const handleEditTeacher = (teacher: any) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subjects: Array.isArray(teacher.subjects) ? teacher.subjects : [],
      qualification: teacher.qualification,
    });
    setDialogOpen(true);
  };

  const handleSaveTeacher = () => {
    if (editingTeacher) {
      setTeachers(teachers.map(t =>
        t.id === editingTeacher.id
          ? { ...t, ...formData }
          : t
      ));
      toast.success('Teacher updated successfully');
    } else {
      const newTeacher = {
        ...formData,
        id: `t${teachers.length + 1}`,
        employeeId: `EMP-2024-${String(teachers.length + 1).padStart(3, '0')}`,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        joiningDate: new Date().toISOString().split('T')[0],
        salary: 45000,
        assignedBatches: [],
        status: 'active',
      };
      setTeachers([...teachers, newTeacher]);
      toast.success('Teacher added successfully');
    }
    setDialogOpen(false);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    setTeacherToDelete(teacherId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (teacherToDelete) {
      setTeachers(teachers.filter(t => t.id !== teacherToDelete));
      toast.success('Teacher deleted successfully');
    }
    setDeleteDialogOpen(false);
    setTeacherToDelete(null);
  };

  const handleViewTeacher = (teacher: any) => {
    setViewingTeacher(teacher);
    setViewDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Teachers Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage all teacher records and assignments</p>
          </div>
          <Button onClick={handleAddTeacher} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Add Teacher
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-lg">All Teachers ({filteredTeachers.length})</CardTitle>
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search teachers..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="border border-border rounded-lg p-4 hover:shadow-lg transition-shadow bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate">{teacher.name}</h3>
                        <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Subjects</p>
                        <div className="flex gap-1 mt-0.5 flex-wrap">
                          {teacher.subjects.map((subCode, idx) => {
                            const subject = mockSubjects.find(s => s.code === subCode);
                            return (
                              <Badge key={idx} variant="outline" className="text-xs">{subject?.name || subCode}</Badge>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Batches</p>
                        <p className="text-sm font-medium">{teacher.assignedBatches.length} batches</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <Badge className="bg-secondary text-secondary-foreground text-xs">
                          {teacher.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-1.5 pt-3 border-t border-border">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewTeacher(teacher)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditTeacher(teacher)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="teacherName">Full Name *</Label>
                <Input
                  id="teacherName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherEmail">Email *</Label>
                <Input
                  id="teacherEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherPhone">Phone *</Label>
                <Input
                  id="teacherPhone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherQualification">Qualification *</Label>
                <Input
                  id="teacherQualification"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Subjects * (Select multiple)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-md max-h-48 overflow-y-auto">
                  {mockSubjects.map((subject) => (
                    <div key={subject.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject.code}
                        checked={formData.subjects.includes(subject.code)}
                        onCheckedChange={() => toggleSubject(subject.code)}
                      />
                      <label
                        htmlFor={subject.code}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveTeacher} className="bg-primary hover:bg-primary/90">
                {editingTeacher ? 'Update' : 'Add'} Teacher
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Teacher Details</DialogTitle>
            </DialogHeader>
            {viewingTeacher && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={viewingTeacher.photo}
                    alt={viewingTeacher.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{viewingTeacher.name}</h3>
                    <p className="text-muted-foreground">{viewingTeacher.employeeId}</p>
                    <Badge className="bg-secondary text-secondary-foreground mt-1">
                      {viewingTeacher.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{viewingTeacher.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{viewingTeacher.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Qualification</p>
                    <p className="font-medium">{viewingTeacher.qualification}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joining Date</p>
                    <p className="font-medium">{viewingTeacher.joiningDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p className="font-medium">₹{viewingTeacher.salary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Batches</p>
                    <p className="font-medium">{viewingTeacher.assignedBatches.length} batches</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Subjects</p>
                  <div className="flex gap-2 flex-wrap">
                    {viewingTeacher.subjects.map((subCode: string, idx: number) => {
                      const subject = mockSubjects.find(s => s.code === subCode);
                      return (
                        <Badge key={idx} variant="outline">{subject?.name || subCode}</Badge>
                      );
                    })}
                  </div>
                </div>

                {viewingTeacher.assignedBatches.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Assigned Batches</p>
                    <div className="flex gap-2 flex-wrap">
                      {viewingTeacher.assignedBatches.map((batch: string, idx: number) => (
                        <Badge key={idx} variant="outline">{batch}</Badge>
                      ))}
                    </div>
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
                This action cannot be undone. This will permanently delete the teacher record.
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
