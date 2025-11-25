import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Users, GraduationCap, IndianRupee, TrendingUp, TrendingDown, UserPlus, 
  ClipboardCheck, Bell, FileText, AlertTriangle, X, DollarSign, 
  Calendar, Award, Activity, Server, Database, Smartphone, CheckCircle2,
  MessageCircle, Clock, ArrowRight, UserCheck, BookOpen, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { InsightCard } from '@/components/ui/insight-card';
import { insights, predictions } from '@/data/comprehensiveMockData';

// Mock data for charts
const attendanceData = [
  { date: 'Mar 9', percentage: 88 },
  { date: 'Mar 10', percentage: 92 },
  { date: 'Mar 11', percentage: 85 },
  { date: 'Mar 12', percentage: 94 },
  { date: 'Mar 13', percentage: 91 },
  { date: 'Mar 14', percentage: 89 },
  { date: 'Mar 15', percentage: 93 },
];

const feeCollectionData = [
  { month: 'Oct', collected: 420000, pending: 80000, overdue: 20000 },
  { month: 'Nov', collected: 450000, pending: 70000, overdue: 30000 },
  { month: 'Dec', collected: 410000, pending: 90000, overdue: 25000 },
  { month: 'Jan', collected: 480000, pending: 60000, overdue: 35000 },
  { month: 'Feb', collected: 500000, pending: 50000, overdue: 20000 },
  { month: 'Mar', collected: 480000, pending: 190000, overdue: 80000 },
];

const upcomingEvents = [
  { id: 1, title: 'Grade 10 Math Exam', days: 0, color: 'text-destructive', type: 'exam' },
  { id: 2, title: 'Parent-Teacher Meeting', days: 3, color: 'text-secondary', type: 'meeting' },
  { id: 3, title: 'Fee Due Date', days: 5, color: 'text-accent', type: 'fee' },
  { id: 4, title: 'School Holiday - Holi', days: 7, color: 'text-primary', type: 'holiday' },
];

const performanceSnapshots = [
  { title: 'Top Batch', value: 'Grade 10 Science', metric: '85% avg', icon: Award, color: 'bg-primary/10 text-primary' },
  { title: 'Top Teacher', value: 'Priya Sharma', metric: '4.8/5 rating', icon: UserCheck, color: 'bg-secondary/10 text-secondary' },
  { title: 'Most Improved', value: 'Rahul Kumar', metric: '+20% in Math', icon: TrendingUp, color: 'bg-accent/10 text-accent' },
  { title: 'Perfect Attendance', value: '45 Students', metric: 'This month', icon: CheckCircle2, color: 'bg-destructive/10 text-destructive' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);
  const [financialView, setFinancialView] = useState<'month' | 'quarter' | 'year'>('month');

  const criticalAlerts = [
    { id: 'alert1', type: 'critical', message: '8 students with fees overdue >30 days', action: 'Review Now', link: '/admin/fees' },
    { id: 'alert2', type: 'warning', message: "3 teachers haven't marked attendance today", action: 'Check', link: '/admin/attendance' },
    { id: 'alert3', type: 'info', message: '15 new messages from parents', action: 'View', link: '/admin/notifications' },
  ].filter(alert => !dismissedAlerts.includes(alert.id));

  const stats = [
    {
      title: 'Total Students',
      value: '250',
      change: '+15 this month',
      trend: 'up' as const,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      details: 'Active: 248 | Inactive: 2',
      action: () => navigate('/admin/students'),
    },
    {
      title: 'Total Teachers',
      value: '12',
      change: 'On leave today: 1',
      trend: 'up' as const,
      icon: GraduationCap,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      details: 'View Schedule',
      action: () => navigate('/admin/teachers'),
    },
    {
      title: "Today's Attendance",
      value: '92%',
      change: '230/250 present',
      trend: 'up' as const,
      icon: ClipboardCheck,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      details: 'View Absentees',
      action: () => navigate('/admin/attendance'),
    },
    {
      title: 'Fee Collection',
      value: '₹4.8L',
      change: '64% of ₹7.5L target',
      trend: 'up' as const,
      icon: IndianRupee,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      details: 'Pending: ₹2.7L',
      action: () => navigate('/admin/fees'),
    },
  ];

  const recentActivities = [
    { 
      id: 1, action: 'Student enrolled', name: 'Rahul Kumar enrolled in Grade 9 Math', 
      time: '5 mins ago', icon: UserPlus, color: 'text-primary', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      type: 'admissions'
    },
    { 
      id: 2, action: 'Payment received', name: '₹3,000 from Parent: Amit Sharma', 
      time: '25 mins ago', icon: IndianRupee, color: 'text-secondary',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
      type: 'payments'
    },
    { 
      id: 3, action: 'Attendance marked', name: 'Teacher Priya marked Grade 8 attendance', 
      time: '1 hour ago', icon: ClipboardCheck, color: 'text-accent',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      type: 'attendance'
    },
    { 
      id: 4, action: 'Assignment posted', name: 'Teacher Vikram posted new Math assignment', 
      time: '2 hours ago', icon: FileText, color: 'text-primary',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
      type: 'attendance'
    },
    { 
      id: 5, action: 'Leave request', name: 'Teacher Neha requested leave for 15th June', 
      time: '3 hours ago', icon: Bell, color: 'text-destructive',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
      type: 'leaves'
    },
    { 
      id: 6, action: 'Message received', name: 'New message from Parent: Sunita Devi', 
      time: '4 hours ago', icon: MessageCircle, color: 'text-secondary',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
      type: 'messages'
    },
  ];

  const pendingTasks = [
    { id: 1, task: '3 leave requests pending approval', checked: false, link: '/admin/teachers' },
    { id: 2, task: '2 student registrations need verification', checked: false, link: '/admin/admissions' },
    { id: 3, task: 'Review 5 students with attendance <75%', checked: false, link: '/admin/students' },
    { id: 4, task: 'Follow up with 8 fee defaulters', checked: false, link: '/admin/fees' },
  ];

  const quickActions = [
    { label: 'Add Student', icon: UserPlus, color: 'bg-primary hover:bg-primary/90', action: () => navigate('/admin/students') },
    { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-secondary hover:bg-secondary/90', action: () => navigate('/admin/attendance') },
    { label: 'Record Payment', icon: IndianRupee, color: 'bg-accent hover:bg-accent/90', action: () => navigate('/admin/fees') },
    { label: 'Send Announcement', icon: Bell, color: 'bg-destructive hover:bg-destructive/90', action: () => toast.info('Announcement feature coming soon') },
    { label: 'Generate Report', icon: FileText, color: 'bg-primary hover:bg-primary/90', action: () => navigate('/admin/reports') },
    { label: 'System Settings', icon: Activity, color: 'bg-muted hover:bg-muted/90 text-foreground', action: () => navigate('/admin/system-settings') },
  ];

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
    toast.success('Alert dismissed');
  };

  const handleDismissInsight = (insightId: string) => {
    setDismissedInsights([...dismissedInsights, insightId]);
  };

  const activeInsights = insights.admin.filter(
    insight => !dismissedInsights.includes(insight.id)
  );

  return (
    <MainLayout>
      <div className="space-y-3">
        {/* Priority Alerts Banner */}
        {criticalAlerts.length > 0 && (
          <div className="space-y-2">
            {criticalAlerts.map((alert) => (
              <Card 
                key={alert.id}
                className={`border-l-4 ${
                  alert.type === 'critical' ? 'border-l-destructive bg-destructive/5' :
                  alert.type === 'warning' ? 'border-l-accent bg-accent/5' :
                  'border-l-primary bg-primary/5'
                }`}
              >
                <CardContent className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <AlertTriangle className={`h-4 w-4 flex-shrink-0 ${
                      alert.type === 'critical' ? 'text-destructive' :
                      alert.type === 'warning' ? 'text-accent' :
                      'text-primary'
                    }`} />
                    <p className="text-sm font-medium truncate">{alert.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs hover-scale"
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
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* AI Insights Section */}
        {activeInsights.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Target className="w-4 h-4" />
              AI-Powered Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  type={insight.type as any}
                  icon={insight.icon}
                  title={insight.title}
                  message={insight.message}
                  action={insight.action}
                  onActionClick={() => navigate(insight.link)}
                  onDismiss={() => handleDismissInsight(insight.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Predictions Section */}
        <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4" />
              ML-Powered Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {predictions.admin.map((prediction) => (
                <div key={prediction.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium">{prediction.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{prediction.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <Card 
              key={stat.title} 
              className="cursor-pointer hover:shadow-md transition-all hover-scale"
              onClick={stat.action}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-secondary mr-1" />
                      <span className="text-xs text-secondary">{stat.change}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{stat.details}</p>
                  </div>
                  <div className={`${stat.bgColor} p-2 rounded-lg flex-shrink-0`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Financial Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Financial Summary</CardTitle>
              <Tabs value={financialView} onValueChange={(v) => setFinancialView(v as any)} className="w-auto">
                <TabsList className="h-7">
                  <TabsTrigger value="month" className="text-xs px-2 h-6">Month</TabsTrigger>
                  <TabsTrigger value="quarter" className="text-xs px-2 h-6">Quarter</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs px-2 h-6">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-2 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-bold text-secondary">₹6,50,000</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Expenses</span>
                  <span className="font-bold text-destructive">₹4,70,000</span>
                </div>
                <Progress value={55} className="h-2" />
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Current Profit</p>
                <p className="text-lg font-bold text-secondary">₹1,80,000</p>
              </div>
              <Badge variant="secondary" className="text-xs">Safe</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full h-8 text-xs hover-scale" onClick={() => navigate('/admin/finance')}>
              View Detailed Report
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Recent Activity Feed */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">All</Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Admissions</Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Payments</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[300px] pr-3">
                <div className="space-y-2">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="relative flex-shrink-0">
                        <img src={activity.avatar} alt="" className="w-8 h-8 rounded-full" />
                        <div className={`absolute -bottom-1 -right-1 ${activity.color.replace('text-', 'bg-')} p-0.5 rounded-full`}>
                          <activity.icon className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{activity.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions & Pending Tasks */}
          <div className="space-y-3">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      onClick={action.action}
                      className={`h-auto py-3 flex-col hover-scale ${action.color}`}
                      size="sm"
                    >
                      <action.icon className="w-5 h-5 mb-1" />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer" onClick={() => navigate(task.link)}>
                      <input type="checkbox" className="mt-0.5" />
                      <span className="text-xs flex-1">{task.task}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Attendance Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Attendance Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="percentage" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Fee Collection Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Fee Collection (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={feeCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="collected" stackId="a" fill="hsl(var(--secondary))" />
                  <Bar dataKey="pending" stackId="a" fill="hsl(var(--accent))" />
                  <Bar dataKey="overdue" stackId="a" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Upcoming Events (Next 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex flex-col items-center justify-center">
                      <p className="text-lg font-bold">{event.days === 0 ? 'Today' : `${event.days}d`}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${event.color}`}>{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.days === 0 ? 'Today' : `In ${event.days} day${event.days > 1 ? 's' : ''}`}
                      </p>
                    </div>
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3 h-7 text-xs hover-scale" onClick={() => navigate('/admin/calendar')}>
                View Full Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Performance Snapshot */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Performance Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {performanceSnapshots.map((snapshot, index) => (
                  <div key={index} className={`${snapshot.color} p-3 rounded-lg`}>
                    <snapshot.icon className="w-5 h-5 mb-2" />
                    <p className="text-xs font-medium mb-1">{snapshot.title}</p>
                    <p className="text-sm font-bold truncate">{snapshot.value}</p>
                    <p className="text-xs opacity-80 mt-1">{snapshot.metric}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health Indicators */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Health</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <div>
                  <p className="text-xs text-muted-foreground">Server Status</p>
                  <p className="text-sm font-medium">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Backup</p>
                  <p className="text-sm font-medium">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">SMS Credits</p>
                  <p className="text-sm font-medium">4,500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                  <p className="text-sm font-medium">45 online</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
