import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const mockBatches = [
  { id: 'b1', name: 'Grade 10-A' },
  { id: 'b2', name: 'Grade 9-B' },
  { id: 'b3', name: 'Grade 11-A' },
];

const mockStudents = [
  { 
    id: 's1', 
    name: 'Rahul Kumar', 
    admissionNo: 'STU-001',
    attendanceRecords: [
      { date: '2024-12-23', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00 AM', status: 'Present' },
      { date: '2024-12-23', batch: 'Grade 10-A', subject: 'Physics', time: '11:00 AM', status: 'Present' },
      { date: '2024-12-22', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00 AM', status: 'Absent' },
      { date: '2024-12-22', batch: 'Grade 10-A', subject: 'Chemistry', time: '02:00 PM', status: 'Present' },
      { date: '2024-12-21', batch: 'Grade 10-A', subject: 'Physics', time: '11:00 AM', status: 'Present' },
      { date: '2024-12-21', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00 AM', status: 'Late' },
      { date: '2024-12-20', batch: 'Grade 10-A', subject: 'Chemistry', time: '02:00 PM', status: 'Present' },
      { date: '2024-12-20', batch: 'Grade 10-A', subject: 'Mathematics', time: '09:00 AM', status: 'Present' },
    ]
  },
  { 
    id: 's2', 
    name: 'Priya Sharma', 
    admissionNo: 'STU-002',
    attendanceRecords: [
      { date: '2024-12-23', batch: 'Grade 9-B', subject: 'English', time: '10:00 AM', status: 'Present' },
      { date: '2024-12-22', batch: 'Grade 9-B', subject: 'Science', time: '01:00 PM', status: 'Present' },
      { date: '2024-12-21', batch: 'Grade 9-B', subject: 'English', time: '10:00 AM', status: 'Present' },
    ]
  },
  { 
    id: 's3', 
    name: 'Amit Patel', 
    admissionNo: 'STU-003',
    attendanceRecords: [
      { date: '2024-12-23', batch: 'Grade 11-A', subject: 'Biology', time: '12:00 PM', status: 'Present' },
      { date: '2024-12-22', batch: 'Grade 11-A', subject: 'Chemistry', time: '03:00 PM', status: 'Absent' },
    ]
  },
  { id: 's4', name: 'Neha Singh', admissionNo: 'STU-004', attendanceRecords: [] },
  { id: 's5', name: 'Vikram Reddy', admissionNo: 'STU-005', attendanceRecords: [] },
];

export default function TeacherAttendance() {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, 'P' | 'A'>>({});
  const [viewingStudent, setViewingStudent] = useState<any>(null);

  const toggleAttendance = (studentId: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'P' ? 'A' : 'P'
    }));
  };

  const markAllPresent = () => {
    const newData: Record<string, 'P' | 'A'> = {};
    mockStudents.forEach(s => newData[s.id] = 'P');
    setAttendanceData(newData);
  };

  const handleSubmit = () => {
    if (!selectedBatch) {
      toast.error('Please select a batch');
      return;
    }
    toast.success('Attendance saved successfully!');
  };

  const presentCount = Object.values(attendanceData).filter(s => s === 'P').length;
  const absentCount = Object.values(attendanceData).filter(s => s === 'A').length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">Mark attendance and view student records</p>
        </div>

        <Tabs defaultValue="mark" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
            <TabsTrigger value="view">View Records</TabsTrigger>
          </TabsList>

          {/* Mark Attendance Tab */}
          <TabsContent value="mark" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Present</p>
                  <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Absent</p>
                  <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{mockStudents.length}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Batch</label>
                    <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBatches.map(batch => (
                          <SelectItem key={batch.id} value={batch.name}>{batch.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Actions</label>
                    <Button 
                      onClick={markAllPresent}
                      variant="outline"
                      className="w-full mt-1"
                    >
                      Mark All Present
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Students ({mockStudents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.admissionNo}</p>
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
                <Button onClick={handleSubmit} className="w-full mt-4">
                  Save Attendance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* View Records Tab */}
          <TabsContent value="view" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Attendance Records</CardTitle>
                <p className="text-sm text-muted-foreground">View detailed attendance history (Read Only)</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.admissionNo}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setViewingStudent(student)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View History
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Attendance History - {student.name}</DialogTitle>
                          </DialogHeader>
                          
                          {student.attendanceRecords && student.attendanceRecords.length > 0 ? (
                            <div className="space-y-4 mt-4">
                              {(() => {
                                // Group attendance records by date
                                const groupedByDate = student.attendanceRecords?.reduce((acc: any, record: any) => {
                                  if (!acc[record.date]) {
                                    acc[record.date] = [];
                                  }
                                  acc[record.date].push(record);
                                  return acc;
                                }, {});

                                // Sort dates in descending order
                                const sortedDates = Object.keys(groupedByDate || {}).sort((a, b) => 
                                  new Date(b).getTime() - new Date(a).getTime()
                                );

                                return sortedDates.map((date) => {
                                  const records = groupedByDate[date];
                                  const dayStats = records.reduce((stats: any, r: any) => {
                                    stats[r.status.toLowerCase()] = (stats[r.status.toLowerCase()] || 0) + 1;
                                    stats.total++;
                                    return stats;
                                  }, { present: 0, absent: 0, late: 0, total: 0 });

                                  return (
                                    <div key={date} className="border rounded-lg overflow-hidden">
                                      {/* Date Header */}
                                      <div className="bg-muted px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <Calendar className="w-4 h-4 text-primary" />
                                          <div>
                                            <p className="font-semibold text-sm">
                                              {format(new Date(date), 'EEEE, MMMM dd, yyyy')}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              {dayStats.total} {dayStats.total === 1 ? 'class' : 'classes'}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          {dayStats.present > 0 && (
                                            <Badge variant="default" className="text-[10px] px-2">
                                              <CheckCircle className="w-3 h-3 mr-1" />
                                              {dayStats.present}
                                            </Badge>
                                          )}
                                          {dayStats.absent > 0 && (
                                            <Badge variant="destructive" className="text-[10px] px-2">
                                              <XCircle className="w-3 h-3 mr-1" />
                                              {dayStats.absent}
                                            </Badge>
                                          )}
                                          {dayStats.late > 0 && (
                                            <Badge variant="secondary" className="text-[10px] px-2">
                                              <Clock className="w-3 h-3 mr-1" />
                                              {dayStats.late}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>

                                      {/* Classes Table */}
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="bg-muted/50">
                                            <TableHead className="text-xs h-9">Batch</TableHead>
                                            <TableHead className="text-xs h-9">Subject</TableHead>
                                            <TableHead className="text-xs h-9">Time</TableHead>
                                            <TableHead className="text-xs h-9">Status</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {records.map((record: any, index: number) => (
                                            <TableRow key={index} className="hover:bg-muted/30">
                                              <TableCell className="text-xs py-2">
                                                <Badge variant="outline" className="text-[10px]">
                                                  {record.batch}
                                                </Badge>
                                              </TableCell>
                                              <TableCell className="text-xs py-2 font-medium">{record.subject}</TableCell>
                                              <TableCell className="text-xs py-2 text-muted-foreground">{record.time}</TableCell>
                                              <TableCell className="text-xs py-2">
                                                <Badge 
                                                  variant={
                                                    record.status === 'Present' 
                                                      ? 'default' 
                                                      : record.status === 'Absent' 
                                                      ? 'destructive' 
                                                      : 'secondary'
                                                  }
                                                  className="text-[10px]"
                                                >
                                                  {record.status}
                                                </Badge>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              No attendance records available
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
