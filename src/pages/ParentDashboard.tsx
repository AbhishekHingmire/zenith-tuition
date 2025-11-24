import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar, IndianRupee, BookOpen, Bell, TrendingUp } from 'lucide-react';
import { PerformanceAlertBanner } from '@/components/parent/PerformanceAlertBanner';
import { ComparisonWidget } from '@/components/parent/ComparisonWidget';
import { EventsCalendar } from '@/components/parent/EventsCalendar';
import { PTMBooking } from '@/components/parent/PTMBooking';
import {
  mockChild,
  mockPerformanceAlerts,
  mockComparisonMetrics,
  mockCalendarEvents,
  mockPTMSlots,
} from '@/data/mockParentData';

export default function ParentDashboard() {
  const child = mockChild;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your child's progress and activities</p>
        </div>

        {/* Performance Alerts */}
        <PerformanceAlertBanner alerts={mockPerformanceAlerts} />

        {/* Child Info Card */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {child.avatar ? (
                <img src={child.avatar} alt={child.name} className="w-20 h-20 rounded-full" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-foreground">{child.name}</h2>
                <p className="text-muted-foreground">
                  {child.grade} • Admission No: {child.admissionNumber}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <span>Class: {child.class}</span>
                  <span>•</span>
                  <span>Roll No: {child.rollNumber}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full sm:w-auto touch-manipulation min-h-[44px]">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-foreground">{child.attendance}%</p>
                  <p className="text-xs text-secondary mt-1">This Month</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fee Status</p>
                  <p className={`text-2xl font-bold ${
                    child.feeStatus === 'paid' ? 'text-secondary' : 
                    child.feeStatus === 'overdue' ? 'text-destructive' : 'text-accent'
                  }`}>
                    {child.feeStatus === 'paid' ? 'Paid' : child.feeStatus === 'overdue' ? 'Overdue' : 'Due'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Current Month</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  child.feeStatus === 'paid' ? 'bg-secondary/20' : 
                  child.feeStatus === 'overdue' ? 'bg-destructive/20' : 'bg-accent/20'
                }`}>
                  <IndianRupee className={`w-6 h-6 ${
                    child.feeStatus === 'paid' ? 'text-secondary' : 
                    child.feeStatus === 'overdue' ? 'text-destructive' : 'text-accent'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assignments</p>
                  <p className="text-2xl font-bold text-foreground">{child.pendingAssignments}</p>
                  <p className="text-xs text-accent mt-1">Pending</p>
                </div>
                <div className="bg-accent/20 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Result</p>
                  <p className="text-2xl font-bold text-foreground">{child.lastExamScore}%</p>
                  <p className="text-xs text-secondary mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{child.lastExamImprovement}% from last
                  </p>
                </div>
                <div className="bg-primary/20 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Widget and Events Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonWidget childName={child.name.split(' ')[0]} metrics={mockComparisonMetrics} />
          <EventsCalendar events={mockCalendarEvents} />
        </div>

        {/* PTM Booking */}
        <Card>
          <CardHeader>
            <CardTitle>Parent-Teacher Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <PTMBooking slots={mockPTMSlots} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Math - Algebra Problems', 'Science - Lab Report', 'English - Essay'].map((assignment, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <p className="font-medium text-foreground">{assignment}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Due: {['Tomorrow', 'In 2 days', 'In 3 days'][index]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-accent" />
                Latest Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Parent-Teacher Meeting on June 5',
                  'Mid-term Exams Schedule Released',
                  'Summer Break from May 28'
                ].map((announcement, index) => (
                  <div key={index} className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="text-sm text-foreground">{announcement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
