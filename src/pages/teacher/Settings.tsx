import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Lock, Palette } from 'lucide-react';
import { toast } from 'sonner';

export default function TeacherSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [whatsappNotif, setWhatsappNotif] = useState(true);
  const [assignmentReminders, setAssignmentReminders] = useState(true);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    toast.success('Password changed successfully');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input defaultValue="Dr. John Smith" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" defaultValue="john.smith@zenith.com" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <Label>Subject Specialization</Label>
                    <Input defaultValue="Mathematics, Physics" />
                  </div>
                </div>
                <div>
                  <Label>Bio</Label>
                  <Input defaultValue="M.Sc. in Mathematics with 10+ years of teaching experience" />
                </div>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">WhatsApp Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified on WhatsApp</p>
                  </div>
                  <Switch checked={whatsappNotif} onCheckedChange={setWhatsappNotif} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Assignment Reminders</p>
                    <p className="text-sm text-muted-foreground">Remind about pending grading</p>
                  </div>
                  <Switch checked={assignmentReminders} onCheckedChange={setAssignmentReminders} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input type="password" />
                </div>
                <Button onClick={handleChangePassword}>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
