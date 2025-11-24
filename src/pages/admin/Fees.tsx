import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndianRupee, Search, Download, Send, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockStudents } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Fees() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  // Mock fee data
  const feeData = mockStudents.map(student => ({
    ...student,
    feeAmount: student.monthlyFee || 5000,
    paidAmount: Math.random() > 0.5 ? student.monthlyFee || 5000 : Math.floor(Math.random() * (student.monthlyFee || 5000)),
    dueDate: new Date(2024, 1, 15).toISOString().split('T')[0],
    status: Math.random() > 0.5 ? 'paid' : Math.random() > 0.3 ? 'pending' : 'overdue',
  }));

  const filteredData = feeData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.admissionNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalCollection: feeData.reduce((sum, s) => sum + s.paidAmount, 0),
    pending: feeData.filter(s => s.status === 'pending').length,
    overdue: feeData.filter(s => s.status === 'overdue').length,
    paid: feeData.filter(s => s.status === 'paid').length,
  };

  const handleRecordPayment = (student: any) => {
    setSelectedStudent(student);
    setPaymentAmount(String(student.feeAmount - student.paidAmount));
    setPaymentDialogOpen(true);
  };

  const handleSavePayment = () => {
    toast.success(`Payment of ₹${paymentAmount} recorded for ${selectedStudent.name}`);
    setPaymentDialogOpen(false);
  };

  const handleSendReminder = (student: any) => {
    toast.success(`Reminder sent to ${student.name}`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-secondary text-secondary-foreground"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Fee Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Track fee collection and payments</p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <IndianRupee className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Collection</p>
                  <p className="text-lg sm:text-xl font-bold">₹{(stats.totalCollection / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Paid</p>
                  <p className="text-lg sm:text-xl font-bold">{stats.paid}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-lg sm:text-xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-700" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Overdue</p>
                  <p className="text-lg sm:text-xl font-bold">{stats.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative sm:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Fee Records */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Fee Records ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Student</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Admission No</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Fee Amount</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Paid</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Due</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold">Status</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.batch}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs">{item.admissionNo}</td>
                      <td className="px-3 py-3 text-xs font-medium">₹{item.feeAmount}</td>
                      <td className="px-3 py-3 text-xs text-secondary font-medium">₹{item.paidAmount}</td>
                      <td className="px-3 py-3 text-xs text-destructive font-medium">
                        ₹{item.feeAmount - item.paidAmount}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          {item.status !== 'paid' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                                onClick={() => handleRecordPayment(item)}
                              >
                                Record
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0"
                                onClick={() => handleSendReminder(item)}
                              >
                                <Send className="w-3.5 h-3.5" />
                              </Button>
                            </>
                          )}
                          {item.status === 'paid' && (
                            <Badge className="bg-secondary text-secondary-foreground text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <img
                    src={selectedStudent.photo}
                    alt={selectedStudent.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{selectedStudent.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.admissionNo}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Fee</p>
                    <p className="text-lg font-semibold">₹{selectedStudent.feeAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Already Paid</p>
                    <p className="text-lg font-semibold text-secondary">₹{selectedStudent.paidAmount}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSavePayment} className="bg-primary hover:bg-primary/90">
                Record Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
