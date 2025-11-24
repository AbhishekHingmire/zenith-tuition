import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Zap, IndianRupee, Users, Calendar, Award, Bell, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Automation() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Automation Settings</h1>
            <p className="text-muted-foreground mt-1">Configure automated workflows and rules</p>
          </div>
          <Button onClick={() => toast.success('Automation settings saved')}>Save All Settings</Button>
        </div>

        {/* Fee Automation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5" />
              Fee Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Auto-generate invoices on 1st of every month</p>
                <p className="text-sm text-muted-foreground">Automatically create invoices for all active students</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Auto-calculate late fee after due date</p>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <Label className="text-xs">Days overdue</Label>
                    <Input type="number" defaultValue="10" className="w-20 h-8" />
                  </div>
                  <div>
                    <Label className="text-xs">Late fee amount</Label>
                    <Input type="number" defaultValue="100" className="w-24 h-8" placeholder="₹" />
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Send fee reminder before due date</p>
                <div className="mt-2">
                  <Label className="text-xs">Days before</Label>
                  <Input type="number" defaultValue="3" className="w-20 h-8" />
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Send overdue notice immediately</p>
                <p className="text-sm text-muted-foreground">Alert parents when fee becomes overdue</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Escalate to admin if overdue for 30+ days</p>
                <p className="text-sm text-muted-foreground">Notify admin for long-pending payments</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Attendance Automation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Attendance Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Send absence alert to parent within 1 hour</p>
                <p className="text-sm text-muted-foreground">Immediate notification when student is absent</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Send weekly attendance summary to parents</p>
                <div className="mt-2">
                  <Label className="text-xs">Send on</Label>
                  <Input defaultValue="Sunday" className="w-32 h-8" />
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Flag students with attendance below threshold</p>
                <div className="mt-2">
                  <Label className="text-xs">Threshold</Label>
                  <Input type="number" defaultValue="75" className="w-20 h-8" placeholder="%" />
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Remind teachers who haven't marked attendance</p>
                <div className="mt-2">
                  <Label className="text-xs">Remind at</Label>
                  <Input type="time" defaultValue="11:00" className="w-28 h-8" />
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Birthday Wishes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Birthday Wishes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Auto-send birthday wishes to students</p>
                <p className="text-sm text-muted-foreground">Via WhatsApp/SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Auto-send birthday wishes to teachers</p>
                <p className="text-sm text-muted-foreground">Via WhatsApp/SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label>Message Template</Label>
              <Textarea 
                defaultValue="Dear {name}, Wishing you a very Happy Birthday! May this day bring you joy and happiness. - {tuition_name}"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Assignment Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Assignment Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Remind students 24 hours before due date</p>
                <p className="text-sm text-muted-foreground">First reminder</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Remind students 1 hour before due date</p>
                <p className="text-sm text-muted-foreground">Final reminder</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Alert teacher of pending grading</p>
                <div className="mt-2">
                  <Label className="text-xs">After days</Label>
                  <Input type="number" defaultValue="5" className="w-20 h-8" />
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Certificate Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certificate Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Auto-generate attendance certificate if student requests</p>
                <div className="mt-2 space-y-2">
                  <div>
                    <Label className="text-xs">Minimum attendance required</Label>
                    <Input type="number" defaultValue="80" className="w-20 h-8" placeholder="%" />
                  </div>
                  <div>
                    <Label className="text-xs">Auto-email to parent</Label>
                    <Switch defaultChecked className="ml-2" />
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Inactive Student Detection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Inactive Student Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Mark student inactive if absent consecutively</p>
                <div className="mt-2">
                  <Label className="text-xs">Days absent</Label>
                  <Input type="number" defaultValue="30" className="w-20 h-8" />
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Send notification to admin for review</p>
                <p className="text-sm text-muted-foreground">Before marking inactive</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Promotion Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Promotion Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Remind admin to start promotion process</p>
                <div className="mt-2">
                  <Label className="text-xs">Days before year-end</Label>
                  <Input type="number" defaultValue="45" className="w-20 h-8" />
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
