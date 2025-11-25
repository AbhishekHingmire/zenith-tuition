import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockStudents, mockBatches } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ViewButton, EditButton, DeleteButton } from '@/components/ui/action-buttons';
import { ViewToggle } from '@/components/ui/view-toggle';

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'normal' | 'compact'>(() => {
    return (localStorage.getItem('students-view-mode') as 'normal' | 'compact') || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('students-view-mode', viewMode);
  }, [viewMode]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    batchId: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    monthlyFee: 0,
    timing: '',
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      batch: '',
      batchId: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      monthlyFee: 0,
      timing: '',
    });
    setDialogOpen(true);
  };

  const handleBatchSelect = (batchId: string) => {
    const selectedBatch = mockBatches.find(b => b.id === batchId);
    if (selectedBatch) {
      setFormData({
        ...formData,
        batchId: batchId,
        batch: selectedBatch.name,
        monthlyFee: selectedBatch.monthlyFee,
      });
    }
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      batch: student.batch,
      batchId: '',
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
      monthlyFee: student.monthlyFee || 0,
      timing: '',
    });
    setDialogOpen(true);
  };

  const handleSaveStudent = () => {
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id ? { ...s, ...formData } : s
      ));
      toast.success('Student updated successfully');
    } else {
      const newStudent = {
        ...formData,
        id: `s${students.length + 1}`,
        admissionNo: `STU-2024-${String(students.length + 1).padStart(3, '0')}`,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        joiningDate: new Date().toISOString().split('T')[0],
        monthlyFee: 5000,
        status: 'active',
        attendancePercentage: 0,
      };
      setStudents([...students, newStudent]);
      toast.success('Student added successfully');
    }
    setDialogOpen(false);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudentToDelete(studentId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete));
      toast.success('Student deleted successfully');
    }
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Students Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage all student records and information</p>
          </div>
          <Button onClick={handleAddStudent} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Add Student
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-lg">All Students ({filteredStudents.length})</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students..." 
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
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-3">
              {filteredStudents.map((student) => (
                <div key={student.id} className={viewMode === 'compact' ? "border border-border rounded-lg p-2 space-y-1.5" : "border border-border rounded-lg p-3 space-y-2"}>
                  <div className="flex items-center gap-2">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className={viewMode === 'compact' ? "w-8 h-8 rounded-full flex-shrink-0" : "w-10 h-10 rounded-full flex-shrink-0"}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={viewMode === 'compact' ? "font-semibold text-xs truncate" : "font-semibold text-sm truncate"}>{student.name}</p>
                      <p className="text-[11px] text-muted-foreground">{student.admissionNo}</p>
                    </div>
                    {viewMode === 'normal' && (
                      <Badge className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0">
                        {student.status}
                      </Badge>
                    )}
                  </div>
                  {viewMode === 'normal' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Batch:</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{student.batch}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Attendance:</span>
                        <span className="font-medium">{student.attendancePercentage}%</span>
                      </div>
                    </div>
                  )}
                  {viewMode === 'compact' && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 w-fit">{student.batch}</Badge>
                  )}
                  <div className={viewMode === 'compact' ? "flex gap-1" : "flex gap-1.5 pt-1.5 border-t border-border"}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-[11px]"
                      onClick={() => navigate(`/admin/students/${student.id}`)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2"
                      onClick={() => handleEditStudent(student)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10 h-7 px-2"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium">Student</th>
                    <th className="px-3 py-2 text-left text-xs font-medium">Admission No</th>
                    <th className="px-3 py-2 text-left text-xs font-medium">Batch</th>
                    <th className="px-3 py-2 text-left text-xs font-medium">Parent Contact</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">Attendance</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">Status</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-muted/50">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{student.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs">{student.admissionNo}</td>
                      <td className="px-3 py-2">
                        <Badge variant="outline" className="text-xs">{student.batch}</Badge>
                      </td>
                      <td className="px-3 py-2 text-xs">{student.parentPhone}</td>
                      <td className="px-3 py-2 text-center">
                        <span className="text-xs font-medium">{student.attendancePercentage}%</span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Badge className="bg-secondary text-secondary-foreground text-xs">
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-center gap-1.5">
                          <ViewButton onClick={() => navigate(`/admin/students/${student.id}`)} />
                          <EditButton onClick={() => handleEditStudent(student)} />
                          <DeleteButton onClick={() => handleDeleteStudent(student.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch">Batch *</Label>
                <Select value={formData.batchId} onValueChange={handleBatchSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBatches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name} - ₹{batch.monthlyFee}/month
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyFee">Monthly Fee</Label>
                <Input
                  id="monthlyFee"
                  value={`₹${formData.monthlyFee}`}
                  disabled
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="timing">Batch Timing</Label>
                <Input
                  id="timing"
                  value={formData.timing}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent Name *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Parent Phone *</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="parentEmail">Parent Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveStudent} className="bg-primary hover:bg-primary/90">
                {editingStudent ? 'Update' : 'Add'} Student
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
                This action cannot be undone. This will permanently delete the student record.
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
