import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Users, Plus, Search, Edit, Trash2, Eye, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Calendar, BookOpen, IndianRupee, Receipt, Download, Share2, FileText, Filter, Award, BarChart3, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockBatches } from '@/data/mockData';
import { coachingStudents, coachingBatches } from '@/data/comprehensiveCoachingData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ViewButton, EditButton, DeleteButton } from '@/components/ui/action-buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(coachingStudents);
  const [selectedBatchFilter, setSelectedBatchFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [oldStudents] = useState([
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
      joiningDate: "2024-06-01",
      feeType: 'yearly',
      totalFee: 60000,
      monthlyFee: 5000,
      totalPaid: 25000,
      totalDue: 5000,
      lastPayment: '2024-11-15',
      lastPaymentAmount: 5000,
      feeStatus: 'overdue',
      nextDueDate: '2024-12-01',
      attendanceRecords: [
        { date: '2024-12-23', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00-10:30', status: 'Present' },
        { date: '2024-12-23', batch: 'Grade 10-A', subject: 'Physics', time: '11:00-12:30', status: 'Present' },
        { date: '2024-12-22', batch: 'Grade 10-A', subject: 'Chemistry', time: '14:00-15:30', status: 'Absent' },
        { date: '2024-12-22', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00-10:30', status: 'Present' },
        { date: '2024-12-21', batch: 'Grade 10-A', subject: 'Physics', time: '11:00-12:30', status: 'Late' },
        { date: '2024-12-21', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00-10:30', status: 'Present' },
        { date: '2024-12-20', batch: 'Grade 10-A', subject: 'Chemistry', time: '14:00-15:30', status: 'Present' },
        { date: '2024-12-20', batch: 'Grade 10-A', subject: 'Physics', time: '11:00-12:30', status: 'Present' },
      ],
      paymentHistory: [
        { id: 'P001', date: '2024-11-15', amount: 5000, mode: 'UPI', transactionId: 'UPI123456', receiptNo: 'RCT-001' },
        { id: 'P002', date: '2024-10-10', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-002' },
        { id: 'P003', date: '2024-09-08', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN789012', receiptNo: 'RCT-003' },
        { id: 'P004', date: '2024-08-05', amount: 5000, mode: 'UPI', transactionId: 'UPI654321', receiptNo: 'RCT-004' },
        { id: 'P005', date: '2024-07-01', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-005' },
      ],
      examRecords: [
        { id: 'E001', examName: 'Mid Term Exam', subject: 'Mathematics', type: 'mid_term', date: '2024-12-15', marksObtained: 85, totalMarks: 100, grade: 'A', percentage: 85, rank: 3 },
        { id: 'E002', examName: 'Unit Test 2', subject: 'Physics', type: 'unit_test', date: '2024-12-10', marksObtained: 78, totalMarks: 100, grade: 'B+', percentage: 78, rank: 8 },
        { id: 'E003', examName: 'Mid Term Exam', subject: 'Chemistry', type: 'mid_term', date: '2024-12-12', marksObtained: 92, totalMarks: 100, grade: 'A+', percentage: 92, rank: 1 },
        { id: 'E004', examName: 'Unit Test 1', subject: 'Mathematics', type: 'unit_test', date: '2024-11-20', marksObtained: 80, totalMarks: 100, grade: 'A', percentage: 80, rank: 5 },
        { id: 'E005', examName: 'Weekly Test', subject: 'Physics', type: 'weekly_test', date: '2024-12-05', marksObtained: 75, totalMarks: 100, grade: 'B+', percentage: 75, rank: 6 },
        { id: 'E006', examName: 'Unit Test 1', subject: 'Chemistry', type: 'unit_test', date: '2024-11-18', marksObtained: 88, totalMarks: 100, grade: 'A', percentage: 88, rank: 2 },
      ]
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
      joiningDate: "2024-05-15",
      feeType: 'yearly',
      totalFee: 60000,
      monthlyFee: 5000,
      totalPaid: 30000,
      totalDue: 0,
      lastPayment: '2024-12-01',
      lastPaymentAmount: 5000,
      feeStatus: 'paid',
      nextDueDate: '2025-01-01',
      attendanceRecords: [
        { date: '2024-12-20', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00-10:30', status: 'Present' },
        { date: '2024-12-19', batch: 'Grade 10-A', subject: 'Physics', time: '11:00-12:30', status: 'Present' },
        { date: '2024-12-18', batch: 'Grade 10-A', subject: 'Chemistry', time: '14:00-15:30', status: 'Present' },
        { date: '2024-12-17', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00-10:30', status: 'Present' },
        { date: '2024-12-16', batch: 'Grade 10-A', subject: 'Physics', time: '11:00-12:30', status: 'Present' },
      ],
      paymentHistory: [
        { id: 'P011', date: '2024-12-01', amount: 5000, mode: 'UPI', transactionId: 'UPI111222', receiptNo: 'RCT-011' },
        { id: 'P012', date: '2024-11-01', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN333444', receiptNo: 'RCT-012' },
        { id: 'P013', date: '2024-10-01', amount: 5000, mode: 'UPI', transactionId: 'UPI555666', receiptNo: 'RCT-013' },
        { id: 'P014', date: '2024-09-01', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-014' },
        { id: 'P015', date: '2024-08-01', amount: 5000, mode: 'UPI', transactionId: 'UPI777888', receiptNo: 'RCT-015' },
        { id: 'P016', date: '2024-07-01', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN999000', receiptNo: 'RCT-016' },
      ]
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
      joiningDate: "2024-07-01",
      feeType: 'monthly',
      totalFee: 30000,
      monthlyFee: 5000,
      totalPaid: 20000,
      totalDue: 10000,
      lastPayment: '2024-10-10',
      lastPaymentAmount: 5000,
      feeStatus: 'overdue',
      nextDueDate: '2024-11-01',
      attendanceRecords: [
        { date: '2024-12-20', batch: 'Grade 11-B', subject: 'Mathematics', time: '09:00-10:30', status: 'Absent' },
        { date: '2024-12-19', batch: 'Grade 11-B', subject: 'Physics', time: '11:00-12:30', status: 'Present' },
        { date: '2024-12-18', batch: 'Grade 11-B', subject: 'Chemistry', time: '14:00-15:30', status: 'Absent' },
        { date: '2024-12-17', batch: 'Grade 11-B', subject: 'Mathematics', time: '09:00-10:30', status: 'Late' },
        { date: '2024-12-16', batch: 'Grade 11-B', subject: 'Physics', time: '11:00-12:30', status: 'Present' },
      ],
      paymentHistory: [
        { id: 'P021', date: '2024-10-10', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-021' },
        { id: 'P022', date: '2024-09-05', amount: 5000, mode: 'UPI', transactionId: 'UPI123789', receiptNo: 'RCT-022' },
        { id: 'P023', date: '2024-08-01', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN456123', receiptNo: 'RCT-023' },
        { id: 'P024', date: '2024-07-01', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-024' },
      ]
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<any>(null);
  
  // Filter states
  const [attendanceStartDate, setAttendanceStartDate] = useState(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
  const [attendanceEndDate, setAttendanceEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [examStartDate, setExamStartDate] = useState(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
  const [examEndDate, setExamEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedExamType, setSelectedExamType] = useState<string>('all');

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

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBatch = selectedBatchFilter === 'all' || student.batch === selectedBatchFilter;
    
    return matchesSearch && matchesBatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (value: string) => {
    setSelectedBatchFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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
    // Reset filters to default (1 month)
    setAttendanceStartDate(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
    setAttendanceEndDate(format(new Date(), 'yyyy-MM-dd'));
    setExamStartDate(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
    setExamEndDate(format(new Date(), 'yyyy-MM-dd'));
    setSelectedSubject('all');
    setSelectedExamType('all');
  };

  const handleDownloadReport = () => {
    if (!viewingStudent) return;
    
    const filteredAttendance = viewingStudent.attendanceRecords?.filter((record: any) => {
      const recordDate = new Date(record.date);
      return recordDate >= new Date(attendanceStartDate) && recordDate <= new Date(attendanceEndDate);
    });
    
    const filteredExams = viewingStudent.examRecords?.filter((record: any) => {
      const recordDate = new Date(record.date);
      const dateMatch = recordDate >= new Date(examStartDate) && recordDate <= new Date(examEndDate);
      const subjectMatch = selectedSubject === 'all' || record.subject === selectedSubject;
      const typeMatch = selectedExamType === 'all' || record.type === selectedExamType;
      return dateMatch && subjectMatch && typeMatch;
    });
    
    const reportContent = `STUDENT PERFORMANCE REPORT
==========================
Student: ${viewingStudent.name} | ${viewingStudent.admissionNo} | ${viewingStudent.batch}
Generated: ${format(new Date(), 'MMMM dd, yyyy')}

ATTENDANCE (${format(new Date(attendanceStartDate), 'MMM dd, yyyy')} - ${format(new Date(attendanceEndDate), 'MMM dd, yyyy')}):
Total: ${filteredAttendance?.length || 0} | Present: ${filteredAttendance?.filter((r: any) => r.status === 'Present').length || 0} | Absent: ${filteredAttendance?.filter((r: any) => r.status === 'Absent').length || 0} | Late: ${filteredAttendance?.filter((r: any) => r.status === 'Late').length || 0}
Attendance %: ${filteredAttendance?.length ? ((filteredAttendance.filter((r: any) => r.status === 'Present').length / filteredAttendance.length) * 100).toFixed(1) : 0}%

EXAM PERFORMANCE (${format(new Date(examStartDate), 'MMM dd, yyyy')} - ${format(new Date(examEndDate), 'MMM dd, yyyy')}):
Total Exams: ${filteredExams?.length || 0} | Average: ${filteredExams?.length ? (filteredExams.reduce((sum: number, e: any) => sum + e.percentage, 0) / filteredExams.length).toFixed(1) : 0}%

${filteredExams?.map((exam: any) => `${format(new Date(exam.date), 'MMM dd')} - ${exam.examName} (${exam.subject}): ${exam.marksObtained}/${exam.totalMarks} (${exam.grade}) Rank: ${exam.rank}`).join('\n') || 'No exams'}`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${viewingStudent.name.replace(/\s+/g, '_')}_Report_${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Report downloaded successfully!');
  };

  const handleShareReport = () => {
    if (!viewingStudent) return;
    const reportText = `Student Report - ${viewingStudent.name} (${viewingStudent.admissionNo})
Attendance: ${viewingStudent.attendance?.percentage || 0}% | Avg Performance: ${viewingStudent.scores?.length ? Math.round(viewingStudent.scores.reduce((acc: number, s: any) => acc + (s.marks / s.total) * 100, 0) / viewingStudent.scores.length) : 0}%`;
    
    if (navigator.share) {
      navigator.share({ title: `Report - ${viewingStudent.name}`, text: reportText })
        .then(() => toast.success('Report shared!'))
        .catch(() => { navigator.clipboard.writeText(reportText); toast.success('Copied to clipboard!'); });
    } else {
      navigator.clipboard.writeText(reportText);
      toast.success('Report copied to clipboard!');
    }
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
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Select value={selectedBatchFilter} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches ({students.length})</SelectItem>
                    {coachingBatches.map(batch => (
                      <SelectItem key={batch.id} value={batch.name}>
                        {batch.name} ({students.filter(s => s.batch === batch.name).length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-3">
              {paginatedStudents.map((student) => (
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
                  {paginatedStudents.map((student) => (
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

            {/* Pagination */}
            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredStudents.length}
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
              <div className="flex items-center justify-between pr-6">
                <DialogTitle>Student Details</DialogTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShareReport}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
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
                      <CardContent className="grid grid-cols-2 md:grid-cols-2 gap-3 text-sm">
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
                        <CardTitle className="text-base">Fee Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Joining Date */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Joining Date</p>
                            <p className="font-semibold text-sm">
                              {viewingStudent.joiningDate ? format(new Date(viewingStudent.joiningDate), 'MMM dd, yyyy') : 'N/A'}
                            </p>
                          </div>

                          {/* Fee Type */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Fee Type</p>
                            <Badge variant="secondary" className="text-xs">
                              {viewingStudent.feeType === 'yearly' ? 'Yearly' : 'Monthly'}
                            </Badge>
                          </div>

                          {/* Total Fees */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {viewingStudent.feeType === 'yearly' ? 'Total Yearly Fee' : 'Total Fee'}
                            </p>
                            <p className="font-semibold text-sm text-blue-600 dark:text-blue-400">
                              ₹{(viewingStudent.totalFee || ((viewingStudent.totalPaid || 0) + (viewingStudent.totalDue || 0))).toLocaleString()}
                            </p>
                            {viewingStudent.feeType === 'yearly' && (
                              <p className="text-[10px] text-muted-foreground">
                                ₹{viewingStudent.monthlyFee?.toLocaleString()}/month
                              </p>
                            )}
                          </div>

                          {/* Monthly Installment (for yearly) */}
                          {viewingStudent.feeType === 'yearly' && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Monthly Installment</p>
                              <p className="font-semibold text-sm text-purple-600 dark:text-purple-400">
                                ₹{(viewingStudent.monthlyFee || 0).toLocaleString()}
                              </p>
                            </div>
                          )}

                          {/* Paid Fees */}
                          <div className={viewingStudent.feeType === 'monthly' ? 'col-span-1' : 'col-span-2'}>
                            <p className="text-xs text-muted-foreground mb-1">Paid Fees</p>
                            <p className="font-semibold text-sm text-green-600 dark:text-green-400">
                              ₹{(viewingStudent.totalPaid || 0).toLocaleString()}
                            </p>
                          </div>

                          {/* Remaining Fees */}
                          <div className="col-span-2">
                            <p className="text-xs text-muted-foreground mb-1">Remaining Fees</p>
                            <div className="flex items-center gap-2">
                              <p className={`font-semibold text-lg ${
                                viewingStudent.totalDue > 0 
                                  ? 'text-red-600 dark:text-red-400' 
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                ₹{(viewingStudent.totalDue || 0).toLocaleString()}
                              </p>
                              {viewingStudent.totalDue > 0 && (
                                <Badge variant="destructive" className="text-[9px] px-1.5 py-0">
                                  Due
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Tentative Due Date */}
                          {viewingStudent.totalDue > 0 && viewingStudent.nextDueDate && (
                            <div className="col-span-2 pt-2 border-t">
                              <p className="text-xs text-muted-foreground mb-1">Next Due Date</p>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-600" />
                                <p className="font-semibold text-sm text-orange-600 dark:text-orange-400">
                                  {format(new Date(viewingStudent.nextDueDate), 'MMM dd, yyyy')}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t mt-4">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setViewDialogOpen(false);
                              navigate('/admin/finance');
                            }}
                          >
                            <Receipt className="w-4 h-4 mr-2" />
                            Record Fee Payment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="attendance" className="space-y-3">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <Calendar className="h-6 w-6 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                            <p className="text-xl font-bold">{(viewingStudent.attendance?.present || 0) + (viewingStudent.attendance?.absent || 0) + (viewingStudent.attendance?.late || 0)}</p>
                            <p className="text-[10px] text-muted-foreground">Total Days</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <CheckCircle className="h-6 w-6 mx-auto mb-1 text-green-600 dark:text-green-400" />
                            <p className="text-xl font-bold">{viewingStudent.attendance?.present || 0}</p>
                            <p className="text-[10px] text-muted-foreground">Present</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <XCircle className="h-6 w-6 mx-auto mb-1 text-red-600 dark:text-red-400" />
                            <p className="text-xl font-bold">{viewingStudent.attendance?.absent || 0}</p>
                            <p className="text-[10px] text-muted-foreground">Absent</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <div className="text-center">
                            <TrendingUp className="h-6 w-6 mx-auto mb-1 text-primary" />
                            <p className="text-xl font-bold">{viewingStudent.attendance?.percentage || 0}%</p>
                            <p className="text-[10px] text-muted-foreground">Percentage</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Date Filter */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Filter Attendance</Label>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setAttendanceStartDate(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
                                setAttendanceEndDate(format(new Date(), 'yyyy-MM-dd'));
                              }}
                            >
                              Reset (1 Month)
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                              <Label htmlFor="attendanceStart" className="text-xs mb-1.5 block">Start Date</Label>
                              <Input
                                id="attendanceStart"
                                type="date"
                                value={attendanceStartDate}
                                onChange={(e) => setAttendanceStartDate(e.target.value)}
                                className="h-9"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor="attendanceEnd" className="text-xs mb-1.5 block">End Date</Label>
                              <Input
                                id="attendanceEnd"
                                type="date"
                                value={attendanceEndDate}
                                onChange={(e) => setAttendanceEndDate(e.target.value)}
                                className="h-9"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>Showing: {viewingStudent.attendanceRecords?.filter((r: any) => {
                              const date = new Date(r.date);
                              return date >= new Date(attendanceStartDate) && date <= new Date(attendanceEndDate);
                            }).length || 0} records</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Attendance Table - Complete Format */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Attendance Records</CardTitle>
                        <p className="text-xs text-muted-foreground">Complete attendance history in table format</p>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          // Filter attendance records by date range
                          const filteredRecords = viewingStudent.attendanceRecords?.filter((record: any) => {
                            const recordDate = new Date(record.date);
                            return recordDate >= new Date(attendanceStartDate) && recordDate <= new Date(attendanceEndDate);
                          });

                          // Sort by date descending (most recent first)
                          const sortedRecords = [...(filteredRecords || [])].sort((a, b) => 
                            new Date(b.date).getTime() - new Date(a.date).getTime()
                          );

                          if (sortedRecords.length === 0) {
                            return (
                              <div className="text-center py-8 text-muted-foreground">
                                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No attendance records found for selected period</p>
                              </div>
                            );
                          }

                          return (
                            <div className="border rounded-lg">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">Date</TableHead>
                                    <TableHead className="font-semibold">Batch</TableHead>
                                    <TableHead className="font-semibold">Subject</TableHead>
                                    <TableHead className="font-semibold">Time</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {sortedRecords.map((record: any, index: number) => (
                                    <TableRow key={index} className="hover:bg-muted/30">
                                      <TableCell className="font-medium">
                                        {format(new Date(record.date), 'MMM dd, yyyy')}
                                        <br />
                                        <span className="text-xs text-muted-foreground">
                                          {format(new Date(record.date), 'EEEE')}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className="text-xs">
                                          {record.batch}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="font-medium">{record.subject}</TableCell>
                                      <TableCell className="text-muted-foreground">{record.time}</TableCell>
                                      <TableCell>
                                        <Badge 
                                          variant={
                                            record.status === 'Present' 
                                              ? 'default' 
                                              : record.status === 'Absent' 
                                              ? 'destructive' 
                                              : 'secondary'
                                          }
                                          className="text-xs px-3"
                                        >
                                          {record.status === 'Present' && <CheckCircle className="w-3 h-3 mr-1" />}
                                          {record.status === 'Absent' && <XCircle className="w-3 h-3 mr-1" />}
                                          {record.status === 'Late' && <Clock className="w-3 h-3 mr-1" />}
                                          {record.status}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="scores" className="space-y-3">
                    {/* Filters */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Filter Exams</Label>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setExamStartDate(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
                                setExamEndDate(format(new Date(), 'yyyy-MM-dd'));
                                setSelectedSubject('all');
                                setSelectedExamType('all');
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="examStart" className="text-xs mb-1.5 block">Start Date</Label>
                              <Input
                                id="examStart"
                                type="date"
                                value={examStartDate}
                                onChange={(e) => setExamStartDate(e.target.value)}
                                className="h-9"
                              />
                            </div>
                            <div>
                              <Label htmlFor="examEnd" className="text-xs mb-1.5 block">End Date</Label>
                              <Input
                                id="examEnd"
                                type="date"
                                value={examEndDate}
                                onChange={(e) => setExamEndDate(e.target.value)}
                                className="h-9"
                              />
                            </div>
                            <div>
                              <Label htmlFor="subjectFilter" className="text-xs mb-1.5 block">Subject</Label>
                              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                <SelectTrigger id="subjectFilter" className="h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Subjects</SelectItem>
                                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                                  <SelectItem value="Physics">Physics</SelectItem>
                                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="examTypeFilter" className="text-xs mb-1.5 block">Exam Type</Label>
                              <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                                <SelectTrigger id="examTypeFilter" className="h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Types</SelectItem>
                                  <SelectItem value="unit_test">Unit Test</SelectItem>
                                  <SelectItem value="mid_term">Mid Term</SelectItem>
                                  <SelectItem value="final">Final</SelectItem>
                                  <SelectItem value="weekly_test">Weekly Test</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Exam Records Table */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Exam Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const filteredExams = viewingStudent.examRecords?.filter((exam: any) => {
                            const examDate = new Date(exam.date);
                            const dateMatch = examDate >= new Date(examStartDate) && examDate <= new Date(examEndDate);
                            const subjectMatch = selectedSubject === 'all' || exam.subject === selectedSubject;
                            const typeMatch = selectedExamType === 'all' || exam.type === selectedExamType;
                            return dateMatch && subjectMatch && typeMatch;
                          }) || [];

                          if (filteredExams.length === 0) {
                            return (
                              <div className="text-center py-8 text-muted-foreground">
                                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No exam records found for selected filters</p>
                              </div>
                            );
                          }

                          const avgPercentage = filteredExams.reduce((sum: number, e: any) => sum + e.percentage, 0) / filteredExams.length;
                          
                          return (
                            <>
                              {/* Quick Stats */}
                              <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-3 text-center">
                                  <p className="text-xs text-muted-foreground">Total Exams</p>
                                  <p className="text-2xl font-bold">{filteredExams.length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-3 text-center">
                                  <p className="text-xs text-muted-foreground">Avg Score</p>
                                  <p className="text-2xl font-bold">{avgPercentage.toFixed(1)}%</p>
                                </div>
                                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-lg p-3 text-center">
                                  <p className="text-xs text-muted-foreground">Best Rank</p>
                                  <p className="text-2xl font-bold">{Math.min(...filteredExams.map((e: any) => e.rank))}</p>
                                </div>
                              </div>

                              {/* Exam Table */}
                              <div className="border rounded-lg overflow-hidden">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-muted/50">
                                      <TableHead className="text-xs">Date</TableHead>
                                      <TableHead className="text-xs">Exam</TableHead>
                                      <TableHead className="text-xs">Subject</TableHead>
                                      <TableHead className="text-xs">Marks</TableHead>
                                      <TableHead className="text-xs">Grade</TableHead>
                                      <TableHead className="text-xs">Rank</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {filteredExams.map((exam: any) => (
                                      <TableRow key={exam.id} className="hover:bg-muted/30">
                                        <TableCell className="text-xs">
                                          {format(new Date(exam.date), 'MMM dd, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-xs">
                                          <div>
                                            <p className="font-medium">{exam.examName}</p>
                                            <Badge variant="outline" className="text-[10px] mt-1">
                                              {exam.type.replace('_', ' ')}
                                            </Badge>
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium">{exam.subject}</TableCell>
                                        <TableCell className="text-xs">
                                          <div>
                                            <p className="font-semibold">{exam.marksObtained}/{exam.totalMarks}</p>
                                            <Progress value={exam.percentage} className="h-1 mt-1" />
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-xs">
                                          <Badge 
                                            variant={
                                              exam.grade.startsWith('A') ? 'default' :
                                              exam.grade.startsWith('B') ? 'secondary' :
                                              'outline'
                                            }
                                            className="text-[10px]"
                                          >
                                            {exam.grade}
                                          </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs">
                                          <div className="flex items-center gap-1">
                                            <Target className="w-3 h-3" />
                                            <span className="font-medium">#{exam.rank}</span>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </>
                          );
                        })()}
                      </CardContent>
                    </Card>

                    {/* Subject-wise Performance */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Subject-wise Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {viewingStudent.scores?.map((score: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-sm">{score.subject}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {score.grade}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs">
                                      {score.trend.startsWith('+') ? (
                                        <TrendingUp className="h-3 w-3 text-green-600" />
                                      ) : (
                                        <TrendingDown className="h-3 w-3 text-red-600" />
                                      )}
                                      <span className={score.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                        {score.trend}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={(score.marks / score.total) * 100} className="h-2 flex-1" />
                                  <span className="text-xs font-medium text-muted-foreground">
                                    {score.marks}/{score.total}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
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
