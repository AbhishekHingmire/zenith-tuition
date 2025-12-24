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
        { icon: GraduationCap, label: "Faculty", path: "/admin/teachers" },
        { icon: BookOpen, label: "Batches", path: "/admin/batches" },
        { icon: Calendar, label: "Timetable", path: "/admin/schedule" },
        { icon: ClipboardList, label: "Attendance", path: "/admin/attendance" },
        { icon: FileText, label: "Exams", path: "/admin/exams" },
        { icon: BookOpen, label: "Assignments", path: "/admin/assignments" },
        { icon: BookOpen, label: "Materials", path: "/admin/materials" },
        { icon: IndianRupee, label: "Finance", path: "/admin/finance" },
        { icon: BarChart3, label: "Reports", path: "/admin/reports" },
        { icon: MessageSquare, label: "Notifications", path: "/admin/notifications" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
      ];
    case 'teacher':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
        { icon: Calendar, label: "My Timetable", path: "/teacher/schedule" },
        { icon: FileText, label: "Exams", path: "/teacher/exams" },
        { icon: ClipboardList, label: "Attendance", path: "/teacher/attendance" },
        { icon: BookOpen, label: "Assignments", path: "/teacher/assignments" },
        { icon: BookOpen, label: "Materials", path: "/teacher/materials" },
        { icon: Calendar, label: "Leave", path: "/teacher/leave" },
        { icon: BarChart3, label: "Performance", path: "/teacher/performance" },
        { icon: Settings, label: "Settings", path: "/teacher/settings" },
      ];
    case 'student':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
        { icon: Calendar, label: "My Timetable", path: "/student/schedule" },
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
        {/* Header */}
        <div className="border-b border-sidebar-border">
          {/* Logo and close button */}
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">Zenith Coaching</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
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
