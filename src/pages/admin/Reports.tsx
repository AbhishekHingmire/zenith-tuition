import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, TrendingUp, Users, IndianRupee, BookOpen, Calendar, FileText } from 'lucide-react';
import { mockStudents, mockTeachers, mockBatches } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function Reports() {
  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const totalBatches = mockBatches.length;
  const avgAttendance = 92;
  const totalRevenue = mockStudents.reduce((sum, s) => sum + (s.monthlyFee || 5000), 0);

  const reports = [
    {
      title: 'Student Enrollment Report',
      description: 'Complete details of all enrolled students',
      icon: Users,
      color: 'bg-primary/10 text-primary',
      category: 'Students',
    },
    {
      title: 'Attendance Summary',
      description: 'Monthly attendance statistics and trends',
      icon: Calendar,
      color: 'bg-secondary/10 text-secondary',
      category: 'Attendance',
    },
    {
      title: 'Fee Collection Report',
      description: 'Detailed fee payment and collection status',
      icon: IndianRupee,
      color: 'bg-amber-100 text-amber-700',
      category: 'Finance',
    },
    {
      title: 'Performance Analytics',
      description: 'Student academic performance and grades',
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-700',
      category: 'Academics',
    },
    {
      title: 'Teacher Performance',
      description: 'Teacher workload and performance metrics',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-700',
      category: 'Teachers',
    },
    {
      title: 'Batch-wise Analysis',
      description: 'Comprehensive batch-wise performance report',
      icon: FileText,
      color: 'bg-blue-100 text-blue-700',
      category: 'Batches',
    },
  ];

  const handleGenerateReport = (reportTitle: string) => {
    toast.success(`Generating ${reportTitle}...`);
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Comprehensive insights and data reports</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export All Reports
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Students</p>
                  <p className="text-lg sm:text-xl font-bold">{totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-secondary/10 p-1.5 rounded-lg">
                  <BookOpen className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Teachers</p>
                  <p className="text-lg sm:text-xl font-bold">{totalTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-accent/10 p-1.5 rounded-lg">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Batches</p>
                  <p className="text-lg sm:text-xl font-bold">{totalBatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-secondary/10 p-1.5 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className="text-lg sm:text-xl font-bold">{avgAttendance}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="bg-accent/10 p-1.5 rounded-lg">
                  <IndianRupee className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-lg sm:text-xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Available Reports</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4 hover:shadow-lg transition-shadow space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className={`${report.color} p-2 rounded-lg`}>
                      <report.icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-xs">{report.category}</Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{report.title}</h3>
                    <p className="text-xs text-muted-foreground">{report.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => handleGenerateReport(report.title)}
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Enrollment Trend (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-48 sm:h-56 flex items-center justify-center bg-muted/50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chart visualization coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                <div className="text-center">
                  <IndianRupee className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chart visualization coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
