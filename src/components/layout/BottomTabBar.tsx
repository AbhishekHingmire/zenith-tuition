import { Home, Calendar, ClipboardList, MoreHorizontal, Bell } from 'lucide-react';
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
    const baseUrl = user?.role === 'admin' ? '/admin' 
      : user?.role === 'teacher' ? '/teacher'
      : '/student';

    if (user?.role === 'student') {
      return [
        { icon: Home, label: 'Home', to: `${baseUrl}/dashboard` },
        { icon: Calendar, label: 'Schedule', to: `${baseUrl}/schedule` },
        { icon: ClipboardList, label: 'Tasks', to: `${baseUrl}/assignments`, badge: pendingTasks },
        { icon: Bell, label: 'Alerts', to: `${baseUrl}/notifications`, badge: unreadNotifications },
      ];
    }

    return [
      { icon: Home, label: 'Home', to: `${baseUrl}/dashboard` },
      { icon: Calendar, label: 'Schedule', to: `${baseUrl}/schedule` },
      { icon: ClipboardList, label: 'Tasks', to: `${baseUrl}/assignments`, badge: pendingTasks },
    ];
  };

  const tabs = getTabsForRole();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-40 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={cn(
              "relative flex flex-col items-center justify-center flex-1 h-full touch-manipulation transition-all duration-200",
              "min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground"
            )}
            activeClassName="!text-primary scale-110 font-semibold"
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <tab.icon className={cn(
                    "w-6 h-6 mb-1 transition-transform",
                    isActive && "scale-110"
                  )} />
                  {tab.badge && tab.badge > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-2 h-5 min-w-[20px] flex items-center justify-center text-[10px] px-1 animate-scale-in"
                    >
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] font-medium transition-all">
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full animate-scale-in" />
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
          <MoreHorizontal className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </nav>
  );
};