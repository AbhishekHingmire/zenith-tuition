import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, AlertCircle, CheckCircle2, Clock, Users, IndianRupee, FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const mockAlerts = [
  { id: '1', type: 'leave', title: 'Leave Requests Pending', count: 3, priority: 'high', action: 'Review Now' },
  { id: '2', type: 'registration', title: 'Student Registrations', count: 2, priority: 'medium', action: 'Review Now' },
  { id: '3', type: 'attendance', title: 'Low Attendance Students', count: 15, priority: 'high', action: 'Take Action' },
  { id: '4', type: 'fees', title: 'Fees Overdue >30 Days', count: 8, priority: 'critical', action: 'Take Action' },
  { id: '5', type: 'marking', title: "Teachers Haven't Marked Attendance", count: 3, priority: 'medium', action: 'Take Action' },
];

const mockNotifications = [
  { id: '1', type: 'payment', icon: IndianRupee, message: 'Fee payment received: ₹3,000 from Amit Sharma', time: '3 hours ago', read: false },
  { id: '2', type: 'leave', icon: FileText, message: 'John Doe submitted leave request', time: '2 hours ago', read: false },
  { id: '3', type: 'registration', icon: Users, message: 'New student registered: Sarah Khan', time: '1 day ago', read: false },
  { id: '4', type: 'assignment', icon: FileText, message: 'Teacher Priya Sharma posted new assignment', time: '5 hours ago', read: true },
  { id: '5', type: 'system', icon: CheckCircle2, message: 'Backup completed successfully', time: '1 day ago', read: true },
  { id: '6', type: 'alert', icon: AlertCircle, message: 'SMS credits low: 500 remaining', time: '2 days ago', read: true },
  { id: '7', type: 'exam', icon: Calendar, message: 'Exam schedule published for Grade 10', time: '3 days ago', read: true },
];

const mockSystemNotifications = [
  { id: '1', type: 'success', message: 'Database backup completed successfully', time: '2024-11-20 02:00 AM' },
  { id: '2', type: 'warning', message: 'SMS credits low: 500 remaining. Please recharge.', time: '2024-11-19 10:30 AM' },
  { id: '3', type: 'info', message: 'Database storage: 85% used', time: '2024-11-18 09:00 AM' },
];

export default function Notifications() {
  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'bg-destructive text-destructive-foreground',
      high: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      medium: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      low: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Notifications & Alerts Center</h1>
            <p className="text-muted-foreground mt-1">Stay updated with important system events</p>
          </div>
          <Button onClick={() => toast.success('All notifications marked as read')}>
            Mark All as Read
          </Button>
        </div>

        {/* Alerts Panel */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Critical Alerts Requiring Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAlerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-2xl font-bold text-primary">{alert.count}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{alert.title}</h3>
                  <Button variant="outline" className="w-full" size="sm">
                    {alert.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notification Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Feed
              </CardTitle>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                    <SelectItem value="leave">Leave Requests</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search notifications..." className="w-[200px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div 
                    key={notification.id} 
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50 ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}
                  >
                    <div className={`p-2 rounded-full ${!notification.read ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Icon className={`w-5 h-5 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              System Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSystemNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'success' ? 'bg-secondary/10' :
                    notification.type === 'warning' ? 'bg-amber-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    {notification.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    ) : notification.type === 'warning' ? (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Bell className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {notification.type === 'warning' && (
                    <Button variant="outline" size="sm">View Details</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
