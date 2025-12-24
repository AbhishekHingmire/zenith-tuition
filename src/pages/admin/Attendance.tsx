import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Clock, UserCheck, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const mockBatches = [
  { id: 'b1', name: 'Grade 10-A', teacher: 'Dr. Sharma', students: [
    { id: 's1', name: 'Rahul Verma', admNo: 'STU001' },
    { id: 's2', name: 'Priya Singh', admNo: 'STU002' },
    { id: 's3', name: 'Amit Kumar', admNo: 'STU003' },
    { id: 's4', name: 'Sneha Patel', admNo: 'STU004' },
    { id: 's5', name: 'Rohan Das', admNo: 'STU005' },
  ]},
  { id: 'b2', name: 'Grade 9-B', teacher: 'Prof. Gupta', students: [
    { id: 's6', name: 'Vikram Singh', admNo: 'STU006' },
    { id: 's7', name: 'Kavya Reddy', admNo: 'STU007' },
    { id: 's8', name: 'Arjun Malhotra', admNo: 'STU008' },
  ]},
  { id: 'b3', name: 'Grade 11-A', teacher: 'Mr. Mehta', students: [
    { id: 's9', name: 'Divya Iyer', admNo: 'STU009' },
    { id: 's10', name: 'Karan Sharma', admNo: 'STU010' },
  ]},
];

const todayAttendanceStatus = [
  { 
    batchId: 'b1',
    batch: 'Grade 10-A', 
    teacher: 'Dr. Sharma',
    markedBy: 'Dr. Sharma',
    markedAt: '09:15 AM',
    isCompleted: true,
    present: 4,
    absent: 1,
    total: 5
  },
  { 
    batchId: 'b2',
    batch: 'Grade 9-B', 
    teacher: 'Prof. Gupta',
    markedBy: null,
    markedAt: null,
    isCompleted: false,
    present: 0,
    absent: 0,
    total: 3
  },
  { 
    batchId: 'b3',
    batch: 'Grade 11-A', 
    teacher: 'Mr. Mehta',
    markedBy: 'Mr. Mehta',
    markedAt: '11:30 AM',
    isCompleted: true,
    present: 2,
    absent: 0,
    total: 2
  },
];

export default function AdminAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [markingBatch, setMarkingBatch] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<Record<string, 'P' | 'A'>>({});
  const [completedPage, setCompletedPage] = useState(1);
  const [completedItemsPerPage, setCompletedItemsPerPage] = useState(10);
  const [pendingPage, setPendingPage] = useState(1);
  const [pendingItemsPerPage, setPendingItemsPerPage] = useState(10);

  const completedBatches = todayAttendanceStatus.filter(b => b.isCompleted);
  const pendingBatches = todayAttendanceStatus.filter(b => !b.isCompleted);

  // Pagination logic for completed batches
  const completedTotalPages = Math.ceil(completedBatches.length / completedItemsPerPage);
  const completedStartIndex = (completedPage - 1) * completedItemsPerPage;
  const completedEndIndex = completedStartIndex + completedItemsPerPage;
  const paginatedCompletedBatches = completedBatches.slice(completedStartIndex, completedEndIndex);

  const handleCompletedItemsPerPageChange = (newItemsPerPage: number) => {
    setCompletedItemsPerPage(newItemsPerPage);
    setCompletedPage(1);
  };

  // Pagination logic for pending batches
  const pendingTotalPages = Math.ceil(pendingBatches.length / pendingItemsPerPage);
  const pendingStartIndex = (pendingPage - 1) * pendingItemsPerPage;
  const pendingEndIndex = pendingStartIndex + pendingItemsPerPage;
  const paginatedPendingBatches = pendingBatches.slice(pendingStartIndex, pendingEndIndex);

  const handlePendingItemsPerPageChange = (newItemsPerPage: number) => {
    setPendingItemsPerPage(newItemsPerPage);
    setPendingPage(1);
  };

  const totalCompleted = completedBatches.length;
  const totalPending = pendingBatches.length;
  const totalPresent = completedBatches.reduce((sum, b) => sum + b.present, 0);
  const totalAbsent = completedBatches.reduce((sum, b) => sum + b.absent, 0);

  const handleMarkBatch = (batchId: string) => {
    const batch = mockBatches.find(b => b.id === batchId);
    if (batch) {
      setMarkingBatch(batch);
      // Initialize all as present
      const initialData: Record<string, 'P' | 'A'> = {};
      batch.students.forEach(s => initialData[s.id] = 'P');
      setAttendanceData(initialData);
    }
  };

  const toggleAttendance = (studentId: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'P' ? 'A' : 'P'
    }));
  };

  const markAllPresent = () => {
    const newData: Record<string, 'P' | 'A'> = {};
    markingBatch.students.forEach((s: any) => newData[s.id] = 'P');
    setAttendanceData(newData);
  };

  const handleSubmitAttendance = () => {
    toast.success(`Attendance saved successfully for ${markingBatch.name}!`);
    setMarkingBatch(null);
  };

  const presentCount = Object.values(attendanceData).filter(s => s === 'P').length;
  const absentCount = Object.values(attendanceData).filter(s => s === 'A').length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">Today's attendance tracking - Completed & Pending</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Completed Batches</p>
              <p className="text-3xl font-bold text-green-600">{totalCompleted}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Pending Batches</p>
              <p className="text-3xl font-bold text-orange-600">{totalPending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Present</p>
              <p className="text-3xl font-bold text-blue-600">{totalPresent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Absent</p>
              <p className="text-3xl font-bold text-red-600">{totalAbsent}</p>
            </CardContent>
          </Card>
        </div>

        {/* Date Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="max-w-xs">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Today's Attendance - Completed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Attendance Completed Today
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Batches where attendance has been marked by teachers
            </p>
          </CardHeader>
          <CardContent>
            {completedBatches.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No completed attendance for today</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Marked By</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCompletedBatches.map((batch) => (
                    <TableRow key={batch.batchId}>
                      <TableCell className="font-medium">{batch.batch}</TableCell>
                      <TableCell>{batch.teacher}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          <UserCheck className="w-3 h-3 mr-1" />
                          {batch.markedBy}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{batch.markedAt}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {batch.present}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          {batch.absent}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{batch.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {completedBatches.length > 0 && (
              <div className="mt-4">
                <DataTablePagination
                  currentPage={completedPage}
                  totalPages={completedTotalPages}
                  totalItems={completedBatches.length}
                  itemsPerPage={completedItemsPerPage}
                  onPageChange={setCompletedPage}
                  onItemsPerPageChange={handleCompletedItemsPerPageChange}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Attendance - Pending */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Attendance Pending Today
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Batches where attendance has not been marked yet - Admin can mark
            </p>
          </CardHeader>
          <CardContent>
            {pendingBatches.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50 text-green-600" />
                <p className="font-medium">All attendance completed for today!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPendingBatches.map((batch) => (
                    <TableRow key={batch.batchId}>
                      <TableCell className="font-medium">{batch.batch}</TableCell>
                      <TableCell>{batch.teacher}</TableCell>
                      <TableCell>{batch.total} students</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          <Clock className="w-3 h-3 mr-1" />
                          Not Marked
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          onClick={() => handleMarkBatch(batch.batchId)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Mark Attendance
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {pendingBatches.length > 0 && (
              <div className="mt-4">
                <DataTablePagination
                  currentPage={pendingPage}
                  totalPages={pendingTotalPages}
                  totalItems={pendingBatches.length}
                  itemsPerPage={pendingItemsPerPage}
                  onPageChange={setPendingPage}
                  onItemsPerPageChange={handlePendingItemsPerPageChange}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mark Attendance Dialog - Same as Teacher UI */}
      <Dialog open={!!markingBatch} onOpenChange={(open) => !open && setMarkingBatch(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Mark Attendance - {markingBatch?.name}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">Teacher: {markingBatch?.teacher}</p>
          </DialogHeader>

          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Present</p>
                  <p className="text-xl font-bold text-green-600">{presentCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Absent</p>
                  <p className="text-xl font-bold text-red-600">{absentCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">{markingBatch?.students.length || 0}</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Action */}
            <Button 
              onClick={markAllPresent}
              variant="outline"
              className="w-full"
            >
              Mark All Present
            </Button>

            {/* Students List */}
            <div className="space-y-2">
              {markingBatch?.students.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.admNo}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={attendanceData[student.id] === 'P' ? 'default' : attendanceData[student.id] === 'A' ? 'destructive' : 'outline'}
                    onClick={() => toggleAttendance(student.id)}
                    className="w-20"
                  >
                    {attendanceData[student.id] === 'P' ? 'Present' : attendanceData[student.id] === 'A' ? 'Absent' : 'Mark'}
                  </Button>
                </div>
              ))}
            </div>

            {/* Submit */}
            <Button onClick={handleSubmitAttendance} className="w-full">
              Save Attendance
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
