import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { format, subMonths, startOfDay } from 'date-fns';

// Mock data - Student can be in multiple batches with different subjects
const mockAttendanceData = {
  overall: {
    present: 85,
    absent: 10,
    total: 95,
    percentage: 89.5
  },
  // Batch and Subject-wise attendance
  batchSubjects: [
    {
      batch: 'Grade 10-A',
      subjects: [
        { name: 'Mathematics', present: 18, total: 20, percentage: 90 },
        { name: 'Physics', present: 17, total: 20, percentage: 85 },
        { name: 'English', present: 19, total: 20, percentage: 95 },
        { name: 'Biology', present: 16, total: 18, percentage: 89 },
      ]
    },
    {
      batch: 'Grade 10-B',
      subjects: [
        { name: 'Chemistry', present: 14, total: 15, percentage: 93 },
        { name: 'Computer Science', present: 15, total: 15, percentage: 100 },
      ]
    }
  ],
  // Day-wise attendance with batch and subject details
  dailyAttendance: [
    {
      date: '2024-12-23',
      day: 'Monday',
      records: [
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '11:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-12-22',
      day: 'Sunday',
      records: [
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Absent', time: '10:00 AM' },
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '11:00 AM' },
      ]
    },
    {
      date: '2024-12-21',
      day: 'Saturday',
      records: [
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-B', subject: 'Computer Science', status: 'Present', time: '10:00 AM' },
        { batch: 'Grade 10-A', subject: 'Biology', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-12-20',
      day: 'Friday',
      records: [
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Absent', time: '11:00 AM' },
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-12-19',
      day: 'Thursday',
      records: [
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '10:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-12-18',
      day: 'Wednesday',
      records: [
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '11:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-12-17',
      day: 'Tuesday',
      records: [
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Absent', time: '10:00 AM' },
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '11:00 AM' },
      ]
    },
    {
      date: '2024-12-16',
      day: 'Monday',
      records: [
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-B', subject: 'Computer Science', status: 'Present', time: '10:00 AM' },
        { batch: 'Grade 10-A', subject: 'Biology', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-12-15',
      day: 'Sunday',
      records: [
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '11:00 AM' },
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-12-14',
      day: 'Saturday',
      records: [
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '10:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Absent', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-11-30',
      day: 'Saturday',
      records: [
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '11:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-11-29',
      day: 'Friday',
      records: [
        { batch: 'Grade 10-A', subject: 'English', status: 'Absent', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '10:00 AM' },
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '11:00 AM' },
      ]
    },
    {
      date: '2024-11-28',
      day: 'Thursday',
      records: [
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-B', subject: 'Computer Science', status: 'Present', time: '10:00 AM' },
        { batch: 'Grade 10-A', subject: 'Biology', status: 'Absent', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-11-27',
      day: 'Wednesday',
      records: [
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '11:00 AM' },
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-11-26',
      day: 'Tuesday',
      records: [
        { batch: 'Grade 10-A', subject: 'English', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '10:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '02:00 PM' },
      ]
    },
    {
      date: '2024-11-25',
      day: 'Monday',
      records: [
        { batch: 'Grade 10-A', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
        { batch: 'Grade 10-A', subject: 'Physics', status: 'Absent', time: '11:00 AM' },
        { batch: 'Grade 10-B', subject: 'Chemistry', status: 'Present', time: '02:00 PM' },
      ]
    },
  ]
};

export default function StudentAttendance() {
  const { overall, batchSubjects, dailyAttendance } = mockAttendanceData;
  
  // Date filter state - default to last 1 month
  const [startDate, setStartDate] = useState(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  // Filter attendance by date range
  const filteredAttendance = dailyAttendance.filter(day => {
    const dayDate = startOfDay(new Date(day.date));
    const filterStart = startOfDay(new Date(startDate));
    const filterEnd = startOfDay(new Date(endDate));
    return (dayDate >= filterStart && dayDate <= filterEnd);
  });
  
  // Flatten all records for table view
  const allRecords = filteredAttendance.flatMap(day => 
    day.records.map(record => ({
      ...record,
      date: day.date,
      day: day.day
    }))
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Attendance</h1>
          <p className="text-muted-foreground">Track your attendance across all batches and subjects</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Overall %</p>
              <p className="text-2xl font-bold text-blue-600">{overall.percentage}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-2xl font-bold text-green-600">{overall.present}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Absent</p>
              <p className="text-2xl font-bold text-red-600">{overall.absent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-bold">{overall.total}</p>
            </CardContent>
          </Card>
        </div>

        {/* Batch & Subject-wise Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {batchSubjects.map((batch, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge variant="outline">{batch.batch}</Badge>
                  <span className="text-sm text-muted-foreground font-normal">
                    ({batch.subjects.length} subjects)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batch.subjects.map((subject) => (
                    <div key={subject.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-sm">{subject.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {subject.present}/{subject.total} ({subject.percentage}%)
                        </span>
                      </div>
                      <Progress 
                        value={subject.percentage} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Attendance Records */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Daily Attendance Records
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Your attendance history organized by date
                </p>
              </div>
            </div>
            
            {/* Date Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  From Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  To Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                />
              </div>
              <div className="flex items-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStartDate(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
                    setEndDate(format(new Date(), 'yyyy-MM-dd'));
                  }}
                >
                  Last Month
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStartDate(format(subMonths(new Date(), 3), 'yyyy-MM-dd'));
                    setEndDate(format(new Date(), 'yyyy-MM-dd'));
                  }}
                >
                  Last 3 Months
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredAttendance.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No attendance records found for the selected date range.
              </div>
            ) : (
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead className="w-[100px]">Day</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead className="w-[100px]">Time</TableHead>
                      <TableHead className="w-[100px] text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRecords.map((record, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-sm">
                          {format(new Date(record.date), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {record.day}
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          {record.subject}
                        </TableCell>
                        <TableCell className="text-sm">
                          <Badge variant="outline" className="text-xs">
                            {record.batch}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {record.time}
                        </TableCell>
                        <TableCell className="text-center">
                          {record.status === 'Present' ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <Badge variant="default" className="text-xs bg-green-600">
                                Present
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-1.5">
                              <XCircle className="w-4 h-4 text-red-600" />
                              <Badge variant="destructive" className="text-xs">
                                Absent
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
