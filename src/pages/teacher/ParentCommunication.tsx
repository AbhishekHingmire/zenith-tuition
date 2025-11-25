import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { WhatsAppButton, WHATSAPP_TEMPLATES } from '@/components/WhatsAppButton';
import { 
  Search,
  Phone,
  Mail,
  Users
} from 'lucide-react';

const mockParentContacts = [
  {
    id: '1',
    parentName: 'Mr. Rajesh Kumar',
    studentName: 'Rahul Kumar',
    grade: 'Grade 10-A',
    whatsapp: '9876543210',
    email: 'rajesh.kumar@email.com',
    relationship: 'Father',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh'
  },
  {
    id: '2',
    parentName: 'Mrs. Priya Sharma',
    studentName: 'Ananya Sharma',
    grade: 'Grade 10-A',
    whatsapp: '9876543211',
    email: 'priya.sharma@email.com',
    relationship: 'Mother',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya'
  },
  {
    id: '3',
    parentName: 'Mr. Amit Patel',
    studentName: 'Krish Patel',
    grade: 'Grade 10-B',
    whatsapp: '9876543212',
    email: 'amit.patel@email.com',
    relationship: 'Father',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit'
  },
  {
    id: '4',
    parentName: 'Mrs. Sneha Gupta',
    studentName: 'Aarav Gupta',
    grade: 'Grade 10-B',
    whatsapp: '9876543213',
    email: 'sneha.gupta@email.com',
    relationship: 'Mother',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha'
  },
];

export default function ParentCommunication() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockParentContacts.filter(contact =>
    contact.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Parent Communication</h1>
          <p className="text-muted-foreground mt-1">Communicate with parents via WhatsApp</p>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">WhatsApp Communication</h3>
                <p className="text-sm text-blue-700">
                  All parent communication is now done via WhatsApp for instant and direct messaging. 
                  Click the "Chat on WhatsApp" button next to any parent to start a conversation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Parent Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by parent name, student name, or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={contact.avatar}
                      alt={contact.parentName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{contact.parentName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Student: {contact.studentName} • {contact.grade}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>+91 {contact.whatsapp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {contact.relationship}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
                    <WhatsAppButton
                      phoneNumber={contact.whatsapp}
                      message={`Hello ${contact.parentName}, this is regarding ${contact.studentName}.`}
                      label="Chat on WhatsApp"
                      size="sm"
                    />
                  </div>
                </div>
              ))}

              {filteredContacts.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No parents found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Message Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Message Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📚 Absence Alert</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {WHATSAPP_TEMPLATES.ABSENCE_ALERT('[Student Name]', new Date().toLocaleDateString())}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use this template when sending absence notifications to parents
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">💰 Fee Reminder</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {WHATSAPP_TEMPLATES.FEE_REMINDER('[Student Name]', '[Amount]', '[Due Date]')}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use this template for fee payment reminders
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📝 Assignment Posted</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {WHATSAPP_TEMPLATES.ASSIGNMENT_POSTED('[Student Name]', '[Subject]', '[Due Date]')}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use this template when new assignments are posted
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🏆 Exam Results</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {WHATSAPP_TEMPLATES.EXAM_RESULTS('[Student Name]', '[Exam Name]', 85)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use this template when exam results are published
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🤝 PTM Invitation</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {WHATSAPP_TEMPLATES.PTM_INVITATION('[Student Name]', '[Date]', '[Time]')}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use this template for Parent-Teacher Meeting invitations
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📢 General Announcement</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {WHATSAPP_TEMPLATES.GENERAL_ANNOUNCEMENT('[Title]', '[Content]')}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use this template for general announcements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
