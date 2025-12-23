import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const mockBatches = [
  { id: 'all', name: 'All Batches' },
  { id: 'b1', name: 'Grade 10-A' },
  { id: 'b2', name: 'Grade 9-B' },
  { id: 'b3', name: 'Grade 11-A' },
];

const mockAttendanceData = [
  { batch: 'Grade 10-A', date: '2025-01-20', present: 28, absent: 2, total: 30, percentage: 93 },
  { batch: 'Grade 9-B', date: '2025-01-20', present: 25, absent: 0, total: 25, percentage: 100 },
  { batch: 'Grade 11-A', date: '2025-01-20', present: 30, absent: 2, total: 32, percentage: 94 },
];

const lowAttendanceStudents = [
  { name: 'Amit Kumar', batch: 'Grade 11-A', attendance: 68, status: 'critical' },
  { name: 'Neha Gupta', batch: 'Grade 10-A', attendance: 72, status: 'warning' },
  { name: 'Vikram Singh', batch: 'Grade 9-B', attendance: 74, status: 'warning' },
];

export default function AdminAttendance() {
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredData = selectedBatch === 'all' 
    ? mockAttendanceData 
    : mockAttendanceData.filter(r => r.batch === selectedBatch);

  const totalPresent = filteredData.reduce((sum, r) => sum + r.present, 0);
  const totalAbsent = filteredData.reduce((sum, r) => sum + r.absent, 0);
  const totalStudents = filteredData.reduce((sum, r) => sum + r.total, 0);
  const avgAttendance = totalStudents ? ((totalPresent / totalStudents) * 100).toFixed(1) : 0;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">Monitor and track student attendance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Present</p>
              <p className="text-3xl font-bold text-green-600">{totalPresent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Absent</p>
              <p className="text-3xl font-bold text-red-600">{totalAbsent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-3xl font-bold">{totalStudents}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Avg Attendance</p>
              <p className="text-3xl font-bold text-blue-600">{avgAttendance}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBatches.map(batch => (
                      <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredData.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{record.batch}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.present} present, {record.absent} absent
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={record.percentage} className="w-20" />
                      <Badge variant={record.percentage >= 90 ? 'default' : record.percentage >= 75 ? 'secondary' : 'destructive'}>
                        {record.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Attendance Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="w-5 h-5" />
                Low Attendance Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowAttendanceStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.batch}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={student.attendance} className="w-20" />
                      <Badge variant={student.status === 'critical' ? 'destructive' : 'secondary'}>
                        {student.attendance}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
