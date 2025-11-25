import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calendar, Clock, Users, Edit, Send, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { mockBatches } from '@/data/mockData';
import { mockScheduleRequests } from '@/data/mockScheduleRequests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ScheduleScope } from '@/types/schedule';

export default function Schedule() {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    days: '',
    startTime: '',
    endTime: '',
    scope: 'today' as ScheduleScope,
    reason: '',
  });

  // Simulating current teacher ID (t1 - Dr. John Smith)
  const currentTeacherId = 't1';

  // Filter batches for current teacher
  const myBatches = mockBatches.filter(batch => 
    batch.teacherIds?.includes(currentTeacherId)
  );

  // Filter requests for current teacher
  const myRequests = mockScheduleRequests.filter(req => 
    req.teacherId === currentTeacherId
  );

  const handleRequestChange = (batch: any) => {
    setSelectedBatch(batch);
    const schedule = batch.schedules?.[0];
    if (schedule) {
      setRequestForm({
        days: schedule.days.join(', '),
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        scope: 'today',
        reason: '',
      });
    }
    setShowRequestDialog(true);
  };

  const handleSubmitRequest = () => {
    if (!requestForm.reason || !requestForm.startTime || !requestForm.endTime) {
      toast.error('Please fill all required fields');
      return;
    }

    // Simulate conflict detection
    const hasConflict = Math.random() > 0.6; // 40% chance of conflict for demo

    if (hasConflict && requestForm.scope !== 'today') {
      toast.warning(
        'Conflict detected with another class. Request sent to peer teacher for approval.',
        { duration: 5000 }
      );
    } else {
      const scopeText = 
        requestForm.scope === 'today' ? 'for today' :
        requestForm.scope === 'next_2_days' ? 'for next 2 days' :
        'as recurring schedule';
      
      toast.success(`Schedule change request submitted ${scopeText} for admin approval`);
    }

    setShowRequestDialog(false);
    setRequestForm({ days: '', startTime: '', endTime: '', scope: 'today', reason: '' });
    setSelectedBatch(null);
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

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">My Schedule</h1>
          <p className="text-sm text-muted-foreground mt-0.5">View and manage your class schedule</p>
        </div>

        {/* Current Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="border border-border rounded-lg p-3 space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{batch.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {batch.subjects.join(', ')}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRequestChange(batch)}
                      className="h-8 text-xs flex-shrink-0"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Change
                    </Button>
                  </div>

                  <div className="space-y-1.5">
                    {batch.schedules?.map((schedule: any) => (
                      <div key={schedule.id} className="flex items-center gap-2 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium">{schedule.days.join(', ')}</span>
                        <Clock className="w-3.5 h-3.5 text-muted-foreground ml-1 flex-shrink-0" />
                        <span className="truncate">{schedule.startTime} - {schedule.endTime}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{batch.enrolledStudents || 0} Students</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Change Requests - Collapsible */}
        <Collapsible open={requestsOpen} onOpenChange={setRequestsOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Schedule Change Requests</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${requestsOpen ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                {myRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No schedule change requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{request.batchName}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Requested {new Date(request.requestedDate).toLocaleDateString()}
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
                              <p className="font-medium text-amber-900">Conflict Detected</p>
                              <p className="text-amber-700 mt-0.5">
                                {request.conflictInfo.conflictingBatchName} - {request.conflictInfo.conflictingTeacherName}
                              </p>
                              {request.conflictInfo.peerApprovalRequired && (
                                <p className="mt-1">
                                  <span className="font-medium">Peer Approval:</span>{' '}
                                  {request.conflictInfo.peerApprovalStatus === 'pending' && 'Waiting for teacher approval'}
                                  {request.conflictInfo.peerApprovalStatus === 'approved' && '✓ Approved by peer'}
                                  {request.conflictInfo.peerApprovalStatus === 'rejected' && '✗ Rejected by peer'}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

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

                        <div className="space-y-1 text-xs">
                          <p className="font-medium text-muted-foreground">Reason:</p>
                          <p className="text-foreground">{request.reason}</p>
                        </div>

                        {request.reviewComments && (
                          <div className="space-y-1 pt-2 border-t border-border text-xs">
                            <p className="font-medium text-muted-foreground">Admin Response:</p>
                            <p className="text-foreground">{request.reviewComments}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Request Change Dialog */}
        <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Request Schedule Change</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              {selectedBatch && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">{selectedBatch.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current: {selectedBatch.schedules?.[0]?.days.join(', ')} | {selectedBatch.schedules?.[0]?.startTime} - {selectedBatch.schedules?.[0]?.endTime}
                  </p>
                </div>
              )}

              {/* Scope Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">When should this change apply? *</Label>
                <RadioGroup 
                  value={requestForm.scope} 
                  onValueChange={(value: ScheduleScope) => setRequestForm({ ...requestForm, scope: value })}
                  className="space-y-2"
                >
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="today" id="today" className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor="today" className="text-sm font-medium cursor-pointer">
                        Today Only
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Apply this change for today's class only
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="next_2_days" id="next_2_days" className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor="next_2_days" className="text-sm font-medium cursor-pointer">
                        Next 2 Days
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Apply for the next 2 scheduled class days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="recurring" id="recurring" className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor="recurring" className="text-sm font-medium cursor-pointer">
                        Recurring (Permanent)
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Make this a permanent schedule change
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="days" className="text-sm">Days (comma separated)</Label>
                <Input
                  id="days"
                  placeholder="e.g., Mon, Wed, Fri"
                  value={requestForm.days}
                  onChange={(e) => setRequestForm({ ...requestForm, days: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-sm">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={requestForm.startTime}
                    onChange={(e) => setRequestForm({ ...requestForm, startTime: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-sm">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={requestForm.endTime}
                    onChange={(e) => setRequestForm({ ...requestForm, endTime: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm">Reason for Change *</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you need this schedule change..."
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm({ ...requestForm, reason: e.target.value })}
                  className="min-h-20 text-sm resize-none"
                />
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded text-xs">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-blue-900">
                  {requestForm.scope === 'today' 
                    ? 'If there\'s a conflict with another class, both teachers must approve the swap. Otherwise, admin approval is required.'
                    : requestForm.scope === 'next_2_days'
                    ? 'For multi-day changes, admin will check for conflicts and may coordinate with other teachers.'
                    : 'Permanent changes require admin approval and will be reflected in the master timetable.'}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowRequestDialog(false)}
                  className="flex-1 h-9 text-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitRequest}
                  className="flex-1 h-9 text-sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
