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
  BarChart3
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
        { icon: Calendar, label: "Attendance", path: "/admin/attendance" },
        { icon: FileText, label: "Exams", path: "/admin/exams" },
        { icon: IndianRupee, label: "Fees", path: "/admin/fees" },
        { icon: BarChart3, label: "Reports", path: "/admin/reports" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
      ];
    case 'teacher':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
        { icon: Calendar, label: "My Schedule", path: "/teacher/schedule" },
        { icon: FileText, label: "Exams", path: "/teacher/exams" },
        { icon: ClipboardList, label: "Attendance", path: "/teacher/attendance" },
        { icon: BookOpen, label: "Assignments", path: "/teacher/assignments" },
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
        { icon: Settings, label: "Settings", path: "/parent/settings" },
      ];
    case 'student':
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
        { icon: Calendar, label: "My Schedule", path: "/student/schedule" },
        { icon: BookOpen, label: "Assignments", path: "/student/assignments" },
        { icon: FileText, label: "Exams", path: "/student/exams" },
        { icon: Calendar, label: "Attendance", path: "/student/attendance" },
        { icon: Settings, label: "Settings", path: "/student/settings" },
      ];
    default:
      return [];
  }
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAuth();
  const menuItems = user ? getMenuItems(user.role) : [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-sidebar-foreground">EduManage</h1>
            <p className="text-xs text-muted-foreground">School System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-primary text-primary-foreground hover:bg-primary"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
