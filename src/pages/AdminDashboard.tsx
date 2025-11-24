import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, IndianRupee, TrendingUp, TrendingDown, UserPlus, ClipboardCheck, Bell, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const stats = [
  {
    title: 'Total Students',
    value: '248',
    change: '+12%',
    trend: 'up' as const,
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Total Teachers',
    value: '18',
    change: '+2',
    trend: 'up' as const,
    icon: GraduationCap,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    title: "Today's Attendance",
    value: '94%',
    change: '-2%',
    trend: 'down' as const,
    icon: ClipboardCheck,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    title: 'Fee Collection',
    value: '₹4.2L',
    change: '85%',
    trend: 'up' as const,
    icon: IndianRupee,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
];

const recentActivities = [
  { action: 'New student enrolled', name: 'Rahul Kumar', time: '5 mins ago', icon: UserPlus },
  { action: 'Fee payment received', name: 'Class 10-A', time: '12 mins ago', icon: IndianRupee },
  { action: 'Attendance marked', name: 'Mathematics Batch', time: '25 mins ago', icon: ClipboardCheck },
  { action: 'New announcement posted', name: 'Holiday Notice', time: '1 hour ago', icon: Bell },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleQuickAction = (label: string) => {
    switch (label) {
      case 'Add Student':
        navigate('/admin/students');
        toast.info('Opening Students page to add a new student');
        break;
      case 'Mark Attendance':
        navigate('/admin/attendance');
        toast.info('Opening Attendance page');
        break;
      case 'Send Announcement':
        toast.info('Announcement feature coming soon');
        break;
      case 'View Reports':
        navigate('/admin/reports');
        toast.info('Opening Reports page');
        break;
    }
  };

  const quickActions = [
    { label: 'Add Student', icon: UserPlus, color: 'bg-primary hover:bg-primary/90', action: () => handleQuickAction('Add Student') },
    { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-secondary hover:bg-secondary/90', action: () => handleQuickAction('Mark Attendance') },
    { label: 'Send Announcement', icon: Bell, color: 'bg-accent hover:bg-accent/90', action: () => handleQuickAction('Send Announcement') },
    { label: 'View Reports', icon: FileText, color: 'bg-muted hover:bg-muted/90 text-foreground', action: () => handleQuickAction('View Reports') },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-secondary mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                      )}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-secondary' : 'text-destructive'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    onClick={action.action}
                    className={`w-full justify-start ${action.color}`}
                  >
                    <action.icon className="w-5 h-5 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Chart will be implemented with Recharts</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
