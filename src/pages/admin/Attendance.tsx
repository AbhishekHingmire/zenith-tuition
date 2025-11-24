import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, XCircle, AlertCircle, Download, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockBatches } from '@/data/mockData';
import { toast } from 'sonner';

export default function Attendance() {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

  const filteredStudents = selectedBatch === 'all' 
    ? mockStudents 
    : mockStudents.filter(s => s.batch === mockBatches.find(b => b.id === selectedBatch)?.name);

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    toast.success('Attendance saved successfully!');
  };

  const handleExport = () => {
    toast.info('Exporting attendance data...');
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = Object.values(attendanceData).filter(s => s === 'present').length;
    const absent = Object.values(attendanceData).filter(s => s === 'absent').length;
    const late = Object.values(attendanceData).filter(s => s === 'late').length;
    const unmarked = total - present - absent - late;
    
    return { total, present, absent, late, unmarked };
  };

  const stats = getAttendanceStats();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Attendance Management</h1>
            <p className="text-muted-foreground mt-1">Mark and manage daily attendance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleSaveAttendance} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-2xl font-bold text-secondary">{stats.present}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Absent</p>
              <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Late</p>
              <p className="text-2xl font-bold text-amber-600">{stats.late}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Unmarked</p>
              <p className="text-2xl font-bold text-muted-foreground">{stats.unmarked}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Batch</label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    {mockBatches.map(batch => (
                      <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Actions</label>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      const newData: Record<string, 'present' | 'absent' | 'late'> = {};
                      filteredStudents.forEach(s => newData[s.id] = 'present');
                      setAttendanceData(newData);
                      toast.success('Marked all as present');
                    }}
                    className="flex-1"
                  >
                    All Present
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setAttendanceData({});
                      toast.info('Cleared all marks');
                    }}
                    className="flex-1"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance List */}
        <Card>
          <CardHeader>
            <CardTitle>Mark Attendance ({filteredStudents.length} Students)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[600px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Admission No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Batch</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Mark Attendance</th>
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
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant={attendanceData[student.id] === 'present' ? 'default' : 'outline'}
                            className={attendanceData[student.id] === 'present' ? 'bg-secondary hover:bg-secondary/90' : ''}
                            onClick={() => markAttendance(student.id, 'present')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={attendanceData[student.id] === 'late' ? 'default' : 'outline'}
                            className={attendanceData[student.id] === 'late' ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}
                            onClick={() => markAttendance(student.id, 'late')}
                          >
                            <AlertCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={attendanceData[student.id] === 'absent' ? 'default' : 'outline'}
                            className={attendanceData[student.id] === 'absent' ? 'bg-destructive hover:bg-destructive/90' : ''}
                            onClick={() => markAttendance(student.id, 'absent')}
                          >
                            <XCircle className="w-4 h-4" />
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
      </div>
    </MainLayout>
  );
}
