import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Download, 
  BarChart3,
  Receipt,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { EditButton, DeleteButton } from '@/components/ui/action-buttons';

const mockFinanceData = {
  totalRevenue: 500000,
  totalExpenses: 320000,
  netProfit: 180000,
  outstandingDues: 120000,
  revenueGrowth: 12,
};

const mockExpenses = [
  { id: '1', date: '2024-11-15', category: 'Salaries', amount: 250000, vendor: 'Staff Payroll', mode: 'Bank Transfer' },
  { id: '2', date: '2024-11-10', category: 'Rent', amount: 40000, vendor: 'Property Owner', mode: 'Bank Transfer' },
  { id: '3', date: '2024-11-08', category: 'Utilities', amount: 15000, vendor: 'Electricity Board', mode: 'Online' },
  { id: '4', date: '2024-11-05', category: 'Stationery', amount: 8000, vendor: 'Office Supplies Co.', mode: 'Cash' },
];

const mockSalaries = [
  { id: '1', teacher: 'Mr. Sharma', salary: 45000, lastPaid: '2024-11-01', status: 'paid' },
  { id: '2', teacher: 'Mrs. Patel', salary: 42000, lastPaid: '2024-11-01', status: 'paid' },
  { id: '3', teacher: 'Ms. Khan', salary: 40000, lastPaid: '2024-10-01', status: 'pending' },
];

export default function Finance() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Finance Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage expenses, income, and financial reports</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">₹{mockFinanceData.totalRevenue.toLocaleString()}</p>
                  <Badge variant="secondary" className="mt-2 bg-secondary/20">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{mockFinanceData.revenueGrowth}%
                  </Badge>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold mt-1">₹{mockFinanceData.totalExpenses.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">This month</p>
                </div>
                <div className="bg-destructive/10 p-3 rounded-full">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold mt-1 text-secondary">₹{mockFinanceData.netProfit.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">36% margin</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Dues</p>
                  <p className="text-2xl font-bold mt-1">₹{mockFinanceData.outstandingDues.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">From students</p>
                </div>
                <div className="bg-amber-500/10 p-3 rounded-full">
                  <IndianRupee className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="salaries">Salaries</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Record Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Record New Expense</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salaries">Salaries</SelectItem>
                            <SelectItem value="rent">Rent</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="stationery">Stationery</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Amount (₹)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>Payment Mode</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Vendor/Recipient Name</Label>
                      <Input placeholder="Vendor name" />
                    </div>
                    <div>
                      <Label>Invoice/Receipt Number</Label>
                      <Input placeholder="INV-001" />
                    </div>
                    <div>
                      <Label>Description/Notes</Label>
                      <Textarea placeholder="Add notes..." rows={3} />
                    </div>
                    <div>
                      <Label>Upload Receipt/Invoice</Label>
                      <Input type="file" />
                    </div>
                    <Button className="w-full" onClick={() => toast.success('Expense recorded successfully')}>
                      Save Expense
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Expense List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium">Vendor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium">Payment Mode</th>
                        <th className="px-4 py-3 text-right text-xs font-medium">Amount</th>
                        <th className="px-4 py-3 text-center text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {mockExpenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">{expense.category}</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{expense.vendor}</td>
                          <td className="px-4 py-3 text-sm">{expense.mode}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-right">₹{expense.amount.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-1.5">
                              <EditButton onClick={() => toast.info('Edit expense feature')} />
                              <DeleteButton onClick={() => toast.info('Delete expense feature')} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salaries">
            <Card>
              <CardHeader>
                <CardTitle>Salary Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Teacher</th>
                        <th className="p-3 text-left font-medium">Monthly Salary</th>
                        <th className="p-3 text-left font-medium">Last Paid</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockSalaries.map((salary) => (
                        <tr key={salary.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{salary.teacher}</td>
                          <td className="p-3">₹{salary.salary.toLocaleString()}</td>
                          <td className="p-3">{new Date(salary.lastPaid).toLocaleDateString()}</td>
                          <td className="p-3">
                            <Badge variant={salary.status === 'paid' ? 'secondary' : 'destructive'}>
                              {salary.status === 'paid' ? 'Paid' : 'Pending'}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Receipt className="w-3 h-3 mr-1" />
                                Pay Salary
                              </Button>
                              <Button variant="ghost" size="sm">History</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Profit & Loss Statement</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive P&L report</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <IndianRupee className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Cash Flow Statement</h3>
                      <p className="text-sm text-muted-foreground">Track cash inflows & outflows</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Balance Sheet</h3>
                      <p className="text-sm text-muted-foreground">Assets, liabilities & net worth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Receipt className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Tax Reports (GST)</h3>
                      <p className="text-sm text-muted-foreground">GST compliance reports</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
