import { Home, Calendar, ClipboardList, Grid } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface BottomTabBarProps {
  onMoreClick: () => void;
}

interface TabItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

export const BottomTabBar = ({ onMoreClick }: BottomTabBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const getTabItems = (role: string): TabItem[] => {
    switch (role) {
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
          { icon: Calendar, label: 'Calendar', path: '/admin/calendar' },
          { icon: ClipboardList, label: 'Students', path: '/admin/students' },
        ];
      case 'teacher':
        return [
          { icon: Home, label: 'Dashboard', path: '/teacher/dashboard' },
          { icon: Calendar, label: 'Schedule', path: '/teacher/schedule' },
          { icon: ClipboardList, label: 'Assignments', path: '/teacher/assignments', badge: 5 },
        ];
      case 'parent':
        return [
          { icon: Home, label: 'Dashboard', path: '/parent/dashboard' },
          { icon: Calendar, label: 'Attendance', path: '/parent/attendance' },
          { icon: ClipboardList, label: 'Assignments', path: '/parent/assignments' },
        ];
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
          { icon: Calendar, label: 'Schedule', path: '/student/schedule' },
          { icon: ClipboardList, label: 'Assignments', path: '/student/assignments', badge: 3 },
        ];
      default:
        return [];
    }
  };

  const tabItems = user ? getTabItems(user.role) : [];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="flex items-center justify-around px-1 py-2 safe-area-bottom max-w-full overflow-x-auto">
        {tabItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg transition-all min-h-[44px] min-w-[60px] flex-1 max-w-[80px] relative touch-manipulation",
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
        
        {/* More button */}
        <button
          onClick={onMoreClick}
          className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg transition-all min-h-[44px] min-w-[60px] flex-1 max-w-[80px] text-muted-foreground hover:text-foreground hover:bg-muted/50 touch-manipulation"
        >
          <Grid className="w-5 h-5 flex-shrink-0" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
};