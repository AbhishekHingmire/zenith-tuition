import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Users, GraduationCap, IndianRupee, ClipboardCheck, 
  AlertTriangle, X, UserPlus, Calendar, FileText, Bell, TrendingUp, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [activityOpen, setActivityOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(true);

  const criticalAlerts = [
    { id: 'alert1', type: 'critical', message: '8 students with fees overdue >30 days', action: 'Review', link: '/admin/finance' },
    { id: 'alert2', type: 'warning', message: "3 teachers haven't marked attendance today", action: 'Check', link: '/admin/attendance' },
  ].filter(alert => !dismissedAlerts.includes(alert.id));

  const stats = [
    {
      title: 'Total Students',
      value: '250',
      change: '+15 this month',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => navigate('/admin/students'),
    },
    {
      title: 'Total Faculty',
      value: '12',
      change: 'On leave: 1',
      icon: GraduationCap,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => navigate('/admin/teachers'),
    },
    {
      title: "Today's Attendance",
      value: '92%',
      change: '230/250 present',
      icon: ClipboardCheck,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/admin/attendance'),
    },
    {
      title: 'Fee Collection',
      value: '₹4.8L',
      change: '64% collected',
      icon: IndianRupee,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      action: () => navigate('/admin/finance'),
    },
  ];

  const quickActions = [
    { label: 'Add Student', icon: UserPlus, color: 'bg-primary', action: () => navigate('/admin/students') },
    { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-secondary', action: () => navigate('/admin/attendance') },
    { label: 'Manage Schedule', icon: Calendar, color: 'bg-accent', action: () => navigate('/admin/schedule') },
    { label: 'Generate Report', icon: FileText, color: 'bg-destructive', action: () => navigate('/admin/reports') },
  ];

  const recentActivities = [
    { id: 1, text: 'Rahul Kumar enrolled in Grade 10 Math', time: '5 mins ago', icon: UserPlus, color: 'text-primary' },
    { id: 2, text: '₹3,000 payment received from Amit Sharma', time: '25 mins ago', icon: IndianRupee, color: 'text-secondary' },
    { id: 3, text: 'Grade 8 attendance marked by Priya', time: '1 hour ago', icon: ClipboardCheck, color: 'text-accent' },
    { id: 4, text: 'Math assignment posted by Vikram', time: '2 hours ago', icon: FileText, color: 'text-muted-foreground' },
  ];

  const pendingTasks = [
    { id: 1, task: '3 leave requests pending approval', link: '/admin/teachers' },
    { id: 2, task: '2 student admissions need verification', link: '/admin/students' },
    { id: 3, task: '5 students with attendance <75%', link: '/admin/students' },
    { id: 4, task: '8 fee defaulters to follow up', link: '/admin/finance' },
  ];

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
    toast.success('Alert dismissed');
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
        </div>

        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <div className="space-y-2">
            {criticalAlerts.map((alert) => (
              <Card 
                key={alert.id}
                className={`border-l-4 ${
                  alert.type === 'critical' ? 'border-l-destructive bg-destructive/5' :
                  'border-l-accent bg-accent/5'
                }`}
              >
                <CardContent className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
                      alert.type === 'critical' ? 'text-destructive' : 'text-accent'
                    }`} />
                    <p className="text-sm font-medium truncate">{alert.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs"
                      onClick={() => navigate(alert.link)}
                    >
                      {alert.action}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => handleDismissAlert(alert.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <Card 
              key={stat.title} 
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={stat.action}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-secondary mr-1" />
                      <span className="text-xs text-secondary truncate">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-2 rounded-lg flex-shrink-0`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  onClick={action.action}
                  className={`${action.color} hover:opacity-90 h-auto py-3 flex-col gap-1`}
                >
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Activity - Collapsible */}
          <Collapsible open={activityOpen} onOpenChange={setActivityOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Recent Activity</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activityOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`p-1.5 rounded-full bg-muted flex-shrink-0`}>
                          <activity.icon className={`w-3.5 h-3.5 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{activity.text}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Pending Tasks - Collapsible */}
          <Collapsible open={tasksOpen} onOpenChange={setTasksOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      Pending Tasks
                      <Badge variant="secondary">{pendingTasks.length}</Badge>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${tasksOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {pendingTasks.map((task) => (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => navigate(task.link)}
                      >
                        <p className="text-sm flex-1 min-w-0 truncate">{task.task}</p>
                        <Button size="sm" variant="ghost" className="h-7 text-xs flex-shrink-0">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </MainLayout>
  );
}
