import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar, DollarSign, BookOpen, Bell, TrendingUp } from 'lucide-react';

export default function ParentDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your child's progress and activities.</p>
        </div>

        {/* Child Info Card */}
        <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Alex Student</h2>
                <p className="text-gray-600">Grade 10 • Admission No: STU-2024-001</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-gray-600">Class: Grade 10-A</span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">Roll No: 15</span>
                </div>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-xs text-emerald-600 mt-1">This Month</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fee Status</p>
                  <p className="text-2xl font-bold text-emerald-600">Paid</p>
                  <p className="text-xs text-gray-600 mt-1">Jan 2024</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-amber-600 mt-1">Pending</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Result</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5% from last
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Monthly calendar view will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          {/* Fee Details */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">January 2024</p>
                    <p className="text-sm text-gray-600">₹5,000</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-emerald-600 text-white rounded-full">Paid</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">February 2024</p>
                    <p className="text-sm text-gray-600">₹5,000</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-600 text-white rounded-full">Due: Feb 10</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Math - Algebra Problems', 'Science - Lab Report', 'English - Essay'].map((assignment, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">{assignment}</p>
                    <p className="text-sm text-gray-600 mt-1">Due: {['Tomorrow', 'In 2 days', 'In 3 days'][index]}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-amber-600" />
                Latest Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Parent-Teacher Meeting on Feb 15', 'Mid-term Exams Schedule Released', 'School Closed on Feb 20'].map((announcement, index) => (
                  <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-900">{announcement}</p>
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
