import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Palette, 
  Shield, 
  Info, 
  LogOut,
  Moon,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

export default function StudentSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [assignmentNotifs, setAssignmentNotifs] = useState(true);
  const [examNotifs, setExamNotifs] = useState(true);
  const [resultsNotifs, setResultsNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>WhatsApp Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates on WhatsApp</p>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-medium">Notification Types:</p>
              <div className="flex items-center justify-between">
                <Label className="font-normal">Assignments</Label>
                <Switch checked={assignmentNotifs} onCheckedChange={setAssignmentNotifs} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="font-normal">Exams</Label>
                <Switch checked={examNotifs} onCheckedChange={setExamNotifs} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="font-normal">Results</Label>
                <Switch checked={resultsNotifs} onCheckedChange={setResultsNotifs} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="w-5 h-5" />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default View</Label>
              <Select defaultValue="calendar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar">Calendar View</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button onClick={() => toast.success('Password changed successfully!')}>
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Info className="w-5 h-5" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">App Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <Separator />
            <Button variant="link" className="h-auto p-0">Terms & Conditions</Button>
            <Button variant="link" className="h-auto p-0">Privacy Policy</Button>
            <Button variant="link" className="h-auto p-0">Contact Support</Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Button variant="outline" className="w-full" onClick={() => toast.info('Logging out...')}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button variant="destructive" className="w-full" onClick={() => toast.info('Delete account request sent to admin')}>
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
