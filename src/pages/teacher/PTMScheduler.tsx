import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Video, 
  MapPin,
  Clock,
  User,
  FileText,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const mockMeetings = [
  {
    id: '1',
    parent: { name: 'Mr. Rajesh Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh' },
    student: 'Rahul Kumar',
    date: new Date('2024-02-15'),
    time: '10:00 AM',
    duration: 30,
    mode: 'in-person',
    location: 'Room 101',
    status: 'booked',
    notes: null,
  },
  {
    id: '2',
    parent: { name: 'Mrs. Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
    student: 'Ananya Sharma',
    date: new Date('2024-02-15'),
    time: '10:30 AM',
    duration: 30,
    mode: 'online',
    location: 'Google Meet',
    status: 'completed',
    notes: 'Discussed performance improvement. Parent satisfied with progress.',
  },
];

export default function PTMScheduler() {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const [scheduleForm, setScheduleForm] = useState({
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: '30',
    mode: '',
    location: '',
    description: '',
  });

  const [notesForm, setNotesForm] = useState({
    discussionTopics: '',
    concerns: '',
    actionItems: '',
    nextMeeting: '',
  });

  const handlePublishSchedule = () => {
    toast.success('Meeting schedule published! Parents can now book slots.');
    setScheduleOpen(false);
    setScheduleForm({
      type: '',
      date: '',
      startTime: '',
      endTime: '',
      duration: '30',
      mode: '',
      location: '',
      description: '',
    });
  };

  const handleSaveNotes = () => {
    setMeetings(meetings.map(m => 
      m.id === selectedMeeting.id ? { 
        ...m, 
        status: 'completed',
        notes: notesForm.discussionTopics 
      } : m
    ));
    setNotesOpen(false);
    setNotesForm({
      discussionTopics: '',
      concerns: '',
      actionItems: '',
      nextMeeting: '',
    });
    toast.success('Meeting notes saved and shared with parent');
  };

  const handleOpenNotes = (meeting: any) => {
    setSelectedMeeting(meeting);
    setNotesOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-secondary text-secondary-foreground"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'booked':
        return <Badge className="bg-primary text-primary-foreground">Booked</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  const getModeIcon = (mode: string) => {
    return mode === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">PTM Scheduler</h1>
            <p className="text-muted-foreground mt-1">Schedule and manage parent-teacher meetings</p>
          </div>
          <Button onClick={() => setScheduleOpen(true)} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Meetings</p>
              <p className="text-2xl font-bold">{meetings.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold text-secondary">
                {meetings.filter(m => m.status === 'completed').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
              <p className="text-2xl font-bold text-primary">
                {meetings.filter(m => m.status === 'booked').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">This Week</p>
              <p className="text-2xl font-bold">2</p>
            </CardContent>
          </Card>
        </div>

        {/* Meetings Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <img 
                      src={meeting.parent.avatar}
                      alt={meeting.parent.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{meeting.parent.name}</h3>
                        {getStatusBadge(meeting.status)}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Student: {meeting.student}
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {meeting.date.toLocaleDateString()} at {meeting.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Duration: {meeting.duration} minutes
                        </div>
                        <div className="flex items-center gap-2">
                          {getModeIcon(meeting.mode)}
                          {meeting.mode === 'online' ? 'Online Meeting' : meeting.location}
                        </div>
                      </div>
                      {meeting.notes && (
                        <div className="mt-2 p-2 bg-muted rounded text-sm">
                          <strong>Notes:</strong> {meeting.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {meeting.mode === 'online' && meeting.status === 'booked' && (
                      <Button size="sm" variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Join
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenNotes(meeting)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {meeting.status === 'completed' ? 'View' : 'Add'} Notes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Meeting Dialog */}
        <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule PTM</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Meeting Type *</Label>
                <Select value={scheduleForm.type} onValueChange={(value) => setScheduleForm({ ...scheduleForm, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual PTM</SelectItem>
                    <SelectItem value="group">Group Discussion</SelectItem>
                    <SelectItem value="workshop">Parent Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration per Slot *</Label>
                  <Select value={scheduleForm.duration} onValueChange={(value) => setScheduleForm({ ...scheduleForm, duration: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={scheduleForm.startTime}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={scheduleForm.endTime}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mode">Meeting Mode *</Label>
                <Select value={scheduleForm.mode} onValueChange={(value) => setScheduleForm({ ...scheduleForm, mode: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="online">Online (Google Meet/Zoom)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location/Room *</Label>
                <Input
                  id="location"
                  placeholder={scheduleForm.mode === 'online' ? 'Meeting link will be generated' : 'e.g., Room 101'}
                  value={scheduleForm.location}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                  disabled={scheduleForm.mode === 'online'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Meeting description or instructions..."
                  value={scheduleForm.description}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setScheduleOpen(false)}>Cancel</Button>
              <Button onClick={handlePublishSchedule} className="bg-primary hover:bg-primary/90">
                Publish Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Meeting Notes Dialog */}
        <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Meeting Notes</DialogTitle>
              {selectedMeeting && (
                <p className="text-sm text-muted-foreground">
                  {selectedMeeting.parent.name} - {selectedMeeting.student}
                </p>
              )}
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="discussionTopics">Discussion Topics *</Label>
                <Textarea
                  id="discussionTopics"
                  placeholder="What was discussed in the meeting?"
                  value={notesForm.discussionTopics}
                  onChange={(e) => setNotesForm({ ...notesForm, discussionTopics: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concerns">Concerns Raised</Label>
                <Textarea
                  id="concerns"
                  placeholder="Any concerns from parent or teacher?"
                  value={notesForm.concerns}
                  onChange={(e) => setNotesForm({ ...notesForm, concerns: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actionItems">Action Items</Label>
                <Textarea
                  id="actionItems"
                  placeholder="What steps need to be taken? (for student, parent, or teacher)"
                  value={notesForm.actionItems}
                  onChange={(e) => setNotesForm({ ...notesForm, actionItems: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextMeeting">Next Meeting Date (if needed)</Label>
                <Input
                  id="nextMeeting"
                  type="date"
                  value={notesForm.nextMeeting}
                  onChange={(e) => setNotesForm({ ...notesForm, nextMeeting: e.target.value })}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> These notes will be automatically shared with the parent.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNotesOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveNotes} className="bg-primary hover:bg-primary/90">
                <FileText className="w-4 h-4 mr-2" />
                Save Notes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
