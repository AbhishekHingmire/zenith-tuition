import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Upload, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { mockLeaveRequests, mockChild } from '@/data/mockParentData';
import { cn } from '@/lib/utils';

export default function LeaveRequest() {
  const [leaveType, setLeaveType] = useState<'full' | 'morning' | 'afternoon'>('full');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [reason, setReason] = useState('');
  const [notifyTeacher, setNotifyTeacher] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDates.length === 0) {
      toast.error('Please select at least one date');
      return;
    }
    
    if (reason.trim().length < 10) {
      toast.error('Please provide a reason (minimum 10 characters)');
      return;
    }

    toast.success('Leave request submitted successfully!', {
      description: 'Your request is pending approval from the teacher.'
    });
    
    setShowForm(false);
    setSelectedDates([]);
    setReason('');
    setLeaveType('full');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-secondary" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-destructive" />;
      default: return <Clock className="w-5 h-5 text-accent" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'border-secondary bg-secondary/10';
      case 'rejected': return 'border-destructive bg-destructive/10';
      default: return 'border-accent bg-accent/10';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Request</h1>
          <p className="text-muted-foreground mt-1">Request leave for your child</p>
        </div>

        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)}
            size="lg"
            className="w-full sm:w-auto touch-manipulation"
          >
            Request New Leave
          </Button>
        )}

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Submit Leave Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Child Name */}
                <div className="space-y-2">
                  <Label>Child Name</Label>
                  <Input value={mockChild.name} disabled />
                </div>

                {/* Leave Type */}
                <div className="space-y-3">
                  <Label>Leave Type *</Label>
                  <RadioGroup value={leaveType} onValueChange={(value) => setLeaveType(value as any)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="flex-1 cursor-pointer">Full Day</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="morning" id="morning" />
                      <Label htmlFor="morning" className="flex-1 cursor-pointer">Half Day (Morning)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="afternoon" id="afternoon" />
                      <Label htmlFor="afternoon" className="flex-1 cursor-pointer">Half Day (Afternoon)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Select Date(s) *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal touch-manipulation min-h-[44px]",
                          !selectedDates.length && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDates.length > 0 
                          ? `${selectedDates.length} date(s) selected`
                          : "Pick date(s)"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover" align="start">
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => setSelectedDates(dates || [])}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {selectedDates.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedDates.map((date, idx) => (
                        <Badge key={idx} variant="secondary">
                          {format(date, 'MMM d, yyyy')}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for leave (minimum 10 characters)"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    required
                    minLength={10}
                  />
                  <p className="text-xs text-muted-foreground">
                    {reason.length} characters (minimum 10 required)
                  </p>
                </div>

                {/* Supporting Document */}
                <div className="space-y-2">
                  <Label>Supporting Document (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG (Max 5MB)
                    </p>
                  </div>
                </div>

                {/* Notify Teacher */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notify"
                    checked={notifyTeacher}
                    onCheckedChange={(checked) => setNotifyTeacher(checked as boolean)}
                  />
                  <Label
                    htmlFor="notify"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Notify teacher about this leave request
                  </Label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 flex-col sm:flex-row">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                    className="w-full sm:w-auto touch-manipulation min-h-[44px]"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="w-full sm:w-auto touch-manipulation min-h-[44px]"
                  >
                    Submit Leave Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Leave History */}
        <Card>
          <CardHeader>
            <CardTitle>Leave History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeaveRequests.map((request) => (
                <div
                  key={request.id}
                  className={`border-2 rounded-lg p-4 ${getStatusColor(request.status)}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(request.status)}
                      <div>
                        <p className="font-semibold text-foreground capitalize">
                          {request.leaveType} Day Leave
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {request.dates.map(d => format(d, 'MMM d, yyyy')).join(', ')}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        request.status === 'approved' ? 'default' :
                        request.status === 'rejected' ? 'destructive' :
                        'secondary'
                      }
                      className="capitalize"
                    >
                      {request.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Reason:</span>
                      <p className="text-foreground mt-1">{request.reason}</p>
                    </div>

                    {request.supportingDocument && (
                      <div>
                        <span className="text-muted-foreground">Supporting Document:</span>
                        <Button variant="link" className="h-auto p-0 ml-2" size="sm">
                          📎 {request.supportingDocument.name}
                        </Button>
                      </div>
                    )}

                    {request.reviewedBy && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-muted-foreground">
                          Reviewed by: <span className="text-foreground">{request.reviewedBy.name}</span>
                          {request.reviewDate && ` on ${format(request.reviewDate, 'MMM d, yyyy')}`}
                        </p>
                        {request.comments && (
                          <p className="text-muted-foreground mt-1">
                            Comments: <span className="text-foreground">{request.comments}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        View Details
                      </Button>
                      <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                        Cancel Request
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
