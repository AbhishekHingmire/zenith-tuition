import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UserPlus, Phone, MessageSquare, Gift, TrendingUp, Calendar, Award } from 'lucide-react';
import { toast } from 'sonner';

const mockInquiries = [
  { id: '1', parent: 'Rajesh Kumar', student: 'Aarav Kumar', grade: 'Grade 8', source: 'Walk-in', status: 'new', date: '2024-11-20', phone: '+91 9876543210' },
  { id: '2', parent: 'Priya Sharma', student: 'Ananya Sharma', grade: 'Grade 10', source: 'Referral', status: 'contacted', date: '2024-11-19', phone: '+91 9876543211' },
  { id: '3', parent: 'Amit Patel', student: 'Rohan Patel', grade: 'Grade 9', source: 'Website', status: 'demo-scheduled', date: '2024-11-18', phone: '+91 9876543212' },
  { id: '4', parent: 'Neha Singh', student: 'Ishaan Singh', grade: 'Grade 8', source: 'Phone', status: 'enrolled', date: '2024-11-15', phone: '+91 9876543213' },
];

const mockReferrals = [
  { id: '1', referrer: 'Rahul Sharma (Grade 9)', referee: 'Ananya Sharma', status: 'qualified', reward: 'Given', date: '2024-11-01' },
  { id: '2', referrer: 'Priya Patel (Grade 10)', referee: 'Rohan Patel', status: 'pending', reward: 'Not Given', date: '2024-11-15' },
  { id: '3', referrer: 'Amit Kumar (Grade 8)', referee: 'Sanya Kumar', status: 'cancelled', reward: 'Not Given', date: '2024-10-20' },
];

export default function Admissions() {
  const [selectedStatus, setSelectedStatus] = useState('');

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      contacted: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      'demo-scheduled': 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      enrolled: 'bg-secondary/20 text-secondary-foreground',
      lost: 'bg-destructive/10 text-destructive',
      qualified: 'bg-secondary/20',
      pending: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      cancelled: 'bg-destructive/10 text-destructive',
    };
    return colors[status as keyof typeof colors] || '';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Admissions & Referral Management</h1>
            <p className="text-muted-foreground mt-1">Track inquiries, leads, and referrals</p>
          </div>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="inquiries">Inquiries & Leads</TabsTrigger>
            <TabsTrigger value="referral">Referral Program</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Inquiry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                  <DialogHeader>
                    <DialogTitle>Add New Inquiry/Lead</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Parent Name</Label>
                        <Input placeholder="Parent's full name" />
                      </div>
                      <div>
                        <Label>Contact Number</Label>
                        <Input placeholder="+91 9876543210" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Student Name</Label>
                        <Input placeholder="Student's name" />
                      </div>
                      <div>
                        <Label>Grade Interested</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {[8, 9, 10, 11, 12].map((grade) => (
                              <SelectItem key={grade} value={`grade${grade}`}>Grade {grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Source</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="How did they find us?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="walk-in">Walk-in</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="referral">Referral</SelectItem>
                            <SelectItem value="social-media">Social Media</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Interested Batch/Timing</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                            <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Notes</Label>
                      <Textarea placeholder="Additional information..." rows={3} />
                    </div>
                    <div>
                      <Label>Follow-up Date</Label>
                      <Input type="date" />
                    </div>
                    <Button className="w-full" onClick={() => toast.success('Inquiry added successfully')}>
                      Save Inquiry
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Inquiries</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="demo-scheduled">Demo Scheduled</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Kanban Board View */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {['new', 'contacted', 'demo-scheduled', 'enrolled', 'lost'].map((status) => (
                <Card key={status}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <span className="capitalize">{status.replace('-', ' ')}</span>
                      <Badge variant="outline">
                        {mockInquiries.filter(i => i.status === status).length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mockInquiries.filter(i => i.status === status).map((inquiry) => (
                      <div key={inquiry.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <p className="font-medium text-sm">{inquiry.student}</p>
                        <p className="text-xs text-muted-foreground">{inquiry.parent}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{inquiry.grade}</Badge>
                          <Badge variant="outline" className="text-xs">{inquiry.source}</Badge>
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <MessageSquare className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="referral" className="space-y-6">
            {/* Referral Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Referral Program Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>Enable Referral Program</Label>
                    <p className="text-sm text-muted-foreground">Allow students to refer new admissions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Referrer Reward</Label>
                    <div className="flex gap-2 items-center mt-2">
                      <Input type="number" defaultValue="10" />
                      <span className="text-sm">% discount on next month fee</span>
                    </div>
                  </div>
                  <div>
                    <Label>Referee Reward</Label>
                    <div className="flex gap-2 items-center mt-2">
                      <Input type="number" defaultValue="5" />
                      <span className="text-sm">% discount on admission fee</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Minimum Enrollment Period for Reward</Label>
                  <div className="flex gap-2 items-center mt-2">
                    <Input type="number" defaultValue="3" />
                    <span className="text-sm">months</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Referee must stay enrolled for this period</p>
                </div>
                <Button onClick={() => toast.success('Referral settings saved')}>Save Settings</Button>
              </CardContent>
            </Card>

            {/* Referral Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Referral Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Referrer (Existing Student)</th>
                        <th className="p-3 text-left font-medium">Referee (New Student)</th>
                        <th className="p-3 text-left font-medium">Referral Date</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Reward Given</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReferrals.map((referral) => (
                        <tr key={referral.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{referral.referrer}</td>
                          <td className="p-3">{referral.referee}</td>
                          <td className="p-3">{new Date(referral.date).toLocaleDateString()}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(referral.status)}>
                              {referral.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={referral.reward === 'Given' ? 'secondary' : 'outline'}>
                              {referral.reward}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {referral.status === 'qualified' && referral.reward === 'Not Given' && (
                              <Button variant="outline" size="sm">Mark Reward Given</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Referral Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Referral Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, student: 'Rahul Sharma (Grade 9)', referrals: 5 },
                    { rank: 2, student: 'Priya Patel (Grade 10)', referrals: 4 },
                    { rank: 3, student: 'Amit Kumar (Grade 8)', referrals: 3 },
                  ].map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          entry.rank === 1 ? 'bg-amber-500/20 text-amber-700' :
                          entry.rank === 2 ? 'bg-gray-400/20 text-gray-700' :
                          'bg-amber-700/20 text-amber-900'
                        }`}>
                          #{entry.rank}
                        </div>
                        <div>
                          <p className="font-medium">{entry.student}</p>
                          <p className="text-sm text-muted-foreground">{entry.referrals} successful referrals</p>
                        </div>
                      </div>
                      {entry.rank === 1 && (
                        <Badge variant="secondary" className="bg-secondary/20">
                          <Award className="w-3 h-3 mr-1" />
                          Top Referrer
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Inquiries</p>
                      <p className="text-3xl font-bold mt-2">125</p>
                      <p className="text-xs text-muted-foreground mt-1">This month</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <UserPlus className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Enrollments</p>
                      <p className="text-3xl font-bold mt-2">42</p>
                      <p className="text-xs text-secondary mt-1">+15% vs last month</p>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-3xl font-bold mt-2">34%</p>
                      <p className="text-xs text-muted-foreground mt-1">Inquiries → Enrollments</p>
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
                      <p className="text-sm text-muted-foreground">Active Referrals</p>
                      <p className="text-3xl font-bold mt-2">18</p>
                      <p className="text-xs text-muted-foreground mt-1">Pending qualification</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Gift className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Source-wise Conversion */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Source-wise Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: 'Referral', inquiries: 45, enrolled: 22, rate: 49 },
                    { source: 'Website', inquiries: 38, enrolled: 15, rate: 39 },
                    { source: 'Walk-in', inquiries: 25, enrolled: 8, rate: 32 },
                    { source: 'Social Media', inquiries: 17, enrolled: 4, rate: 24 },
                  ].map((data) => (
                    <div key={data.source} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{data.source}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.inquiries} inquiries → {data.enrolled} enrolled
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          {data.rate}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
