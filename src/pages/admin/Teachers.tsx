import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { GraduationCap, Plus, Search, Edit, Trash2, Eye, Star, Users, BookOpen, TrendingUp, Award, Calendar } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
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

  // Pagination logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {paginatedTeachers.map((teacher) => (
                <div key={teacher.id} className="border border-border rounded-lg p-3 hover:shadow-md transition-shadow bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{teacher.name}</h3>
                      <p className="text-[10px] text-muted-foreground truncate">{teacher.employeeId}</p>
                    </div>
                  </div>
                  
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

                  <div className="flex gap-1.5 pt-2 border-t border-border">
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
                  </div>
                </div>
              ))}
            </div>

            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTeachers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Teacher Details</DialogTitle>
            </DialogHeader>
            {viewingTeacher && (
              <div className="space-y-6 py-4">
                {/* Header Section */}
                <div className="flex items-start gap-4 pb-4 border-b">
                  <img
                    src={viewingTeacher.photo}
                    alt={viewingTeacher.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{viewingTeacher.name}</h3>
                        <p className="text-muted-foreground text-sm">{viewingTeacher.employeeId}</p>
                        <Badge className="bg-secondary text-secondary-foreground mt-2">
                          {viewingTeacher.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950 px-3 py-2 rounded-lg">
                        <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                        <span className="text-xl font-bold text-amber-700 dark:text-amber-400">4.8</span>
                        <span className="text-sm text-muted-foreground">/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <p className="text-xs text-muted-foreground">Total Students</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">45</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <p className="text-xs text-muted-foreground">Subjects</p>
                      </div>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400">{viewingTeacher.subjects.length}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <p className="text-xs text-muted-foreground">Avg. Result</p>
                      </div>
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">87%</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <p className="text-xs text-muted-foreground">Experience</p>
                      </div>
                      <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">4.5y</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Metrics */}
                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Student Satisfaction</span>
                          <span className="text-sm font-bold text-primary">92%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Class Attendance Rate</span>
                          <span className="text-sm font-bold text-primary">96%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Assignment Completion</span>
                          <span className="text-sm font-bold text-primary">88%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Exam Pass Rate</span>
                          <span className="text-sm font-bold text-primary">94%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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

                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Subjects Teaching</p>
                  <div className="flex gap-2 flex-wrap">
                    {viewingTeacher.subjects.map((subCode: string, idx: number) => {
                      const subject = mockSubjects.find(s => s.code === subCode);
                      return (
                        <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                          {subject?.name || subCode}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {viewingTeacher.assignedBatches.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Assigned Batches</p>
                    <div className="flex gap-2 flex-wrap">
                      {viewingTeacher.assignedBatches.map((batch: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-sm px-3 py-1">
                          {batch}
                        </Badge>
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
