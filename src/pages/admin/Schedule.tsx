import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { DraggableScheduleCalendar } from '@/components/admin/DraggableScheduleCalendar';
import { mockScheduleRequests } from '@/data/mockScheduleRequests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ScheduleScope } from '@/types/schedule';

export default function Schedule() {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [reviewComments, setReviewComments] = useState('');
  const [swapWithTime, setSwapWithTime] = useState({ startTime: '', endTime: '' });
  const [activeTab, setActiveTab] = useState('calendar');

  const handleReview = (request: any) => {
    setSelectedRequest(request);
    setReviewComments(request.reviewComments || '');
    setShowReviewDialog(true);
  };

  const handleApprove = () => {
    if (!reviewComments.trim()) {
      toast.error('Please add review comments');
      return;
    }

    const scopeText = 
      selectedRequest.scope === 'today' ? 'for today' :
      selectedRequest.scope === 'next_2_days' ? 'for next 2 days' :
      'as recurring schedule';

    toast.success(
      `Schedule change approved ${scopeText}`,
      { description: `${selectedRequest.batchName} - Notifications sent`, duration: 4000 }
    );
    setShowReviewDialog(false);
    setReviewComments('');
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!reviewComments.trim()) {
      toast.error('Please add reason for rejection');
      return;
    }

    toast.error(`Schedule change rejected`, { description: 'Teacher will be notified' });
    setShowReviewDialog(false);
    setReviewComments('');
    setSelectedRequest(null);
  };

  const handleSwapSchedules = () => {
    if (!swapWithTime.startTime || !swapWithTime.endTime) {
      toast.error('Please specify swap time');
      return;
    }

    toast.success(
      'Schedules swapped successfully!',
      { description: `Both teachers notified`, duration: 5000 }
    );
    setShowSwapDialog(false);
    setSwapWithTime({ startTime: '', endTime: '' });
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getScopeBadge = (scope: ScheduleScope) => {
    switch (scope) {
      case 'today':
        return <Badge variant="secondary" className="text-xs">Today Only</Badge>;
      case 'next_2_days':
        return <Badge variant="secondary" className="text-xs">Next 2 Days</Badge>;
      case 'recurring':
        return <Badge variant="secondary" className="text-xs">Recurring</Badge>;
      default:
        return null;
    }
  };

  const pendingRequests = mockScheduleRequests.filter(r => r.status === 'pending');

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Schedule Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage timetable and schedule change requests</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="calendar" className="text-xs flex-1 sm:flex-none">
              Visual Calendar
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-xs flex-1 sm:flex-none">
              Change Requests ({pendingRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <DraggableScheduleCalendar />
          </TabsContent>

          <TabsContent value="requests" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No pending schedule change requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-border rounded-lg p-3 space-y-2 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{request.batchName}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              By {request.teacherName} • {new Date(request.requestedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-1.5 flex-shrink-0">
                            {getScopeBadge(request.scope)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>

                        {request.conflictInfo?.hasConflict && (
                          <div className="flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
                            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-amber-900">Conflict: {request.conflictInfo.conflictingBatchName}</p>
                              <p className="text-amber-700">Teacher: {request.conflictInfo.conflictingTeacherName}</p>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-muted/50 rounded">
                            <p className="font-medium text-muted-foreground mb-1">Current:</p>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{request.currentSchedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{request.currentSchedule.startTime} - {request.currentSchedule.endTime}</span>
                            </div>
                          </div>
                          <div className="p-2 bg-primary/5 rounded">
                            <p className="font-medium text-muted-foreground mb-1">Requested:</p>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{request.requestedSchedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{request.requestedSchedule.startTime} - {request.requestedSchedule.endTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs">
                          <p className="font-medium text-muted-foreground">Reason:</p>
                          <p className="mt-0.5">{request.reason}</p>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            onClick={() => handleReview(request)}
                            className="flex-1 h-8 text-xs"
                          >
                            Review & Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Review Schedule Change Request</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-3 py-2">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-semibold">{selectedRequest.batchName}</p>
                  <p className="text-xs text-muted-foreground">Teacher: {selectedRequest.teacherName}</p>
                  {getScopeBadge(selectedRequest.scope)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 border rounded">
                    <p className="font-medium text-muted-foreground">Current:</p>
                    <p>{selectedRequest.currentSchedule.days.join(', ')}</p>
                    <p>{selectedRequest.currentSchedule.startTime} - {selectedRequest.currentSchedule.endTime}</p>
                  </div>
                  <div className="p-2 border rounded">
                    <p className="font-medium text-muted-foreground">Requested:</p>
                    <p>{selectedRequest.requestedSchedule.days.join(', ')}</p>
                    <p>{selectedRequest.requestedSchedule.startTime} - {selectedRequest.requestedSchedule.endTime}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Reason:</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.reason}</p>
                </div>

                <div>
                  <Label htmlFor="comments" className="text-sm">Admin Comments *</Label>
                  <Textarea
                    id="comments"
                    placeholder="Add your review comments..."
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    className="mt-1 text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowReviewDialog(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject} className="w-full sm:w-auto">
                Reject
              </Button>
              <Button onClick={handleApprove} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
