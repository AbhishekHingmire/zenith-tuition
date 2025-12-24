import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndianRupee, Search, Download, Send, CheckCircle, Clock, AlertTriangle, TrendingUp, X, Calendar } from 'lucide-react';
import { yearlyFees } from '@/data/yearlyMockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Fees() {
  const currentMonth = new Date().getMonth() + 1;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('current');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  // Filter fees based on search, status, and month
  const filteredData = useMemo(() => {
    let filtered = [...yearlyFees];
    
    // Month filter
    if (selectedMonth !== 'all') {
      const targetMonth = selectedMonth === 'current' ? currentMonth : parseInt(selectedMonth);
      filtered = filtered.filter(fee => fee.monthNumber === targetMonth);
    }
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }
    
    return filtered;
  }, [searchQuery, filterStatus, selectedMonth, currentMonth]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const stats = useMemo(() => ({
    totalCollection: filteredData.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0),
    pending: filteredData.filter(s => s.status === 'pending').length,
    overdue: filteredData.filter(s => s.status === 'overdue').length,
    paid: filteredData.filter(s => s.status === 'paid').length,
    expectedAmount: filteredData.reduce((sum, s) => sum + s.amount, 0),
  }), [filteredData]);

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
      <div className="space-y-4 sm:space-y-6">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Collected</p>
                  <p className="text-xl sm:text-2xl font-bold">₹{(stats.totalCollection / 100000).toFixed(1)}L</p>
                </div>
                <IndianRupee className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Paid</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.paid}</p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Overdue</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.overdue}</p>
                </div>
                <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-medium mb-1.5 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or admission no..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-medium mb-1.5 block">Month</label>
                <Select value={selectedMonth} onValueChange={(value) => { setSelectedMonth(value); setCurrentPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="current">This Month</SelectItem>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-medium mb-1.5 block">Status</label>
                <Select value={filterStatus} onValueChange={(value) => handleFilterChange(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(searchQuery || selectedMonth !== 'current' || filterStatus !== 'all') && (
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:mt-6"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMonth('current');
                    setFilterStatus('all');
                    setCurrentPage(1);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
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
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={handleFilterChange}>
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
            <CardTitle className="text-base sm:text-lg">Fee Records ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-3">
              {paginatedData.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.photo}
                      alt={item.studentName}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.studentName}</p>
                      <p className="text-xs text-muted-foreground">{item.admissionNo}</p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-muted-foreground">Fee:</span>
                      <span className="font-medium ml-1">₹{item.amount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Paid:</span>
                      <span className="font-medium ml-1 text-secondary">₹{0}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Due:</span>
                      <span className="font-medium ml-1 text-destructive">₹{item.amount - 0}</span>
                    </div>
                  </div>
                  {item.status !== 'paid' && (
                    <div className="flex gap-1.5 pt-1.5 border-t border-border">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-[11px]"
                        onClick={() => handleRecordPayment(item)}
                      >
                        <IndianRupee className="w-3 h-3 mr-1" />
                        Record
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-7 text-[11px]"
                        onClick={() => handleSendReminder(item)}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Remind
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
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
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.photo}
                            alt={item.studentName}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{item.studentName}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.batch}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs">{item.admissionNo}</td>
                      <td className="px-3 py-3 text-xs font-medium">₹{item.amount}</td>
                      <td className="px-3 py-3 text-xs text-secondary font-medium">₹{0}</td>
                      <td className="px-3 py-3 text-xs text-destructive font-medium">
                        ₹{item.amount - 0}
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
                                onClick={() => handleRecordPayment(item)}
                              >
                                <IndianRupee className="w-4 h-4 mr-1" />
                                Record
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSendReminder(item)}
                              >
                                <Send className="w-4 h-4 mr-1" />
                                Remind
                              </Button>
                            </>
                          )}
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
              totalItems={filteredData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
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
