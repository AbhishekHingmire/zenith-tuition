import { Home, Calendar, ClipboardList, MessageCircle, Grid } from "lucide-react";
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
          { icon: Calendar, label: 'Batches', path: '/admin/batches' },
          { icon: ClipboardList, label: 'Students', path: '/admin/students' },
          { icon: MessageCircle, label: 'Messages', path: '/admin/messages', badge: 3 },
        ];
      case 'teacher':
        return [
          { icon: Home, label: 'Dashboard', path: '/teacher/dashboard' },
          { icon: Calendar, label: 'Schedule', path: '/teacher/schedule' },
          { icon: ClipboardList, label: 'Assignments', path: '/teacher/assignments', badge: 5 },
          { icon: MessageCircle, label: 'Messages', path: '/teacher/messages', badge: 2 },
        ];
      case 'parent':
        return [
          { icon: Home, label: 'Dashboard', path: '/parent/dashboard' },
          { icon: Calendar, label: 'Attendance', path: '/parent/attendance' },
          { icon: ClipboardList, label: 'Assignments', path: '/parent/assignments' },
          { icon: MessageCircle, label: 'Messages', path: '/parent/messages', badge: 1 },
        ];
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
          { icon: Calendar, label: 'Schedule', path: '/student/schedule' },
          { icon: ClipboardList, label: 'Assignments', path: '/student/assignments', badge: 3 },
          { icon: MessageCircle, label: 'Messages', path: '/student/messages' },
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {tabItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex-1 max-w-[80px] relative touch-manipulation",
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
        
        {/* More button */}
        <button
          onClick={onMoreClick}
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex-1 max-w-[80px] text-muted-foreground hover:text-foreground hover:bg-muted/50 touch-manipulation"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
};