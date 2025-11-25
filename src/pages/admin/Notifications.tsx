import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, AlertCircle, CheckCircle2, Clock, Users, IndianRupee, FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const mockNotifications = [
  { id: '1', type: 'payment', icon: IndianRupee, message: 'Fee payment received: ₹3,000 from Amit Sharma', time: '3 hours ago', read: false, link: '/admin/finance' },
  { id: '2', type: 'leave', icon: FileText, message: 'John Doe submitted leave request', time: '2 hours ago', read: false, link: '/admin/teachers' },
  { id: '3', type: 'registration', icon: Users, message: 'New student registered: Sarah Khan', time: '1 day ago', read: false, link: '/admin/students' },
  { id: '4', type: 'assignment', icon: FileText, message: 'Teacher Priya Sharma posted new assignment', time: '5 hours ago', read: true, link: '/admin/schedule' },
  { id: '5', type: 'system', icon: CheckCircle2, message: 'Backup completed successfully', time: '1 day ago', read: true, link: '/admin/settings' },
  { id: '6', type: 'alert', icon: AlertCircle, message: 'SMS credits low: 500 remaining', time: '2 days ago', read: true, link: '/admin/settings' },
  { id: '7', type: 'exam', icon: Calendar, message: 'Exam schedule published for Grade 10', time: '3 days ago', read: true, link: '/admin/schedule' },
  { id: '8', type: 'attendance', icon: AlertCircle, message: '15 students with attendance <75%', time: '4 hours ago', read: false, link: '/admin/attendance' },
  { id: '9', type: 'fees', icon: IndianRupee, message: '8 students with fees overdue >30 days', time: '5 hours ago', read: false, link: '/admin/finance' },
];

const mockSystemNotifications = [
  { id: '1', type: 'success', message: 'Database backup completed successfully', time: '2024-11-20 02:00 AM' },
  { id: '2', type: 'warning', message: 'SMS credits low: 500 remaining. Please recharge.', time: '2024-11-19 10:30 AM' },
  { id: '3', type: 'info', message: 'Database storage: 85% used', time: '2024-11-18 09:00 AM' },
];

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground mt-1">View all system notifications and updates</p>
            </div>
            <Button onClick={() => toast.success('All notifications marked as read')} size="sm">
              Mark All as Read
            </Button>
          </div>
        </div>

        {/* Notification Feed */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="w-4 h-4" />
                All Notifications
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                    <SelectItem value="leave">Leave Requests</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search..." className="w-full sm:flex-1" />
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
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}
                    onClick={() => navigate(notification.link)}
                  >
                    <div className={`p-1.5 rounded-full flex-shrink-0 ${!notification.read ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Icon className={`w-4 h-4 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(notification.link);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="w-4 h-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockSystemNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-1.5 rounded-full flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-secondary/10' :
                    notification.type === 'warning' ? 'bg-amber-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    {notification.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    ) : notification.type === 'warning' ? (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Bell className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
                  </div>
                  {notification.type === 'warning' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs flex-shrink-0"
                      onClick={() => navigate('/admin/settings')}
                    >
                      View
                    </Button>
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
