import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockStudents } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
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
      dateOfBirth: '',
      gender: '',
      address: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
    });
    setDialogOpen(true);
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      batch: student.batch,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Students Management</h1>
            <p className="text-muted-foreground mt-1">Manage all student records and information</p>
          </div>
          <Button onClick={handleAddStudent} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Add Student
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>All Students ({filteredStudents.length})</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Admission No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Batch</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Parent Contact</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Attendance</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-muted/50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{student.admissionNo}</td>
                      <td className="px-4 py-4">
                        <Badge variant="outline">{student.batch}</Badge>
                      </td>
                      <td className="px-4 py-4 text-sm">{student.parentPhone}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-medium">{student.attendancePercentage}%</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="bg-secondary text-secondary-foreground">
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/students/${student.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleEditStudent(student)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
                <Input
                  id="batch"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
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
                <Input
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
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
