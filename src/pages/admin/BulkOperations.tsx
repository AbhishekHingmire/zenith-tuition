import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Download, MessageSquare, Users, IndianRupee, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function BulkOperations() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [messageText, setMessageText] = useState('');
  const [recipientCount, setRecipientCount] = useState(0);

  const handleImportStudents = () => {
    toast.success('Importing students... Preview will be shown');
  };

  const handleExportStudents = () => {
    toast.success('Exporting student data...');
  };

  const handleSendBulkMessage = () => {
    if (recipientCount === 0) {
      toast.error('Please select recipients');
      return;
    }
    if (!messageText) {
      toast.error('Please enter a message');
      return;
    }
    toast.success(`Message sent to ${recipientCount} recipients`);
    setMessageText('');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Bulk Operations</h1>
          <p className="text-muted-foreground mt-1">Import, export, and manage students in bulk</p>
        </div>

        <Tabs defaultValue="import-export" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="import-export">Import/Export</TabsTrigger>
            <TabsTrigger value="bulk-message">Bulk Messaging</TabsTrigger>
            <TabsTrigger value="bulk-update">Bulk Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="import-export" className="space-y-6">
            {/* Import Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Import Students from Excel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Required Columns:</p>
                  <p className="text-sm text-muted-foreground">
                    Name, DOB, Gender, Admission Number, Father Name, Mother Name, Contact, Batch, Grade, Fee Structure, Admission Date
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample Template
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Excel File
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Student Data</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Select Excel File</Label>
                          <Input type="file" accept=".xlsx,.xls,.csv" />
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            File will be validated before import. Errors will be highlighted for correction.
                          </p>
                        </div>
                        <Button className="w-full" onClick={handleImportStudents}>
                          Preview Import
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Export Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Student Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-3 block">Select Fields to Export</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Name', 'Admission No', 'DOB', 'Gender', 'Grade', 'Batch', 'Contact', 'Email', 'Address', 'Parent Details', 'Fee Structure', 'Attendance %'].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox id={field} defaultChecked />
                        <Label htmlFor={field} className="text-sm font-normal">{field}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Export Format</Label>
                  <Select defaultValue="excel">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleExportStudents}>
                  <Download className="w-4 h-4 mr-2" />
                  Export All Students
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk-message" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Bulk SMS/WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Recipients</Label>
                  <Select onValueChange={(value) => {
                    if (value === 'all') setRecipientCount(450);
                    else if (value === 'pending-fees') setRecipientCount(45);
                    else if (value === 'low-attendance') setRecipientCount(30);
                    else setRecipientCount(0);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose recipient group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students (450)</SelectItem>
                      <SelectItem value="grade8">Grade 8 Students (120)</SelectItem>
                      <SelectItem value="grade9">Grade 9 Students (135)</SelectItem>
                      <SelectItem value="grade10">Grade 10 Students (150)</SelectItem>
                      <SelectItem value="pending-fees">Students with Pending Fees (45)</SelectItem>
                      <SelectItem value="low-attendance">Students with &lt;75% Attendance (30)</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {recipientCount > 0 && (
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium">
                      Selected Recipients: <span className="text-primary">{recipientCount} students</span>
                    </p>
                  </div>
                )}

                <div>
                  <Label>Message Type</Label>
                  <Select defaultValue="sms">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="both">Both SMS & WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Message Text</Label>
                    <span className="text-xs text-muted-foreground">{messageText.length}/160 characters</span>
                  </div>
                  <Textarea 
                    placeholder="Type your message here..."
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Use variables: {'{student_name}'}, {'{parent_name}'}, {'{admission_no}'}
                  </p>
                </div>

                <div>
                  <Label>Message Templates</Label>
                  <Select onValueChange={(value) => setMessageText(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dear Parent, Your child {student_name} was absent today. Please ensure regular attendance.">Absence Alert</SelectItem>
                      <SelectItem value="Dear Parent, Fee payment for {student_name} is pending. Please pay at the earliest.">Fee Reminder</SelectItem>
                      <SelectItem value="Dear Parent, PTM scheduled on [DATE] for {student_name}. Please attend.">PTM Reminder</SelectItem>
                      <SelectItem value="Dear Parent, Exams begin from [DATE]. Ensure {student_name} is well prepared.">Exam Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Schedule Send (Optional)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" />
                    <Input type="time" />
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    <strong>Cost Estimate:</strong> {recipientCount} messages × ₹0.50 = ₹{(recipientCount * 0.5).toFixed(2)}
                  </p>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleSendBulkMessage}
                  disabled={recipientCount === 0 || !messageText}
                >
                  Send to {recipientCount} Recipients
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk-update" className="space-y-6">
            {/* Bulk Fee Waiver */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  Apply Bulk Fee Discount/Waiver
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Students</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose students" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="grade8">Grade 8 Only</SelectItem>
                      <SelectItem value="siblings">Students with Siblings</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Discount Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Discount Value</Label>
                    <Input type="number" placeholder="10" />
                  </div>
                </div>
                <div>
                  <Label>Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="merit">Merit-based</SelectItem>
                      <SelectItem value="financial">Financial Aid</SelectItem>
                      <SelectItem value="sibling">Sibling Discount</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Applicable To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Month Only</SelectItem>
                      <SelectItem value="year">Entire Academic Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={() => toast.success('Discount applied successfully')}>
                  Apply Discount to Selected Students
                </Button>
              </CardContent>
            </Card>

            {/* Bulk Status Update */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Bulk Status Update
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Students</Label>
                  <Input placeholder="Search or select students..." />
                </div>
                <div>
                  <Label>Update Action</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Mark as Active</SelectItem>
                      <SelectItem value="inactive">Mark as Inactive</SelectItem>
                      <SelectItem value="change-batch">Change Batch</SelectItem>
                      <SelectItem value="change-grade">Change Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={() => toast.success('Status updated successfully')}>
                  Update Selected Students
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
