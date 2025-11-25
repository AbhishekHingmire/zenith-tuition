import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Check, X, Eye, AlertCircle, RefreshCw, Info } from 'lucide-react';
import { mockScheduleRequests } from '@/data/mockScheduleRequests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleScope } from '@/types/schedule';

export default function ScheduleRequests() {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [reviewComments, setReviewComments] = useState('');
  const [swapWithTime, setSwapWithTime] = useState({ startTime: '', endTime: '' });
  const [activeTab, setActiveTab] = useState('pending');

  const handleReview = (request: any) => {
    setSelectedRequest(request);
    setReviewComments(request.reviewComments || '');
    setShowReviewDialog(true);
  };

  const handleShowSwap = (request: any) => {
    setSelectedRequest(request);
    if (request.conflictInfo?.hasConflict) {
      setSwapWithTime({
        startTime: request.requestedSchedule.startTime,
        endTime: request.requestedSchedule.endTime,
      });
    }
    setShowSwapDialog(true);
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
      {
        description: `${selectedRequest.batchName} - Teachers and students will be notified`,
        duration: 4000,
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

  const handleSwapSchedules = () => {
    if (!swapWithTime.startTime || !swapWithTime.endTime) {
      toast.error('Please specify swap time');
      return;
    }

    toast.success(
      'Schedules swapped successfully!',
      {
        description: `${selectedRequest.batchName} ↔ ${selectedRequest.conflictInfo?.conflictingBatchName}. Both teachers notified.`,
        duration: 5000,
      }
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
  const reviewedRequests = mockScheduleRequests.filter(r => r.status !== 'pending');

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Schedule Change Requests</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Review and approve teacher schedule changes</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="pending" className="text-xs flex-1 sm:flex-none">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed" className="text-xs flex-1 sm:flex-none">
              Reviewed ({reviewedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
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
                        className="border border-border rounded-lg p-3 space-y-3 hover:border-primary/50 transition-colors"
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

                        {/* Conflict Warning */}
                        {request.conflictInfo?.hasConflict && (
                          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded">
                            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="font-medium text-sm text-amber-900">Schedule Conflict Detected</p>
                              <p className="text-xs text-amber-700">
                                <strong>{request.conflictInfo.conflictingBatchName}</strong>
                                {' '}({request.conflictInfo.conflictingTeacherName}) is scheduled at the requested time
                              </p>
                              {request.conflictInfo.peerApprovalRequired && (
                                <div className="flex items-center gap-1.5 mt-2">
                                  <Badge 
                                    variant="outline" 
                                    className={
                                      request.conflictInfo.peerApprovalStatus === 'approved' 
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : request.conflictInfo.peerApprovalStatus === 'rejected'
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                    }
                                  >
                                    Peer Approval: {request.conflictInfo.peerApprovalStatus === 'pending' ? 'Pending' : 
                                      request.conflictInfo.peerApprovalStatus === 'approved' ? 'Approved' : 'Rejected'}
                                  </Badge>
                                </div>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleShowSwap(request)}
                                className="mt-2 h-7 text-xs"
                              >
                                <RefreshCw className="w-3 h-3 mr-1" />
                                Manage Swap
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Schedule Comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="p-2 bg-muted/50 rounded space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Current Schedule:</p>
                            <div className="flex items-center gap-1.5 text-xs">
                              <Calendar className="w-3 h-3" />
                              <span>{request.currentSchedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{request.currentSchedule.startTime} - {request.currentSchedule.endTime}</span>
                            </div>
                          </div>
                          <div className="p-2 bg-primary/5 rounded space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Requested Schedule:</p>
                            <div className="flex items-center gap-1.5 text-xs">
                              <Calendar className="w-3 h-3" />
                              <span>{request.requestedSchedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{request.requestedSchedule.startTime} - {request.requestedSchedule.endTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Reason */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Reason:</p>
                          <p className="text-xs">{request.reason}</p>
                        </div>

                        {/* Scope Info */}
                        <div className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                          <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-900">
                            {request.scope === 'today' 
                              ? 'This change will only apply to today\'s class.'
                              : request.scope === 'next_2_days'
                              ? 'This change will apply to the next 2 scheduled class days.'
                              : 'This is a permanent schedule change that will apply to all future classes.'}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            onClick={() => handleReview(request)}
                            className="flex-1 h-8 text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
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
                        className="border border-border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{request.batchName}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              By {request.teacherName} • Reviewed {request.reviewedDate && new Date(request.reviewedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-1.5 flex-shrink-0">
                            {getScopeBadge(request.scope)}
                            {getStatusBadge(request.status)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="space-y-1 p-2 bg-muted/50 rounded">
                            <p className="font-medium text-muted-foreground">Current:</p>
                            <p>{request.currentSchedule.days.join(', ')}</p>
                            <p>{request.currentSchedule.startTime} - {request.currentSchedule.endTime}</p>
                          </div>
                          <div className="space-y-1 p-2 bg-primary/5 rounded">
                            <p className="font-medium text-muted-foreground">Requested:</p>
                            <p>{request.requestedSchedule.days.join(', ')}</p>
                            <p>{request.requestedSchedule.startTime} - {request.requestedSchedule.endTime}</p>
                          </div>
                        </div>

                        {request.reviewComments && (
                          <div className="space-y-1 pt-1 border-t border-border">
                            <p className="text-xs font-medium text-muted-foreground">Admin Comments:</p>
                            <p className="text-xs">{request.reviewComments}</p>
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
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Schedule Change Request</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4 py-2">
                <div className="p-3 bg-muted rounded-lg space-y-2">
                  <div>
                    <p className="text-sm font-semibold">{selectedRequest.batchName}</p>
                    <p className="text-xs text-muted-foreground">Teacher: {selectedRequest.teacherName}</p>
                  </div>
                  <div className="flex gap-2">
                    {getScopeBadge(selectedRequest.scope)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 p-2 border rounded">
                    <p className="text-xs font-medium text-muted-foreground">Current:</p>
                    <p className="text-xs">{selectedRequest.currentSchedule.days.join(', ')}</p>
                    <p className="text-xs">{selectedRequest.currentSchedule.startTime} - {selectedRequest.currentSchedule.endTime}</p>
                  </div>
                  <div className="space-y-1 p-2 border rounded">
                    <p className="text-xs font-medium text-muted-foreground">Requested:</p>
                    <p className="text-xs">{selectedRequest.requestedSchedule.days.join(', ')}</p>
                    <p className="text-xs">{selectedRequest.requestedSchedule.startTime} - {selectedRequest.requestedSchedule.endTime}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Reason:</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.reason}</p>
                </div>

                {selectedRequest.conflictInfo?.hasConflict && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded space-y-1">
                    <p className="text-sm font-medium text-amber-900">⚠️ Conflict Detected</p>
                    <p className="text-xs text-amber-700">
                      {selectedRequest.conflictInfo.conflictingBatchName} by {selectedRequest.conflictInfo.conflictingTeacherName}
                    </p>
                    {selectedRequest.conflictInfo.peerApprovalStatus && (
                      <p className="text-xs mt-1">
                        Peer status: <strong>{selectedRequest.conflictInfo.peerApprovalStatus}</strong>
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-sm">Admin Comments *</Label>
                  <Textarea
                    id="comments"
                    placeholder="Add your review comments..."
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    className="min-h-20 text-sm resize-none"
                  />
                </div>
              </div>
            )}
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowReviewDialog(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                className="w-full sm:w-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Swap Schedule Dialog */}
        <Dialog open={showSwapDialog} onOpenChange={setShowSwapDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Manage Schedule Swap</DialogTitle>
            </DialogHeader>
            {selectedRequest?.conflictInfo?.hasConflict && (
              <div className="space-y-4 py-2">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded space-y-2">
                  <p className="text-sm font-semibold text-amber-900">Conflict Details</p>
                  <div className="text-xs space-y-1">
                    <p>
                      <strong>Requesting:</strong> {selectedRequest.batchName} ({selectedRequest.teacherName})
                    </p>
                    <p>
                      <strong>Conflicts with:</strong> {selectedRequest.conflictInfo.conflictingBatchName} ({selectedRequest.conflictInfo.conflictingTeacherName})
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Swap Options</Label>
                  
                  <div className="p-3 border rounded space-y-2">
                    <p className="text-sm font-medium">Option 1: Direct Swap</p>
                    <p className="text-xs text-muted-foreground">
                      Swap {selectedRequest.batchName} with {selectedRequest.conflictInfo.conflictingBatchName}
                    </p>
                    <p className="text-xs">
                      • {selectedRequest.batchName}: {selectedRequest.currentSchedule.startTime}-{selectedRequest.currentSchedule.endTime} 
                      → {selectedRequest.requestedSchedule.startTime}-{selectedRequest.requestedSchedule.endTime}
                    </p>
                    <p className="text-xs">
                      • {selectedRequest.conflictInfo.conflictingBatchName}: {selectedRequest.requestedSchedule.startTime}-{selectedRequest.requestedSchedule.endTime}
                      → {selectedRequest.currentSchedule.startTime}-{selectedRequest.currentSchedule.endTime}
                    </p>
                    <Button
                      size="sm"
                      onClick={handleSwapSchedules}
                      className="w-full mt-2"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Execute Swap
                    </Button>
                  </div>

                  <div className="p-3 border rounded space-y-2">
                    <p className="text-sm font-medium">Option 2: Manual Adjustment</p>
                    <p className="text-xs text-muted-foreground">
                      Move {selectedRequest.conflictInfo.conflictingBatchName} to different time
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label className="text-xs">New Start Time</Label>
                        <Input
                          type="time"
                          value={swapWithTime.startTime}
                          onChange={(e) => setSwapWithTime({ ...swapWithTime, startTime: e.target.value })}
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">New End Time</Label>
                        <Input
                          type="time"
                          value={swapWithTime.endTime}
                          onChange={(e) => setSwapWithTime({ ...swapWithTime, endTime: e.target.value })}
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSwapSchedules}
                      className="w-full mt-2"
                    >
                      Apply Manual Adjustment
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-900">
                    Both teachers and all affected students will be notified of the schedule change.
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSwapDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
