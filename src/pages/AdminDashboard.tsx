import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, DollarSign, TrendingUp, TrendingDown, UserPlus, ClipboardCheck, Bell, FileText } from 'lucide-react';

const stats = [
  {
    title: 'Total Students',
    value: '248',
    change: '+12%',
    trend: 'up' as const,
    icon: Users,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Total Teachers',
    value: '18',
    change: '+2',
    trend: 'up' as const,
    icon: GraduationCap,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    title: "Today's Attendance",
    value: '94%',
    change: '-2%',
    trend: 'down' as const,
    icon: ClipboardCheck,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    title: 'Fee Collection',
    value: '₹4.2L',
    change: '85%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
];

const recentActivities = [
  { action: 'New student enrolled', name: 'Rahul Kumar', time: '5 mins ago', icon: UserPlus },
  { action: 'Fee payment received', name: 'Class 10-A', time: '12 mins ago', icon: DollarSign },
  { action: 'Attendance marked', name: 'Mathematics Batch', time: '25 mins ago', icon: ClipboardCheck },
  { action: 'New announcement posted', name: 'Holiday Notice', time: '1 hour ago', icon: Bell },
];

const quickActions = [
  { label: 'Add Student', icon: UserPlus, color: 'bg-indigo-600 hover:bg-indigo-700' },
  { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-emerald-600 hover:bg-emerald-700' },
  { label: 'Send Announcement', icon: Bell, color: 'bg-amber-600 hover:bg-amber-700' },
  { label: 'View Reports', icon: FileText, color: 'bg-purple-600 hover:bg-purple-700' },
];

export default function AdminDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
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
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <activity.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.name}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
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
                    className={`w-full justify-start ${action.color} text-white`}
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
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart will be implemented with Recharts</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
