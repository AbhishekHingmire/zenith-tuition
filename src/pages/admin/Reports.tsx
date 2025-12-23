import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, TrendingUp, Users, IndianRupee, BookOpen, Calendar, FileText, Eye, Filter } from 'lucide-react';
import { mockStudents, mockTeachers, mockBatches } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Generate 12 months of dummy data
const generateMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => ({
    month,
    students: 45 + Math.floor(Math.random() * 20) + index * 2,
    revenue: 180000 + Math.floor(Math.random() * 50000) + index * 10000,
    attendance: 85 + Math.floor(Math.random() * 10),
    expenses: 120000 + Math.floor(Math.random() * 30000),
  }));
};

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-12-31');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  
  const monthlyData = generateMonthlyData();
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

  const generatePDFContent = (reportTitle: string) => {
    // Generate mock PDF content based on report type
    const reportData: Record<string, any> = {
      'Student Enrollment Report': {
        title: 'Student Enrollment Report',
        date: `${dateFrom} to ${dateTo}`,
        data: mockStudents.map(s => ({
          name: s.name,
          admissionNo: s.admissionNo,
          batch: s.batch,
          fee: `₹${s.monthlyFee || 5000}`,
          attendance: `${s.attendancePercentage}%`,
        })),
      },
      'Attendance Summary': {
        title: 'Attendance Summary',
        date: `${dateFrom} to ${dateTo}`,
        data: monthlyData.map(m => ({
          month: m.month,
          avgAttendance: `${m.attendance}%`,
          totalStudents: m.students,
        })),
      },
      'Fee Collection Report': {
        title: 'Fee Collection Report',
        date: `${dateFrom} to ${dateTo}`,
        data: monthlyData.map(m => ({
          month: m.month,
          revenue: `₹${(m.revenue / 1000).toFixed(0)}K`,
          expenses: `₹${(m.expenses / 1000).toFixed(0)}K`,
          profit: `₹${((m.revenue - m.expenses) / 1000).toFixed(0)}K`,
        })),
      },
      'Performance Analytics': {
        title: 'Performance Analytics',
        date: `${dateFrom} to ${dateTo}`,
        data: mockStudents.slice(0, 10).map(s => ({
          name: s.name,
          batch: s.batch,
          attendance: `${s.attendancePercentage}%`,
          avgMarks: '78%',
          grade: 'B+',
        })),
      },
      'Teacher Performance': {
        title: 'Teacher Performance',
        date: `${dateFrom} to ${dateTo}`,
        data: mockTeachers.map(t => ({
          name: t.name,
          subjects: t.subjects.join(', '),
          batches: t.assignedBatches?.length || 0,
          rating: '4.5/5',
        })),
      },
      'Batch-wise Analysis': {
        title: 'Batch-wise Analysis',
        date: `${dateFrom} to ${dateTo}`,
        data: mockBatches.map(b => ({
          name: b.name,
          students: mockStudents.filter(s => s.batch === b.name).length,
          avgAttendance: '88%',
          avgPerformance: '75%',
        })),
      },
    };
    return reportData[reportTitle] || { title: reportTitle, date: '', data: [] };
  };

  const handleViewReport = (reportTitle: string) => {
    setSelectedReport(reportTitle);
    setShowPdfDialog(true);
    toast.success(`Loading ${reportTitle}...`);
  };

  const handleDownloadReport = (reportTitle: string) => {
    const reportContent = generatePDFContent(reportTitle);
    // Simulate PDF download
    const blob = new Blob([JSON.stringify(reportContent, null, 2)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportTitle.replace(/\s+/g, '_')}_${dateFrom}_to_${dateTo}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${reportTitle}`);
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Comprehensive insights and data reports</p>
          </div>
        </div>

        {/* Date Range Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
              <div className="flex-1 w-full sm:w-auto">
                <Label htmlFor="dateFrom" className="text-xs mb-1.5 block">From Date</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="flex-1 w-full sm:w-auto">
                <Label htmlFor="dateTo" className="text-xs mb-1.5 block">To Date</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-9"
                />
              </div>
              <Button variant="outline" className="w-full sm:w-auto h-9">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>

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
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => handleViewReport(report.title)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => handleDownloadReport(report.title)}
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts with Real Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Student Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="students" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorStudents)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Attendance Percentage Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => `${value}%`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Monthly Profit Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'profit') {
                        const monthData = monthlyData.find(m => m.month === value);
                        return monthData ? `₹${((monthData.revenue - monthData.expenses) / 1000).toFixed(0)}K` : value;
                      }
                      return value;
                    }}
                  />
                  <Bar 
                    dataKey={(data) => data.revenue - data.expenses} 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    name="profit"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* PDF Viewer Dialog */}
        <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedReport}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedReport && (
                <div className="border border-border rounded-lg p-6 bg-card">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <div>
                        <h2 className="text-xl font-bold">{generatePDFContent(selectedReport).title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Period: {generatePDFContent(selectedReport).date}
                        </p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleDownloadReport(selectedReport)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            {generatePDFContent(selectedReport).data.length > 0 && 
                              Object.keys(generatePDFContent(selectedReport).data[0]).map((key) => (
                                <th key={key} className="text-left p-2 font-semibold capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </th>
                              ))
                            }
                          </tr>
                        </thead>
                        <tbody>
                          {generatePDFContent(selectedReport).data.map((row: any, index: number) => (
                            <tr key={index} className="border-b border-border hover:bg-muted/50">
                              {Object.values(row).map((value: any, i: number) => (
                                <td key={i} className="p-2">{value}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
