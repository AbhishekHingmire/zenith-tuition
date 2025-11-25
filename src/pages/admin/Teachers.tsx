import { useState, useEffect } from 'react';
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
import { ViewToggle } from '@/components/ui/view-toggle';

export default function Teachers() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingTeacher, setViewingTeacher] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'normal' | 'compact'>(() => {
    return (localStorage.getItem('teachers-view-mode') as 'normal' | 'compact') || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('teachers-view-mode', viewMode);
  }, [viewMode]);

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
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search teachers..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <ViewToggle view={viewMode} onViewChange={setViewMode} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={viewMode === 'compact' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"}>
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className={viewMode === 'compact' ? "border border-border rounded-lg p-2 hover:shadow-md transition-shadow bg-card" : "border border-border rounded-lg p-3 hover:shadow-md transition-shadow bg-card"}>
                    <div className={viewMode === 'compact' ? "flex items-center gap-1.5 mb-1.5" : "flex items-center gap-2 mb-2"}>
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className={viewMode === 'compact' ? "w-8 h-8 rounded-full flex-shrink-0" : "w-10 h-10 rounded-full flex-shrink-0"}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className={viewMode === 'compact' ? "font-semibold text-xs truncate" : "font-semibold text-sm truncate"}>{teacher.name}</h3>
                        <p className="text-[10px] text-muted-foreground truncate">{teacher.employeeId}</p>
                      </div>
                    </div>
                    
                    {viewMode === 'normal' ? (
                      <>
                        <div className="space-y-1.5 mb-2">
                          <div>
                            <p className="text-[11px] text-muted-foreground">Subjects</p>
                            <div className="flex gap-1 mt-0.5 flex-wrap">
                              {teacher.subjects.slice(0, 2).map((subCode, idx) => {
                                const subject = mockSubjects.find(s => s.code === subCode);
                                return (
                                  <Badge key={idx} variant="outline" className="text-[10px] px-1.5 py-0">{subject?.name || subCode}</Badge>
                                );
                              })}
                              {teacher.subjects.length > 2 && (
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                  +{teacher.subjects.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[11px] text-muted-foreground">Batches</p>
                              <p className="text-xs font-medium">{teacher.assignedBatches.length}</p>
                            </div>
                            <Badge className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0">
                              {teacher.status}
                            </Badge>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="mb-1.5">
                        <p className="text-[10px] text-muted-foreground">{teacher.subjects.length} subjects • {teacher.assignedBatches.length} batches</p>
                      </div>
                    )}

                    <div className={viewMode === 'compact' ? "flex gap-1" : "flex gap-1.5 pt-2 border-t border-border"}>
                      {viewMode === 'normal' ? (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 h-7 text-[11px]"
                            onClick={() => handleViewTeacher(teacher)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-7 px-2"
                            onClick={() => handleEditTeacher(teacher)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-destructive hover:bg-destructive/10 h-7 px-2"
                            onClick={() => handleDeleteTeacher(teacher.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 h-6 text-[10px] px-1"
                            onClick={() => handleViewTeacher(teacher)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-6 px-1.5"
                            onClick={() => handleEditTeacher(teacher)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-destructive hover:bg-destructive/10 h-6 px-1.5"
                            onClick={() => handleDeleteTeacher(teacher.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </>
                      )}
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
