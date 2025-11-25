import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Search, Edit, Trash2, Eye, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Calendar, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockBatches } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ViewButton, EditButton, DeleteButton } from '@/components/ui/action-buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function Students() {
  const [students, setStudents] = useState([
    { 
      id: "1", 
      name: "Rahul Sharma", 
      admissionNo: "ADM001",
      batch: "Grade 10-A", 
      phone: "9876543210", 
      parentPhone: "9876543211", 
      email: "rahul@example.com", 
      status: "Active", 
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      attendancePercentage: 85,
      attendance: { present: 85, absent: 10, late: 5, percentage: 85 },
      scores: [
        { subject: "Mathematics", marks: 85, total: 100, grade: "A", trend: "+5" },
        { subject: "Physics", marks: 78, total: 100, grade: "B+", trend: "-2" },
        { subject: "Chemistry", marks: 92, total: 100, grade: "A+", trend: "+8" }
      ],
      recentActivity: [
        { date: "2025-05-20", type: "Assignment Submitted", subject: "Mathematics" },
        { date: "2025-05-19", type: "Exam Completed", subject: "Physics" },
        { date: "2025-05-18", type: "Present", subject: "All Classes" }
      ],
      dateOfBirth: "2009-05-15",
      gender: "Male",
      address: "123 Main St, Mumbai",
      parentName: "Mr. Sharma",
      parentEmail: "sharma@example.com",
      monthlyFee: 5000
    },
    { 
      id: "2", 
      name: "Priya Patel", 
      admissionNo: "ADM002",
      batch: "Grade 10-A", 
      phone: "9876543220", 
      parentPhone: "9876543221", 
      email: "priya@example.com", 
      status: "Active", 
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      attendancePercentage: 92,
      attendance: { present: 92, absent: 5, late: 3, percentage: 92 },
      scores: [
        { subject: "Mathematics", marks: 95, total: 100, grade: "A+", trend: "+3" },
        { subject: "Physics", marks: 88, total: 100, grade: "A", trend: "+5" },
        { subject: "Chemistry", marks: 90, total: 100, grade: "A+", trend: "+2" }
      ],
      recentActivity: [
        { date: "2025-05-20", type: "Assignment Submitted", subject: "Chemistry" },
        { date: "2025-05-19", type: "Present", subject: "All Classes" },
        { date: "2025-05-18", type: "Top Score", subject: "Mathematics" }
      ],
      dateOfBirth: "2009-08-22",
      gender: "Female",
      address: "456 Park Ave, Mumbai",
      parentName: "Mrs. Patel",
      parentEmail: "patel@example.com",
      monthlyFee: 5000
    },
    { 
      id: "3", 
      name: "Amit Kumar", 
      admissionNo: "ADM003",
      batch: "Grade 11-B", 
      phone: "9876543230", 
      parentPhone: "9876543231", 
      email: "amit@example.com", 
      status: "Active", 
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      attendancePercentage: 78,
      attendance: { present: 78, absent: 18, late: 4, percentage: 78 },
      scores: [
        { subject: "Mathematics", marks: 72, total: 100, grade: "B", trend: "-3" },
        { subject: "Physics", marks: 68, total: 100, grade: "B-", trend: "-5" },
        { subject: "Chemistry", marks: 75, total: 100, grade: "B+", trend: "+1" }
      ],
      recentActivity: [
        { date: "2025-05-20", type: "Absent", subject: "Chemistry" },
        { date: "2025-05-19", type: "Assignment Late", subject: "Physics" },
        { date: "2025-05-18", type: "Present", subject: "Mathematics" }
      ],
      dateOfBirth: "2008-12-10",
      gender: "Male",
      address: "789 River Rd, Pune",
      parentName: "Mr. Kumar",
      parentEmail: "kumar@example.com",
      monthlyFee: 5000
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<any>(null);

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
        attendance: { present: 0, absent: 0, late: 0, percentage: 0 },
        scores: [],
        recentActivity: []
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

  const handleViewStudent = (student: any) => {
    setViewingStudent(student);
    setViewDialogOpen(true);
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
              <div className="relative w-full sm:w-56">
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
          <CardContent className="pt-0">
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-3">
              {filteredStudents.map((student) => (
                <div key={student.id} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={student.photo} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{student.name}</p>
                      <p className="text-[11px] text-muted-foreground">{student.admissionNo}</p>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0">
                      {student.status}
                    </Badge>
                  </div>
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
                  <div className="flex gap-1.5 pt-1.5 border-t border-border">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-[11px]"
                      onClick={() => handleViewStudent(student)}
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
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={student.photo} />
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                          </Avatar>
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
                          <ViewButton onClick={() => handleViewStudent(student)} />
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

        {/* View Student Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
            </DialogHeader>
            {viewingStudent && (
              <div className="space-y-4">
                {/* Student Header */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={viewingStudent.photo} />
                    <AvatarFallback>{viewingStudent.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{viewingStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">{viewingStudent.admissionNo} • {viewingStudent.batch}</p>
                  </div>
                  <Badge variant={viewingStudent.status === "Active" ? "default" : "secondary"}>
                    {viewingStudent.status}
                  </Badge>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="scores">Scores</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-3">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Email</p>
                          <p className="font-medium">{viewingStudent.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Phone</p>
                          <p className="font-medium">{viewingStudent.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Parent Phone</p>
                          <p className="font-medium">{viewingStudent.parentPhone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Batch</p>
                          <p className="font-medium">{viewingStudent.batch}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {viewingStudent.recentActivity?.map((activity: any, index: number) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <div className={`p-1 rounded-full ${
                                activity.type.includes('Present') || activity.type.includes('Submitted') || activity.type.includes('Top') 
                                  ? 'bg-secondary/20' 
                                  : activity.type.includes('Absent') || activity.type.includes('Late')
                                  ? 'bg-destructive/20'
                                  : 'bg-muted'
                              }`}>
                                {activity.type.includes('Present') || activity.type.includes('Submitted') ? (
                                  <CheckCircle className="h-3 w-3 text-secondary" />
                                ) : activity.type.includes('Absent') ? (
                                  <XCircle className="h-3 w-3 text-destructive" />
                                ) : activity.type.includes('Late') ? (
                                  <Clock className="h-3 w-3 text-destructive" />
                                ) : (
                                  <BookOpen className="h-3 w-3" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-xs">{activity.type}</p>
                                <p className="text-muted-foreground text-[10px]">{activity.subject} • {activity.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="attendance" className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <CheckCircle className="h-6 w-6 mx-auto mb-1 text-secondary" />
                            <p className="text-xl font-bold">{viewingStudent.attendance?.present || 0}</p>
                            <p className="text-[10px] text-muted-foreground">Present</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <XCircle className="h-6 w-6 mx-auto mb-1 text-destructive" />
                            <p className="text-xl font-bold">{viewingStudent.attendance?.absent || 0}</p>
                            <p className="text-[10px] text-muted-foreground">Absent</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <Clock className="h-6 w-6 mx-auto mb-1 text-amber-500" />
                            <p className="text-xl font-bold">{viewingStudent.attendance?.late || 0}</p>
                            <p className="text-[10px] text-muted-foreground">Late</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <Calendar className="h-6 w-6 mx-auto mb-1 text-primary" />
                            <p className="text-xl font-bold">{viewingStudent.attendance?.percentage || 0}%</p>
                            <p className="text-[10px] text-muted-foreground">Attendance</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Attendance Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Progress value={viewingStudent.attendance?.percentage || 0} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                          {viewingStudent.attendance?.percentage >= 85 
                            ? "Excellent attendance record!" 
                            : viewingStudent.attendance?.percentage >= 75 
                            ? "Good attendance, keep it up!" 
                            : "Attendance needs improvement"}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="scores" className="space-y-2">
                    <div className="space-y-2">
                      {viewingStudent.scores?.map((score: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="pt-4 pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-sm">{score.subject}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {score.marks}/{score.total} marks
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary" className="mb-1 text-xs">
                                  Grade {score.grade}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs">
                                  {score.trend.startsWith('+') ? (
                                    <TrendingUp className="h-3 w-3 text-secondary" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 text-destructive" />
                                  )}
                                  <span className={score.trend.startsWith('+') ? 'text-secondary' : 'text-destructive'}>
                                    {score.trend}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Progress value={(score.marks / score.total) * 100} className="h-1.5" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Overall Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs">Average Score</p>
                            <p className="text-xl font-bold">
                              {Math.round(viewingStudent.scores?.reduce((acc: number, s: any) => acc + (s.marks / s.total) * 100, 0) / (viewingStudent.scores?.length || 1)) || 0}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Subjects</p>
                            <p className="text-xl font-bold">{viewingStudent.scores?.length || 0}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
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