import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner';

const mockLeaves = [
  {
    id: '1',
    type: 'Sick',
    dateRange: { from: '2024-02-01', to: '2024-02-02' },
    reason: 'Seasonal flu',
    status: 'approved',
    approvedBy: 'Admin',
    approvalDate: '2024-01-25',
    comments: 'Get well soon',
    classesAffected: ['Grade 10-A Mathematics', 'Grade 11-B Physics'],
  },
  {
    id: '2',
    type: 'Casual',
    dateRange: { from: '2024-01-28', to: '2024-01-28' },
    reason: 'Personal work',
    status: 'pending',
    classesAffected: ['Grade 10-A Mathematics'],
  },
];

export default function Leave() {
  const [leaves, setLeaves] = useState(mockLeaves);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: '',
    fromDate: '',
    toDate: '',
    reason: '',
    substituteTeacher: '',
  });

  const leaveBalance = {
    annual: 20,
    used: 5,
    remaining: 15,
  };

  const handleSubmitLeave = () => {
    const newLeave = {
      id: String(leaves.length + 1),
      type: formData.type,
      dateRange: { from: formData.fromDate, to: formData.toDate },
      reason: formData.reason,
      status: 'pending' as const,
      classesAffected: ['Grade 10-A Mathematics'], // Would be auto-populated
    };
    setLeaves([newLeave, ...leaves]);
    setLeaveOpen(false);
    setFormData({
      type: '',
      fromDate: '',
      toDate: '',
      reason: '',
      substituteTeacher: '',
    });
    toast.success('Leave request submitted successfully');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-secondary text-secondary-foreground"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Sick': return 'bg-red-100 text-red-700';
      case 'Casual': return 'bg-blue-100 text-blue-700';
      case 'Emergency': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Leave Management</h1>
            <p className="text-muted-foreground mt-1">Apply for and track your leave requests</p>
          </div>
          <Button onClick={() => setLeaveOpen(true)} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Request Leave
          </Button>
        </div>

        {/* Leave Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Annual Leave Quota</span>
                <span className="text-lg font-bold">{leaveBalance.annual} days</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Used</span>
                  <span className="font-medium">{leaveBalance.used} days</span>
                </div>
                <Progress value={(leaveBalance.used / leaveBalance.annual) * 100} className="h-2" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Remaining</span>
                <span className="text-xl font-bold text-secondary">{leaveBalance.remaining} days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>My Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaves.map((leave) => (
                <div
                  key={leave.id}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`${getTypeColor(leave.type)} p-3 rounded-lg`}>
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getTypeColor(leave.type)} variant="outline">
                            {leave.type}
                          </Badge>
                          {getStatusBadge(leave.status)}
                        </div>
                        <p className="text-sm font-medium">
                          {new Date(leave.dateRange.from).toLocaleDateString()} - {new Date(leave.dateRange.to).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Reason: </span>
                      <span>{leave.reason}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Classes Affected: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {leave.classesAffected.map((cls, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {leave.status === 'approved' && (
                      <>
                        <div>
                          <span className="text-muted-foreground">Approved by: </span>
                          <span className="font-medium">{leave.approvedBy}</span>
                          <span className="text-muted-foreground"> on {leave.approvalDate}</span>
                        </div>
                        {leave.comments && (
                          <div>
                            <span className="text-muted-foreground">Comments: </span>
                            <span className="italic">{leave.comments}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Request Leave Dialog */}
        <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Leave Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sick">Sick Leave</SelectItem>
                    <SelectItem value="Casual">Casual Leave</SelectItem>
                    <SelectItem value="Emergency">Emergency Leave</SelectItem>
                    <SelectItem value="Personal">Personal Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromDate">From Date *</Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toDate">To Date *</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason *</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a reason for your leave..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="substituteTeacher">Substitute Teacher (Optional)</Label>
                <Input
                  id="substituteTeacher"
                  placeholder="Suggest a substitute teacher"
                  value={formData.substituteTeacher}
                  onChange={(e) => setFormData({ ...formData, substituteTeacher: e.target.value })}
                />
              </div>

              {formData.type === 'Sick' && (
                <div className="space-y-2">
                  <Label htmlFor="certificate">Medical Certificate</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                    <FileText className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload medical certificate
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Your classes will be auto-populated based on your schedule for the selected dates.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setLeaveOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitLeave} className="bg-primary hover:bg-primary/90">
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
