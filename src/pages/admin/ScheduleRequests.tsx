import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Check, X, Eye } from 'lucide-react';
import { mockScheduleRequests } from '@/data/mockScheduleRequests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ScheduleRequests() {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [reviewComments, setReviewComments] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

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

    // Simulate approval
    toast.success(
      `Schedule change approved for ${selectedRequest.batchName}`,
      {
        description: 'Teachers and students will be notified',
      }
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

    // Simulate rejection
    toast.error(
      `Schedule change rejected for ${selectedRequest.batchName}`,
      {
        description: 'Teacher will be notified',
      }
    );
    setShowReviewDialog(false);
    setReviewComments('');
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

  const pendingRequests = mockScheduleRequests.filter(r => r.status === 'pending');
  const reviewedRequests = mockScheduleRequests.filter(r => r.status !== 'pending');

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Schedule Change Requests</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Review and approve teacher schedule changes</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending" className="text-xs">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed" className="text-xs">
              Reviewed ({reviewedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No pending requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-sm">{request.teacherName}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {request.batchName}
                            </p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1 p-3 bg-muted rounded-lg">
                            <p className="font-medium text-muted-foreground">Current Schedule:</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{request.currentSchedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{request.currentSchedule.startTime} - {request.currentSchedule.endTime}</span>
                            </div>
                          </div>
                          <div className="space-y-1 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="font-medium text-primary">Requested Schedule:</p>
                            <div className="flex items-center gap-2 mt-1 text-primary">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{request.requestedSchedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-primary">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{request.requestedSchedule.startTime} - {request.requestedSchedule.endTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Reason:</p>
                          <p className="text-xs">{request.reason}</p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReview(request)}
                            className="flex-1 h-8 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviewed" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {reviewedRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No reviewed requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviewedRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-sm">{request.teacherName}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {request.batchName}
                            </p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <p className="font-medium text-muted-foreground">Current Schedule:</p>
                            <p>{request.currentSchedule.days.join(', ')}</p>
                            <p>{request.currentSchedule.startTime} - {request.currentSchedule.endTime}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium text-muted-foreground">Requested Schedule:</p>
                            <p>{request.requestedSchedule.days.join(', ')}</p>
                            <p>{request.requestedSchedule.startTime} - {request.requestedSchedule.endTime}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Reason:</p>
                          <p className="text-xs">{request.reason}</p>
                        </div>

                        {request.reviewComments && (
                          <div className="space-y-1 pt-2 border-t border-border">
                            <p className="text-xs font-medium text-muted-foreground">Admin Response:</p>
                            <p className="text-xs">{request.reviewComments}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Reviewed by {request.reviewedBy} on {request.reviewedDate ? new Date(request.reviewedDate).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        )}
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Schedule Change Request</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{selectedRequest.teacherName}</p>
                      <p className="text-xs text-muted-foreground">{selectedRequest.batchName}</p>
                    </div>
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 p-3 border border-border rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground">Current Schedule</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedRequest.currentSchedule.days.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedRequest.currentSchedule.startTime} - {selectedRequest.currentSchedule.endTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-xs font-medium text-primary">Requested Schedule</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedRequest.requestedSchedule.days.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Clock className="w-4 h-4" />
                        <span>{selectedRequest.requestedSchedule.startTime} - {selectedRequest.requestedSchedule.endTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Teacher's Reason:</p>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                    {selectedRequest.reason}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewComments" className="text-sm">
                    Admin Comments / Decision Reason *
                  </Label>
                  <Textarea
                    id="reviewComments"
                    placeholder="Add your review comments..."
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    className="h-24 text-sm resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be shared with the teacher
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowReviewDialog(false)}
                    className="flex-1 h-9 text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    className="flex-1 h-9 text-sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={handleApprove}
                    className="flex-1 h-9 text-sm bg-secondary hover:bg-secondary/90"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
