import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/student/Dashboard";
import Exams from "./pages/teacher/Exams";
import MarksEntry from "./pages/teacher/MarksEntry";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminStudents from "./pages/admin/Students";
import AdminTeachers from "./pages/admin/Teachers";
import AdminBatches from "./pages/admin/Batches";
import AdminAttendance from "./pages/admin/Attendance";
import AdminExams from "./pages/admin/Exams";
import AdminFees from "./pages/admin/Fees";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";
import AdminAcademicYear from "./pages/admin/AcademicYear";
import AdminCalendar from "./pages/admin/Calendar";
import AdminSubjects from "./pages/admin/Subjects";
import AdminTimetable from "./pages/admin/Timetable";
import AdminAutomation from "./pages/admin/Automation";
import AdminCertificates from "./pages/admin/Certificates";
import AdminFinance from "./pages/admin/Finance";
import AdminBulkOperations from "./pages/admin/BulkOperations";
import AdminUserManagement from "./pages/admin/UserManagement";
import AdminSystemSettings from "./pages/admin/SystemSettings";
import AdminNotifications from "./pages/admin/Notifications";
import AdminAdmissions from "./pages/admin/Admissions";

// Teacher pages
import TeacherSchedule from "./pages/teacher/Schedule";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherPerformance from "./pages/teacher/Performance";
import TeacherSettings from "./pages/teacher/Settings";
import ExamResults from "./pages/teacher/ExamResults";
import TeacherSyllabus from "./pages/teacher/Syllabus";
import TeacherSyllabusDetail from "./pages/teacher/SyllabusDetail";
import TeacherMaterials from "./pages/teacher/Materials";
import TeacherBehavior from "./pages/teacher/Behavior";
import TeacherLeave from "./pages/teacher/Leave";
import TeacherParentCommunication from "./pages/teacher/ParentCommunication";
import TeacherPTMScheduler from "./pages/teacher/PTMScheduler";

// Admin detail pages
import StudentDetail from "./pages/admin/StudentDetail";

// Student pages
import StudentSchedule from "./pages/student/Schedule";
import StudentAssignments from "./pages/student/Assignments";
import StudentExams from "./pages/student/Exams";
import StudentAttendance from "./pages/student/Attendance";
import StudentSettings from "./pages/student/Settings";
import StudentStudyMaterials from "./pages/student/StudyMaterials";
import StudentDoubts from "./pages/student/Doubts";
import StudentNotifications from "./pages/student/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminTeachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/batches"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminBatches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/attendance"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/exams"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminExams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/fees"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminFees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students/:id"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <StudentDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/academic-year"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAcademicYear />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/calendar"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCalendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subjects"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSubjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/timetable"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminTimetable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/automation"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAutomation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/certificates"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCertificates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/finance"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminFinance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bulk-operations"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminBulkOperations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user-management"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/system-settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSystemSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admissions"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAdmissions />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/schedule"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/exams"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <Exams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/exams/:examId/marks"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <MarksEntry />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/exams/:examId/results"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <ExamResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/assignments"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/performance"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherPerformance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/settings"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/syllabus"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherSyllabus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/syllabus/:id"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherSyllabusDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/materials"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherMaterials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/behavior"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherBehavior />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/leave"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherLeave />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/parent-communication"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherParentCommunication />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/ptm"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherPTMScheduler />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/schedule"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/assignments"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/exams"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentExams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/attendance"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/settings"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/study-materials"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentStudyMaterials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/doubts"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDoubts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/notifications"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentNotifications />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
