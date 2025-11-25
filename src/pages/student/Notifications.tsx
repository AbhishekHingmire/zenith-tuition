import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  type: 'assignment' | 'exam' | 'attendance' | 'announcement' | 'grade';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'New Assignment Posted',
    message: 'Math homework due on Friday, January 5th',
    timestamp: '2 hours ago',
    isRead: false,
    actionLabel: 'View Assignment',
    actionUrl: '/student/assignments'
  },
  {
    id: '2',
    type: 'exam',
    title: 'Exam Results Published',
    message: 'Your Science exam results are now available',
    timestamp: '5 hours ago',
    isRead: false,
    actionLabel: 'View Results',
    actionUrl: '/student/exams'
  },
  {
    id: '3',
    type: 'attendance',
    title: 'Attendance Alert',
    message: 'Your attendance is below 75%. Please improve.',
    timestamp: '1 day ago',
    isRead: true
  },
  {
    id: '4',
    type: 'announcement',
    title: 'School Holiday',
    message: 'School will be closed on January 26th for Republic Day',
    timestamp: '2 days ago',
    isRead: true
  },
  {
    id: '5',
    type: 'grade',
    title: 'Assignment Graded',
    message: 'Your English essay has been graded: 85/100',
    timestamp: '3 days ago',
    isRead: true,
    actionLabel: 'View Feedback',
    actionUrl: '/student/assignments'
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'assignment':
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    case 'exam':
      return <Bell className="w-5 h-5 text-blue-500" />;
    case 'attendance':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case 'announcement':
      return <MessageSquare className="w-5 h-5 text-indigo-500" />;
    case 'grade':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

export default function StudentNotifications() {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with important alerts
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm">
              {unreadCount} new
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                All Notifications
              </CardTitle>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-border">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-accent/50 transition-colors ${
                      !notification.isRead ? 'bg-accent/20' : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        {notification.actionLabel && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (notification.actionUrl) {
                                window.location.href = notification.actionUrl;
                              }
                            }}
                          >
                            {notification.actionLabel}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Need to Contact Your Teacher?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For direct communication with your teachers, please use WhatsApp.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Math Teacher - Mr. Sharma</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
                <Button
                  onClick={() => window.open('https://wa.me/919876543210?text=Hello', '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Chat on WhatsApp
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Science Teacher - Ms. Patel</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43211</p>
                </div>
                <Button
                  onClick={() => window.open('https://wa.me/919876543211?text=Hello', '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
