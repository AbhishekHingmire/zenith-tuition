import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Send, Calendar, BookOpen, AlertCircle, TrendingUp, Users, Clock, CheckCircle2, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Notifications() {
  // Monthly Notifications Settings
  const [monthlyAttendance, setMonthlyAttendance] = useState(true);
  const [monthlyMarks, setMonthlyMarks] = useState(true);
  const [monthlyFeeReminder, setMonthlyFeeReminder] = useState(true);
  const [monthlyProgress, setMonthlyProgress] = useState(true);
  
  // Daily Notifications
  const [dailyAttendance, setDailyAttendance] = useState(true);
  
  // Teacher Notifications
  const [teacherAttendanceReminder, setTeacherAttendanceReminder] = useState(true);
  const [teacherAssignmentDeadline, setTeacherAssignmentDeadline] = useState(true);
  const [teacherExamSchedule, setTeacherExamSchedule] = useState(true);
  
  // Student Notifications
  const [studentAssignments, setStudentAssignments] = useState(true);
  const [studentExams, setStudentExams] = useState(true);
  const [studentResults, setStudentResults] = useState(true);
  const [studentAttendanceAlert, setStudentAttendanceAlert] = useState(true);
  
  // Parent Notifications
  const [parentMonthlyReport, setParentMonthlyReport] = useState(true);
  const [parentAttendanceAlert, setParentAttendanceAlert] = useState(true);
  const [parentFeeReminder, setParentFeeReminder] = useState(true);
  const [parentExamNotification, setParentExamNotification] = useState(true);

  const handleSaveSettings = () => {
    toast.success('Notification settings saved successfully!');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Notification Settings</h1>
              <p className="text-muted-foreground mt-1">Configure automated notifications for students, parents, and teachers</p>
            </div>
            <Button onClick={handleSaveSettings} size="sm">
              <Send className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Monthly Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Notifications
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Automated monthly reports sent to students and parents
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-attendance" className="font-medium cursor-pointer">
                      Monthly Attendance Report
                    </Label>
                    <p className="text-sm text-muted-foreground">Send attendance summary to parents</p>
                  </div>
                </div>
                <Switch 
                  id="monthly-attendance"
                  checked={monthlyAttendance}
                  onCheckedChange={setMonthlyAttendance}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-marks" className="font-medium cursor-pointer">
                      Monthly Marks Report
                    </Label>
                    <p className="text-sm text-muted-foreground">Send exam results and marks summary</p>
                  </div>
                </div>
                <Switch 
                  id="monthly-marks"
                  checked={monthlyMarks}
                  onCheckedChange={setMonthlyMarks}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-fee" className="font-medium cursor-pointer">
                      Monthly Fee Reminder
                    </Label>
                    <p className="text-sm text-muted-foreground">Remind parents about pending fees</p>
                  </div>
                </div>
                <Switch 
                  id="monthly-fee"
                  checked={monthlyFeeReminder}
                  onCheckedChange={setMonthlyFeeReminder}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-progress" className="font-medium cursor-pointer">
                      Monthly Progress Report
                    </Label>
                    <p className="text-sm text-muted-foreground">Overall student performance summary</p>
                  </div>
                </div>
                <Switch 
                  id="monthly-progress"
                  checked={monthlyProgress}
                  onCheckedChange={setMonthlyProgress}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Daily Notifications
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Daily automated notifications
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="daily-attendance" className="font-medium cursor-pointer">
                      Daily Attendance to Parents
                    </Label>
                    <p className="text-sm text-muted-foreground">Send daily attendance status via SMS/Email</p>
                  </div>
                </div>
                <Switch 
                  id="daily-attendance"
                  checked={dailyAttendance}
                  onCheckedChange={setDailyAttendance}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Teacher Notifications
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Reminders and alerts for teachers
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <Label htmlFor="teacher-attendance" className="font-medium cursor-pointer">
                      Mark Attendance Reminder
                    </Label>
                    <p className="text-sm text-muted-foreground">Daily reminder to mark attendance</p>
                  </div>
                </div>
                <Switch 
                  id="teacher-attendance"
                  checked={teacherAttendanceReminder}
                  onCheckedChange={setTeacherAttendanceReminder}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <Label htmlFor="teacher-assignment" className="font-medium cursor-pointer">
                      Assignment Deadline Reminder
                    </Label>
                    <p className="text-sm text-muted-foreground">Notify about upcoming assignment deadlines</p>
                  </div>
                </div>
                <Switch 
                  id="teacher-assignment"
                  checked={teacherAssignmentDeadline}
                  onCheckedChange={setTeacherAssignmentDeadline}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <Label htmlFor="teacher-exam" className="font-medium cursor-pointer">
                      Exam Schedule Notification
                    </Label>
                    <p className="text-sm text-muted-foreground">Alert about upcoming exams</p>
                  </div>
                </div>
                <Switch 
                  id="teacher-exam"
                  checked={teacherExamSchedule}
                  onCheckedChange={setTeacherExamSchedule}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Student Notifications
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Notifications sent directly to students
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="student-assignments" className="font-medium cursor-pointer">
                      New Assignments
                    </Label>
                    <p className="text-sm text-muted-foreground">Notify when new assignments are posted</p>
                  </div>
                </div>
                <Switch 
                  id="student-assignments"
                  checked={studentAssignments}
                  onCheckedChange={setStudentAssignments}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <Label htmlFor="student-exams" className="font-medium cursor-pointer">
                      Exam Schedules & Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">Alert about upcoming exams</p>
                  </div>
                </div>
                <Switch 
                  id="student-exams"
                  checked={studentExams}
                  onCheckedChange={setStudentExams}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <Label htmlFor="student-results" className="font-medium cursor-pointer">
                      Exam Results Published
                    </Label>
                    <p className="text-sm text-muted-foreground">Notify when results are available</p>
                  </div>
                </div>
                <Switch 
                  id="student-results"
                  checked={studentResults}
                  onCheckedChange={setStudentResults}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <Label htmlFor="student-attendance-alert" className="font-medium cursor-pointer">
                      Low Attendance Alert
                    </Label>
                    <p className="text-sm text-muted-foreground">Alert when attendance falls below 75%</p>
                  </div>
                </div>
                <Switch 
                  id="student-attendance-alert"
                  checked={studentAttendanceAlert}
                  onCheckedChange={setStudentAttendanceAlert}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Parent Notifications
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Keep parents informed about their child's progress
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="parent-monthly" className="font-medium cursor-pointer">
                      Monthly Progress Report
                    </Label>
                    <p className="text-sm text-muted-foreground">Detailed monthly performance report</p>
                  </div>
                </div>
                <Switch 
                  id="parent-monthly"
                  checked={parentMonthlyReport}
                  onCheckedChange={setParentMonthlyReport}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <Label htmlFor="parent-attendance" className="font-medium cursor-pointer">
                      Attendance Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Alert when child is absent or late</p>
                  </div>
                </div>
                <Switch 
                  id="parent-attendance"
                  checked={parentAttendanceAlert}
                  onCheckedChange={setParentAttendanceAlert}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <Label htmlFor="parent-fee" className="font-medium cursor-pointer">
                      Fee Payment Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">Remind about pending fee payments</p>
                  </div>
                </div>
                <Switch 
                  id="parent-fee"
                  checked={parentFeeReminder}
                  onCheckedChange={setParentFeeReminder}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <Label htmlFor="parent-exam" className="font-medium cursor-pointer">
                      Exam Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Notify about exams and results</p>
                  </div>
                </div>
                <Switch 
                  id="parent-exam"
                  checked={parentExamNotification}
                  onCheckedChange={setParentExamNotification}
                />
              </div>
            </div>
          </CardContent>
        </Card> 
      </div>
    </MainLayout>
  );
}
