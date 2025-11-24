import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  IndianRupee,
  Settings,
  GraduationCap,
  ClipboardList,
  BarChart3,
  X,
  UserCircle,
  LogOut,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const getMenuItems = (role: string) => {
  switch (role) {
    case 'admin':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
        { icon: Users, label: "Students", path: "/admin/students" },
        { icon: GraduationCap, label: "Teachers", path: "/admin/teachers" },
        { icon: BookOpen, label: "Batches", path: "/admin/batches" },
        { icon: Calendar, label: "Academic Year", path: "/admin/academic-year" },
        { icon: Calendar, label: "Calendar", path: "/admin/calendar" },
        { icon: BookOpen, label: "Subjects", path: "/admin/subjects" },
        { icon: Calendar, label: "Timetable", path: "/admin/timetable" },
        { icon: ClipboardList, label: "Attendance", path: "/admin/attendance" },
        { icon: FileText, label: "Exams", path: "/admin/exams" },
        { icon: IndianRupee, label: "Fees", path: "/admin/fees" },
        { icon: IndianRupee, label: "Finance", path: "/admin/finance" },
        { icon: FileText, label: "Certificates", path: "/admin/certificates" },
        { icon: Users, label: "Bulk Operations", path: "/admin/bulk-operations" },
        { icon: Users, label: "Admissions", path: "/admin/admissions" },
        { icon: BarChart3, label: "Reports", path: "/admin/reports" },
        { icon: MessageSquare, label: "Notifications", path: "/admin/notifications" },
        { icon: Settings, label: "Automation", path: "/admin/automation" },
        { icon: Users, label: "User Management", path: "/admin/user-management" },
        { icon: Settings, label: "System Settings", path: "/admin/system-settings" },
      ];
    case 'teacher':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
        { icon: Calendar, label: "My Schedule", path: "/teacher/schedule" },
        { icon: BookOpen, label: "Syllabus", path: "/teacher/syllabus" },
        { icon: FileText, label: "Exams", path: "/teacher/exams" },
        { icon: ClipboardList, label: "Attendance", path: "/teacher/attendance" },
        { icon: BookOpen, label: "Materials", path: "/teacher/materials" },
        { icon: Users, label: "Behavior", path: "/teacher/behavior" },
        { icon: Calendar, label: "Leave", path: "/teacher/leave" },
        { icon: Users, label: "Parent Communication", path: "/teacher/parent-communication" },
        { icon: Users, label: "PTM", path: "/teacher/ptm" },
        { icon: BarChart3, label: "Performance", path: "/teacher/performance" },
        { icon: Settings, label: "Settings", path: "/teacher/settings" },
      ];
    case 'parent':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/parent/dashboard" },
        { icon: Calendar, label: "Attendance", path: "/parent/attendance" },
        { icon: FileText, label: "Academic Reports", path: "/parent/reports" },
        { icon: IndianRupee, label: "Fees", path: "/parent/fees" },
        { icon: BookOpen, label: "Assignments", path: "/parent/assignments" },
        { icon: FileText, label: "Leave Request", path: "/parent/leave-request" },
        { icon: Settings, label: "Settings", path: "/parent/settings" },
      ];
    case 'student':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
        { icon: Calendar, label: "My Schedule", path: "/student/schedule" },
        { icon: BookOpen, label: "Assignments", path: "/student/assignments" },
        { icon: FileText, label: "Exams", path: "/student/exams" },
        { icon: FileText, label: "Study Materials", path: "/student/study-materials" },
        { icon: HelpCircle, label: "Doubts", path: "/student/doubts" },
        { icon: ClipboardList, label: "Attendance", path: "/student/attendance" },
        { icon: Settings, label: "Settings", path: "/student/settings" },
      ];
    default:
      return [];
  }
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const menuItems = user ? getMenuItems(user.role) : [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-80 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-30 lg:w-64 overflow-y-auto flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header with user profile */}
        <div className="border-b border-sidebar-border">
          {/* Logo and close button */}
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">EduManage</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          </div>

          {/* User profile section */}
          <div className="px-6 py-4 bg-sidebar-accent/30">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-primary-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role || 'Guest'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="px-3 mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Menu
            </p>
          </div>
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path.endsWith('/dashboard')}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors touch-manipulation min-h-[44px]"
                    activeClassName="bg-primary/10 text-primary font-medium border-l-4 border-primary"
                    onClick={() => {
                      // Close sidebar on mobile when a link is clicked
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout button at bottom */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors touch-manipulation min-h-[44px]"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
