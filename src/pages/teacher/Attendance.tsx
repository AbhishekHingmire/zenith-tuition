import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, XCircle, CalendarIcon, Users, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type AttendanceStatus = 'present' | 'absent' | 'unmarked';

type Student = {
  id: string;
  name: string;
  admissionNo: string;
  photo: string;
  status: AttendanceStatus;
};

const mockBatches = [
  { id: 'b1', name: 'Grade 10-A', subject: 'Mathematics', students: 25 },
  { id: 'b2', name: 'Grade 9-B', subject: 'Science', students: 28 },
  { id: 'b3', name: 'Grade 11-A', subject: 'Physics', students: 22 },
];

const mockStudents: Student[] = [
  { id: 's1', name: 'Rahul Kumar', admissionNo: 'STU-001', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', status: 'unmarked' },
  { id: 's2', name: 'Priya Sharma', admissionNo: 'STU-002', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', status: 'unmarked' },
  { id: 's3', name: 'Amit Patel', admissionNo: 'STU-003', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', status: 'unmarked' },
  { id: 's4', name: 'Neha Singh', admissionNo: 'STU-004', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha', status: 'unmarked' },
  { id: 's5', name: 'Vikram Reddy', admissionNo: 'STU-005', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram', status: 'unmarked' },
  { id: 's6', name: 'Anjali Verma', admissionNo: 'STU-006', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali', status: 'unmarked' },
  { id: 's7', name: 'Rohan Gupta', admissionNo: 'STU-007', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan', status: 'unmarked' },
  { id: 's8', name: 'Sneha Joshi', admissionNo: 'STU-008', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', status: 'unmarked' },
];

export default function TeacherAttendance() {
  const location = useLocation();
  const batchFromState = location.state?.batch;
  
  const [selectedBatch, setSelectedBatch] = useState(batchFromState || '');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const toggleAttendance = (studentId: string, status: AttendanceStatus) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status } : s
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'present' })));
    toast.success('All students marked present');
  };

  const markAllAbsent = () => {
    setStudents(students.map(s => ({ ...s, status: 'absent' })));
    toast.success('All students marked absent');
  };

  const handleSubmit = () => {
    const unmarked = students.filter(s => s.status === 'unmarked');
    if (unmarked.length > 0) {
      toast.error(`Please mark attendance for ${unmarked.length} student(s)`);
      return;
    }
    
    const presentCount = students.filter(s => s.status === 'present').length;
    const absentCount = students.filter(s => s.status === 'absent').length;
    
    toast.success(`Attendance saved! Present: ${presentCount}, Absent: ${absentCount}`);
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const unmarkedCount = students.filter(s => s.status === 'unmarked').length;
  const totalStudents = students.length;
  const attendancePercentage = totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(1) : 0;

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Mark Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">Record student attendance for your classes</p>
        </div>

        {/* Selection Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Batch</label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBatches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.name}>
                        {batch.name} - {batch.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedBatch && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-lg font-bold">{totalStudents}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Present</p>
                      <p className="text-lg font-bold text-green-600">{presentCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Absent</p>
                      <p className="text-lg font-bold text-red-600">{absentCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">Percentage</p>
                    <p className="text-lg font-bold">{attendancePercentage}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bulk Actions */}
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={markAllPresent}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Check className="w-4 h-4 mr-1" />
                Mark All Present
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={markAllAbsent}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Mark All Absent
              </Button>
            </div>

            {/* Student List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Students {unmarkedCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {unmarkedCount} unmarked
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between gap-3 p-3 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={student.photo} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.admissionNo}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant={student.status === 'present' ? 'default' : 'outline'}
                          className={cn(
                            "h-8 px-3",
                            student.status === 'present' && "bg-green-600 hover:bg-green-700"
                          )}
                          onClick={() => toggleAttendance(student.id, 'present')}
                        >
                          <Check className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Present</span>
                        </Button>
                        <Button
                          size="sm"
                          variant={student.status === 'absent' ? 'default' : 'outline'}
                          className={cn(
                            "h-8 px-3",
                            student.status === 'absent' && "bg-red-600 hover:bg-red-700"
                          )}
                          onClick={() => toggleAttendance(student.id, 'absent')}
                        >
                          <X className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Absent</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                size="lg" 
                onClick={handleSubmit}
                className="w-full sm:w-auto"
                disabled={unmarkedCount > 0}
              >
                Submit Attendance
              </Button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
