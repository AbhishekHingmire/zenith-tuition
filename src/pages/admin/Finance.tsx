import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Download, 
  BarChart3,
  Receipt,
  DollarSign,
  Bell,
  Search,
  AlertCircle,
  FileText,
  Share2,
  Eye
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { EditButton, DeleteButton } from '@/components/ui/action-buttons';
import { useNavigate } from 'react-router-dom';
import { format, addMonths, isAfter, isBefore } from 'date-fns';

const mockFinanceData = {
  totalRevenue: 500000,
  totalExpenses: 320000,
  netProfit: 180000,
  outstandingDues: 120000,
  revenueGrowth: 12,
};

const mockExpenses = [
  { id: '1', date: '2024-11-15', category: 'Salaries', amount: 250000, vendor: 'Staff Payroll', mode: 'Bank Transfer' },
  { id: '2', date: '2024-11-10', category: 'Rent', amount: 40000, vendor: 'Property Owner', mode: 'Bank Transfer' },
  { id: '3', date: '2024-11-08', category: 'Utilities', amount: 15000, vendor: 'Electricity Board', mode: 'Online' },
  { id: '4', date: '2024-11-05', category: 'Stationery', amount: 8000, vendor: 'Office Supplies Co.', mode: 'Cash' },
];

const mockSalaries = [
  { id: '1', teacher: 'Mr. Sharma', salary: 45000, lastPaid: '2024-11-01', status: 'paid' },
  { id: '2', teacher: 'Mrs. Patel', salary: 42000, lastPaid: '2024-11-01', status: 'paid' },
  { id: '3', teacher: 'Ms. Khan', salary: 40000, lastPaid: '2024-10-01', status: 'pending' },
];

const mockStudentFees = [
  { 
    id: '1', 
    studentName: 'Rahul Sharma', 
    admissionNo: 'ADM001',
    batch: 'Grade 10-A',
    feeType: 'yearly',
    totalFee: 60000,
    monthlyFee: 5000, 
    totalPaid: 25000,
    totalDue: 5000,
    lastPayment: '2024-11-15',
    lastPaymentAmount: 5000,
    dueDate: '2024-12-05',
    status: 'overdue',
    phone: '9876543210',
    parentPhone: '9876543211',
    paymentHistory: [
      { id: 'P001', date: '2024-11-15', amount: 5000, mode: 'UPI', transactionId: 'UPI123456', receiptNo: 'RCT-001', status: 'Completed' },
      { id: 'P002', date: '2024-10-10', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-002', status: 'Completed' },
      { id: 'P003', date: '2024-09-08', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN789012', receiptNo: 'RCT-003', status: 'Completed' },
      { id: 'P004', date: '2024-08-05', amount: 5000, mode: 'UPI', transactionId: 'UPI654321', receiptNo: 'RCT-004', status: 'Completed' },
      { id: 'P005', date: '2024-07-01', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-005', status: 'Completed' },
    ]
  },
  { 
    id: '2', 
    studentName: 'Priya Patel', 
    admissionNo: 'ADM002',
    batch: 'Grade 10-A',
    feeType: 'yearly',
    totalFee: 60000,
    monthlyFee: 5000, 
    totalPaid: 30000,
    totalDue: 0,
    lastPayment: '2024-12-01',
    lastPaymentAmount: 5000,
    dueDate: '2025-01-05',
    status: 'paid',
    phone: '9876543220',
    parentPhone: '9876543221',
    paymentHistory: [
      { id: 'P011', date: '2024-12-01', amount: 5000, mode: 'UPI', transactionId: 'UPI111222', receiptNo: 'RCT-011', status: 'Completed' },
      { id: 'P012', date: '2024-11-01', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN333444', receiptNo: 'RCT-012', status: 'Completed' },
      { id: 'P013', date: '2024-10-01', amount: 5000, mode: 'UPI', transactionId: 'UPI555666', receiptNo: 'RCT-013', status: 'Completed' },
      { id: 'P014', date: '2024-09-01', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-014', status: 'Completed' },
      { id: 'P015', date: '2024-08-01', amount: 5000, mode: 'UPI', transactionId: 'UPI777888', receiptNo: 'RCT-015', status: 'Completed' },
      { id: 'P016', date: '2024-07-01', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN999000', receiptNo: 'RCT-016', status: 'Completed' },
    ]
  },
  { 
    id: '3', 
    studentName: 'Amit Kumar', 
    admissionNo: 'ADM003',
    batch: 'Grade 11-B',
    feeType: 'monthly',
    totalFee: 30000,
    monthlyFee: 5000, 
    totalPaid: 20000,
    totalDue: 10000,
    lastPayment: '2024-10-10',
    lastPaymentAmount: 5000,
    dueDate: '2024-11-10',
    status: 'overdue',
    phone: '9876543230',
    parentPhone: '9876543231',
    paymentHistory: [
      { id: 'P021', date: '2024-10-10', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-021', status: 'Completed' },
      { id: 'P022', date: '2024-09-05', amount: 5000, mode: 'UPI', transactionId: 'UPI123789', receiptNo: 'RCT-022', status: 'Completed' },
      { id: 'P023', date: '2024-08-01', amount: 5000, mode: 'Bank Transfer', transactionId: 'TXN456123', receiptNo: 'RCT-023', status: 'Completed' },
      { id: 'P024', date: '2024-07-01', amount: 5000, mode: 'Cash', transactionId: '-', receiptNo: 'RCT-024', status: 'Completed' },
    ]
  },
  { 
    id: '4', 
    studentName: 'Neha Singh', 
    admissionNo: 'ADM004',
    batch: 'Grade 10-B',
    feeType: 'yearly',
    totalFee: 60000,
    monthlyFee: 5000, 
    totalPaid: 25000,
    totalDue: 5000,
    lastPayment: '2024-11-20',
    lastPaymentAmount: 5000,
    dueDate: '2024-12-20',
    status: 'pending',
    phone: '9876543240',
    parentPhone: '9876543241'
  },
  { 
    id: '5', 
    studentName: 'Vikram Reddy', 
    admissionNo: 'ADM005',
    batch: 'Grade 11-A',
    feeType: 'monthly',
    totalFee: 30000,
    monthlyFee: 5000, 
    totalPaid: 30000,
    totalDue: 0,
    lastPayment: '2024-12-03',
    lastPaymentAmount: 5000,
    dueDate: '2025-01-03',
    status: 'paid',
    phone: '9876543250',
    parentPhone: '9876543251'
  },
];

export default function Finance() {
  const navigate = useNavigate();
  const [recordFeeDialogOpen, setRecordFeeDialogOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [feeSearchQuery, setFeeSearchQuery] = useState('');
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState<any>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  // Get students with pending/overdue fees
  const studentsWithDues = mockStudentFees.filter(s => s.status === 'overdue' || s.status === 'pending');
  
  // Filter fee records
  const filteredFeeRecords = mockStudentFees.filter(student =>
    student.studentName.toLowerCase().includes(feeSearchQuery.toLowerCase()) ||
    student.admissionNo.toLowerCase().includes(feeSearchQuery.toLowerCase()) ||
    student.batch.toLowerCase().includes(feeSearchQuery.toLowerCase())
  );

  const handleSelectAllDues = () => {
    if (selectedStudents.length === studentsWithDues.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(studentsWithDues.map(s => s.id));
    }
  };

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSendReminders = () => {
    if (selectedStudents.length === 0) {
      toast.error('Please select at least one student');
      return;
    }
    toast.success(`Fee reminders sent to ${selectedStudents.length} student(s)`);
    setSelectedStudents([]);
    setReminderDialogOpen(false);
  };

  const handleRecordFee = () => {
    toast.success('Fee payment recorded successfully');
    setRecordFeeDialogOpen(false);
  };

  const handleViewHistory = (student: any) => {
    setSelectedStudentForHistory(student);
    setHistoryDialogOpen(true);
  };

  const handleViewReceipt = (student: any, payment: any) => {
    setSelectedReceipt({ student, payment });
    setReceiptDialogOpen(true);
  };

  const handleDownloadReceipt = () => {
    toast.success('Receipt downloaded successfully');
  };

  const handleShareReceipt = () => {
    toast.success('Receipt shared successfully');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Finance Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage expenses, income, and financial reports</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">₹{mockFinanceData.totalRevenue.toLocaleString()}</p>
                  <Badge variant="secondary" className="mt-2 bg-secondary/20">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{mockFinanceData.revenueGrowth}%
                  </Badge>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold mt-1">₹{mockFinanceData.totalExpenses.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">This month</p>
                </div>
                <div className="bg-destructive/10 p-3 rounded-full">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold mt-1 text-secondary">₹{mockFinanceData.netProfit.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">36% margin</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Dues</p>
                  <p className="text-2xl font-bold mt-1">₹{mockFinanceData.outstandingDues.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">From students</p>
                </div>
                <div className="bg-amber-500/10 p-3 rounded-full">
                  <IndianRupee className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="fees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[800px]">
            <TabsTrigger value="fees">Fee Collection</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="salaries">Salaries</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="fees" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, admission no, or batch..."
                  value={feeSearchQuery}
                  onChange={(e) => setFeeSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Fee Reminders
                      {studentsWithDues.length > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {studentsWithDues.length}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Send Fee Reminders</DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        Select students to send fee reminder notifications
                      </p>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedStudents.length === studentsWithDues.length && studentsWithDues.length > 0}
                            onCheckedChange={handleSelectAllDues}
                          />
                          <span className="font-medium text-sm">Select All ({studentsWithDues.length})</span>
                        </div>
                        <Badge variant="outline">
                          {selectedStudents.length} selected
                        </Badge>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]"></TableHead>
                              <TableHead>Student</TableHead>
                              <TableHead>Batch</TableHead>
                              <TableHead>Due Amount</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentsWithDues.map((student) => (
                              <TableRow key={student.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={selectedStudents.includes(student.id)}
                                    onCheckedChange={() => handleSelectStudent(student.id)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-sm">{student.studentName}</p>
                                    <p className="text-xs text-muted-foreground">{student.admissionNo}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">{student.batch}</Badge>
                                </TableCell>
                                <TableCell className="font-semibold">₹{student.totalDue.toLocaleString()}</TableCell>
                                <TableCell className="text-sm">
                                  {format(new Date(student.dueDate), 'MMM d, yyyy')}
                                </TableCell>
                                <TableCell>
                                  <Badge variant={student.status === 'overdue' ? 'destructive' : 'secondary'}>
                                    {student.status === 'overdue' ? (
                                      <><AlertCircle className="w-3 h-3 mr-1" /> Overdue</>
                                    ) : (
                                      'Pending'
                                    )}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSendReminders} disabled={selectedStudents.length === 0}>
                        <Bell className="w-4 h-4 mr-2" />
                        Send Reminders ({selectedStudents.length})
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={recordFeeDialogOpen} onOpenChange={setRecordFeeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Record Fee Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                    <DialogHeader>
                      <DialogTitle>Record Fee Payment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Student</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockStudentFees.map(student => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.studentName} ({student.admissionNo})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Amount (₹)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Payment Date</Label>
                          <Input type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                        </div>
                        <div>
                          <Label>Payment Mode</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="cheque">Cheque</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="card">Card</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Transaction ID / Reference Number</Label>
                        <Input placeholder="TXN123456 (optional)" />
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <Textarea placeholder="Add notes..." rows={3} />
                      </div>
                      <div>
                        <Label>Upload Receipt (Optional)</Label>
                        <Input type="file" accept="image/*,application/pdf" />
                      </div>
                      <Button className="w-full" onClick={handleRecordFee}>
                        <Receipt className="w-4 h-4 mr-2" />
                        Record Payment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Fee Records</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Track and manage student fee payments
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Fee Type</TableHead>
                        <TableHead>Fee Amount</TableHead>
                        <TableHead>Total Paid</TableHead>
                        <TableHead>Total Due</TableHead>
                        <TableHead>Last Payment</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFeeRecords.map((student) => (
                        <TableRow key={student.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{student.studentName}</p>
                              <p className="text-xs text-muted-foreground">{student.admissionNo}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">{student.batch}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {student.feeType === 'yearly' ? 'Yearly' : 'Monthly'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div>
                              <p>₹{(student.feeType === 'yearly' ? student.totalFee : student.monthlyFee).toLocaleString()}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {student.feeType === 'yearly' ? `₹${student.monthlyFee.toLocaleString()}/mo` : `₹${(student.monthlyFee * 12).toLocaleString()}/yr`}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-secondary font-semibold">₹{student.totalPaid.toLocaleString()}</TableCell>
                          <TableCell className={`font-semibold ${student.totalDue > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                            ₹{student.totalDue.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm">
                            <div>
                              <p>{format(new Date(student.lastPayment), 'MMM d, yyyy')}</p>
                              <p className="text-xs text-muted-foreground">₹{student.lastPaymentAmount.toLocaleString()}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {format(new Date(student.dueDate), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                student.status === 'paid' ? 'default' : 
                                student.status === 'overdue' ? 'destructive' : 
                                'secondary'
                              }
                              className="text-xs"
                            >
                              {student.status === 'paid' ? 'Paid' : student.status === 'overdue' ? 'Overdue' : 'Pending'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => {
                                  setRecordFeeDialogOpen(true);
                                }}
                              >
                                <Receipt className="w-3 h-3 mr-1" />
                                Pay
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs"
                                onClick={() => handleViewHistory(student)}
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                History
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Record Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                  <DialogHeader>
                    <DialogTitle>Record New Expense</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salaries">Salaries</SelectItem>
                            <SelectItem value="rent">Rent</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="stationery">Stationery</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Amount (₹)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>Payment Mode</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Vendor/Recipient Name</Label>
                      <Input placeholder="Vendor name" />
                    </div>
                    <div>
                      <Label>Invoice/Receipt Number</Label>
                      <Input placeholder="INV-001" />
                    </div>
                    <div>
                      <Label>Description/Notes</Label>
                      <Textarea placeholder="Add notes..." rows={3} />
                    </div>
                    <div>
                      <Label>Upload Receipt/Invoice</Label>
                      <Input type="file" />
                    </div>
                    <Button className="w-full" onClick={() => toast.success('Expense recorded successfully')}>
                      Save Expense
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Expense List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium">Vendor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium">Payment Mode</th>
                        <th className="px-4 py-3 text-right text-xs font-medium">Amount</th>
                        <th className="px-4 py-3 text-center text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {mockExpenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">{expense.category}</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{expense.vendor}</td>
                          <td className="px-4 py-3 text-sm">{expense.mode}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-right">₹{expense.amount.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-1.5">
                              <EditButton onClick={() => toast.info('Edit expense feature')} />
                              <DeleteButton onClick={() => toast.info('Delete expense feature')} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salaries">
            <Card>
              <CardHeader>
                <CardTitle>Salary Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Teacher</th>
                        <th className="p-3 text-left font-medium">Monthly Salary</th>
                        <th className="p-3 text-left font-medium">Last Paid</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockSalaries.map((salary) => (
                        <tr key={salary.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{salary.teacher}</td>
                          <td className="p-3">₹{salary.salary.toLocaleString()}</td>
                          <td className="p-3">{new Date(salary.lastPaid).toLocaleDateString()}</td>
                          <td className="p-3">
                            <Badge variant={salary.status === 'paid' ? 'secondary' : 'destructive'}>
                              {salary.status === 'paid' ? 'Paid' : 'Pending'}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Receipt className="w-3 h-3 mr-1" />
                                Pay Salary
                              </Button>
                              <Button variant="ghost" size="sm">History</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Profit & Loss Statement</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive P&L report</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <IndianRupee className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Cash Flow Statement</h3>
                      <p className="text-sm text-muted-foreground">Track cash inflows & outflows</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Balance Sheet</h3>
                      <p className="text-sm text-muted-foreground">Assets, liabilities & net worth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Receipt className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Tax Reports (GST)</h3>
                      <p className="text-sm text-muted-foreground">GST compliance reports</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Payment History Dialog */}
        <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Payment History - {selectedStudentForHistory?.studentName}</DialogTitle>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Admission No: {selectedStudentForHistory?.admissionNo} • Batch: {selectedStudentForHistory?.batch}</p>
                <div className="flex gap-4 mt-2">
                  <Badge variant="outline">Total Paid: ₹{selectedStudentForHistory?.totalPaid?.toLocaleString()}</Badge>
                  <Badge variant={selectedStudentForHistory?.totalDue > 0 ? 'destructive' : 'secondary'}>
                    Due: ₹{selectedStudentForHistory?.totalDue?.toLocaleString()}
                  </Badge>
                </div>
              </div>
            </DialogHeader>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudentForHistory?.paymentHistory?.map((payment: any) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                      <TableCell>{format(new Date(payment.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="font-semibold text-secondary">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{payment.mode}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{payment.transactionId}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="text-xs bg-green-600">
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewReceipt(selectedStudentForHistory, payment)}
                            title="View Receipt"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={handleDownloadReceipt}
                            title="Download Receipt"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={handleShareReceipt}
                            title="Share Receipt"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>

        {/* Receipt View Dialog */}
        <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
          <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Fee Receipt</DialogTitle>
            </DialogHeader>
            <div className="border rounded-lg p-6 bg-white dark:bg-gray-950">
              {/* Receipt Header */}
              <div className="text-center border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold">Zenith Tuition</h2>
                <p className="text-sm text-muted-foreground">Fee Receipt</p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Receipt No.</p>
                    <p className="font-semibold">{selectedReceipt?.payment?.receiptNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-semibold">
                      {selectedReceipt?.payment?.date ? format(new Date(selectedReceipt.payment.date), 'MMM d, yyyy') : ''}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Student Name</p>
                      <p className="font-semibold">{selectedReceipt?.student?.studentName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Admission No.</p>
                      <p className="font-semibold">{selectedReceipt?.student?.admissionNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Batch</p>
                      <p className="font-semibold">{selectedReceipt?.student?.batch}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-semibold">{selectedReceipt?.student?.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Tuition Fee</span>
                      <span className="font-semibold">₹{selectedReceipt?.payment?.amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-semibold">Total Amount Paid</span>
                      <span className="text-xl font-bold text-secondary">₹{selectedReceipt?.payment?.amount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Payment Mode</p>
                      <Badge variant="outline">{selectedReceipt?.payment?.mode}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Transaction ID</p>
                      <p className="font-mono text-sm">{selectedReceipt?.payment?.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge variant="default" className="bg-green-600">{selectedReceipt?.payment?.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 text-center text-xs text-muted-foreground">
                  <p>Thank you for your payment!</p>
                  <p className="mt-1">This is a computer-generated receipt and does not require a signature.</p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadReceipt}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleShareReceipt}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
