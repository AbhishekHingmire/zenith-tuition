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
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Send,
  Pin,
  CheckCircle,
  Users,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

const mockConversations = [
  {
    id: '1',
    parent: { name: 'Mr. Rajesh Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh' },
    student: 'Rahul Kumar',
    lastMessage: 'Thank you for the update',
    lastMessageDate: new Date('2024-01-21'),
    unread: false,
    pinned: true,
    resolved: false,
  },
  {
    id: '2',
    parent: { name: 'Mrs. Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
    student: 'Ananya Sharma',
    lastMessage: 'When is the next exam?',
    lastMessageDate: new Date('2024-01-20'),
    unread: true,
    pinned: false,
    resolved: false,
  },
];

const mockTemplates = [
  { id: '1', name: 'Absence Notification', content: 'Your child was absent today. Please ensure regular attendance.' },
  { id: '2', name: 'Good Performance', content: 'Your child has shown excellent improvement. Keep up the good work!' },
  { id: '3', name: 'PTM Reminder', content: 'Parent-Teacher Meeting is scheduled for [DATE]. Please confirm your attendance.' },
];

export default function ParentCommunication() {
  const [conversations, setConversations] = useState(mockConversations);
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [bulkMessageOpen, setBulkMessageOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParents, setSelectedParents] = useState<string[]>([]);

  const [messageForm, setMessageForm] = useState({
    parent: '',
    message: '',
  });

  const [bulkForm, setBulkForm] = useState({
    recipientGroup: '',
    message: '',
    scheduleDate: '',
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    content: '',
  });

  const parents = [
    { id: '1', name: 'Mr. Rajesh Kumar', student: 'Rahul Kumar' },
    { id: '2', name: 'Mrs. Priya Sharma', student: 'Ananya Sharma' },
    { id: '3', name: 'Mr. Amit Patel', student: 'Krish Patel' },
  ];

  const handleSendMessage = () => {
    toast.success('Message sent successfully');
    setNewMessageOpen(false);
    setMessageForm({ parent: '', message: '' });
  };

  const handleSendBulkMessage = () => {
    toast.success(`Message sent to ${selectedParents.length} parents`);
    setBulkMessageOpen(false);
    setBulkForm({ recipientGroup: '', message: '', scheduleDate: '' });
    setSelectedParents([]);
  };

  const handleSaveTemplate = () => {
    toast.success('Template saved successfully');
    setTemplateOpen(false);
    setTemplateForm({ name: '', content: '' });
  };

  const togglePin = (id: string) => {
    setConversations(conversations.map(c => 
      c.id === id ? { ...c, pinned: !c.pinned } : c
    ));
    toast.success('Conversation updated');
  };

  const markResolved = (id: string) => {
    setConversations(conversations.map(c => 
      c.id === id ? { ...c, resolved: true } : c
    ));
    toast.success('Conversation marked as resolved');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Parent Communication</h1>
          <p className="text-muted-foreground mt-1">Message and communicate with parents</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button onClick={() => setNewMessageOpen(true)} className="bg-primary hover:bg-primary/90">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Message
          </Button>
          <Button onClick={() => setBulkMessageOpen(true)} variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Bulk Message
          </Button>
          <Button onClick={() => setTemplateOpen(true)} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>

        {/* Conversations */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Conversations</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations
                .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
                .map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                      conversation.unread ? 'bg-primary/5 border-primary/20' : ''
                    }`}
                  >
                    <img 
                      src={conversation.parent.avatar}
                      alt={conversation.parent.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{conversation.parent.name}</h3>
                        {conversation.pinned && <Pin className="w-4 h-4 text-amber-600" />}
                        {conversation.unread && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                        {conversation.resolved && <Badge className="bg-secondary text-secondary-foreground">Resolved</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Student: {conversation.student}</p>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {conversation.lastMessageDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => { e.stopPropagation(); togglePin(conversation.id); }}
                      >
                        <Pin className={`w-4 h-4 ${conversation.pinned ? 'fill-amber-600 text-amber-600' : ''}`} />
                      </Button>
                      {!conversation.resolved && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); markResolved(conversation.id); }}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.content}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(template.content);
                      toast.success('Template copied to clipboard');
                    }}
                  >
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New Message Dialog */}
        <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="parent">Select Parent *</Label>
                <Select value={messageForm.parent} onValueChange={(value) => setMessageForm({ ...messageForm, parent: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Search parent by student name" />
                  </SelectTrigger>
                  <SelectContent>
                    {parents.map((parent) => (
                      <SelectItem key={parent.id} value={parent.id}>
                        {parent.name} (Student: {parent.student})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message..."
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewMessageOpen(false)}>Cancel</Button>
              <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Message Dialog */}
        <Dialog open={bulkMessageOpen} onOpenChange={setBulkMessageOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Send Bulk Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipientGroup">Select Recipient Group *</Label>
                <Select value={bulkForm.recipientGroup} onValueChange={(value) => setBulkForm({ ...bulkForm, recipientGroup: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose recipient group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All parents in Grade 10-A</SelectItem>
                    <SelectItem value="low-attendance">Parents of students with &lt;75% attendance</SelectItem>
                    <SelectItem value="pending-fees">Parents with pending fees</SelectItem>
                    <SelectItem value="custom">Custom selection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {bulkForm.recipientGroup === 'custom' && (
                <div className="space-y-2">
                  <Label>Select Parents</Label>
                  <div className="max-h-48 overflow-y-auto border rounded-md p-4 space-y-2">
                    {parents.map((parent) => (
                      <div key={parent.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={parent.id}
                          checked={selectedParents.includes(parent.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedParents([...selectedParents, parent.id]);
                            } else {
                              setSelectedParents(selectedParents.filter(id => id !== parent.id));
                            }
                          }}
                        />
                        <label htmlFor={parent.id} className="text-sm cursor-pointer">
                          {parent.name} ({parent.student})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="bulkMessage">Message *</Label>
                <Textarea
                  id="bulkMessage"
                  placeholder="Type your message..."
                  value={bulkForm.message}
                  onChange={(e) => setBulkForm({ ...bulkForm, message: e.target.value })}
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduleDate">Schedule Send (Optional)</Label>
                <Input
                  id="scheduleDate"
                  type="datetime-local"
                  value={bulkForm.scheduleDate}
                  onChange={(e) => setBulkForm({ ...bulkForm, scheduleDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBulkMessageOpen(false)}>Cancel</Button>
              <Button onClick={handleSendBulkMessage} className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4 mr-2" />
                Send to All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Save Template Dialog */}
        <Dialog open={templateOpen} onOpenChange={setTemplateOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Save Message Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name *</Label>
                <Input
                  id="templateName"
                  placeholder="e.g., Assignment Reminder"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateContent">Message Content *</Label>
                <Textarea
                  id="templateContent"
                  placeholder="Type the template message..."
                  value={templateForm.content}
                  onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTemplateOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveTemplate} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
