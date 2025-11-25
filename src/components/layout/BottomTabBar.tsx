import { Home, Calendar, ClipboardList, MoreHorizontal, Bell, Users, BarChart3 } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
  const { user } = useAuth();
  
  const pendingTasks = 5;
  const unreadNotifications = 3;
  
  const getTabsForRole = () => {
    if (user?.role === 'admin') {
      return [
        { icon: Home, label: 'Home', to: '/admin/dashboard' },
        { icon: Users, label: 'Students', to: '/admin/students' },
        { icon: BarChart3, label: 'Reports', to: '/admin/reports' },
      ];
    }

    if (user?.role === 'teacher') {
      return [
        { icon: Home, label: 'Home', to: '/teacher/dashboard' },
        { icon: Calendar, label: 'Timetable', to: '/teacher/schedule' },
        { icon: ClipboardList, label: 'Assignments', to: '/teacher/assignments', badge: pendingTasks },
      ];
    }

    if (user?.role === 'student') {
      return [
        { icon: Home, label: 'Home', to: '/student/dashboard' },
        { icon: Calendar, label: 'Timetable', to: '/student/schedule' },
        { icon: ClipboardList, label: 'Assignments', to: '/student/assignments', badge: pendingTasks },
        { icon: Bell, label: 'Alerts', to: '/student/notifications', badge: unreadNotifications },
      ];
    }

    return [];
  };

  const tabs = getTabsForRole();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-40 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around h-14 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={cn(
              "relative flex flex-col items-center justify-center flex-1 h-full touch-manipulation transition-all duration-200",
              "min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground"
            )}
            activeClassName="!text-primary font-medium"
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <tab.icon className={cn(
                    "w-5 h-5 mb-0.5 transition-transform",
                    isActive && "scale-105"
                  )} />
                  {tab.badge && tab.badge > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-3.5 min-w-[14px] flex items-center justify-center text-[8px] px-0.5 py-0 animate-scale-in"
                    >
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-[11px] font-medium transition-all leading-tight">
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full animate-scale-in" />
                )}
              </>
            )}
          </NavLink>
        ))}
        
        <button
          onClick={onMoreClick}
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full transition-all duration-200",
            "text-muted-foreground hover:text-primary min-w-[44px] min-h-[44px]",
            "active:scale-95"
          )}
        >
          <MoreHorizontal className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium leading-tight">More</span>
        </button>
      </div>
    </nav>
  );
};