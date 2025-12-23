import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const mockBatches = [
  { id: 'b1', name: 'Grade 10-A' },
  { id: 'b2', name: 'Grade 9-B' },
  { id: 'b3', name: 'Grade 11-A' },
];

const mockStudents = [
  { id: 's1', name: 'Rahul Kumar', admissionNo: 'STU-001' },
  { id: 's2', name: 'Priya Sharma', admissionNo: 'STU-002' },
  { id: 's3', name: 'Amit Patel', admissionNo: 'STU-003' },
  { id: 's4', name: 'Neha Singh', admissionNo: 'STU-004' },
  { id: 's5', name: 'Vikram Reddy', admissionNo: 'STU-005' },
];

export default function TeacherAttendance() {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, 'P' | 'A'>>({});

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
          <h1 className="text-2xl font-bold">Mark Attendance</h1>
          <p className="text-muted-foreground">Quick daily attendance marking</p>
        </div>

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
      </div>
    </MainLayout>
  );
}
