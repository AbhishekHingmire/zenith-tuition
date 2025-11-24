import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import StudentDashboard from "./pages/StudentDashboard";
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
import AdminMessages from "./pages/admin/Messages";

// Teacher pages
import TeacherSchedule from "./pages/teacher/Schedule";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherPerformance from "./pages/teacher/Performance";
import TeacherSettings from "./pages/teacher/Settings";
import ExamResults from "./pages/teacher/ExamResults";
import TeacherMessages from "./pages/teacher/Messages";

// Admin detail pages
import StudentDetail from "./pages/admin/StudentDetail";

// Parent pages
import ParentAttendance from "./pages/parent/Attendance";
import ParentReports from "./pages/parent/Reports";
import ParentFees from "./pages/parent/Fees";
import ParentAssignments from "./pages/parent/Assignments";
import ParentSettings from "./pages/parent/Settings";
import ParentMessages from "./pages/parent/Messages";
import ParentLeaveRequest from "./pages/parent/LeaveRequest";

// Student pages
import StudentSchedule from "./pages/student/Schedule";
import StudentAssignments from "./pages/student/Assignments";
import StudentExams from "./pages/student/Exams";
import StudentAttendance from "./pages/student/Attendance";
import StudentSettings from "./pages/student/Settings";
import StudentMessages from "./pages/student/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
              path="/admin/messages"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminMessages />
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
              path="/teacher/messages"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherMessages />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/parent/dashboard"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/attendance"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/reports"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/fees"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentFees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/assignments"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/settings"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/messages"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentMessages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/leave-request"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentLeaveRequest />
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
              path="/student/messages"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentMessages />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
