import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function FinanceReports() {
  const [reportType, setReportType] = useState('monthly');
  const [month, setMonth] = useState('march');

  const handleDownload = () => {
    toast.success('Financial report downloaded successfully');
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="yearly">Yearly Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Period</label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January 2024</SelectItem>
                  <SelectItem value="february">February 2024</SelectItem>
                  <SelectItem value="march">March 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium opacity-0 hidden sm:block">Action</label>
              <Button onClick={handleDownload} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">₹6.5L</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12% from last month</span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold mt-1">₹4.7L</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-xs text-red-600">+5% from last month</span>
                </div>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold mt-1">₹1.8L</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-blue-600 mr-1" />
                  <span className="text-xs text-blue-600">+28% from last month</span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Financial Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Select report options and click Download to generate report</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
