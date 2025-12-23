import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Building2, CreditCard, MessageSquare, Shield, Plug, Palette } from 'lucide-react';
import { toast } from 'sonner';

export default function SystemSettings() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground mt-1">Configure your tuition management system</p>
          </div>
          <Button onClick={() => toast.success('Settings saved successfully')}>Save All Changes</Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 lg:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Tuition Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Tuition Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>Tuition Name</Label>
                    <Input defaultValue="Bright Future Academy" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Logo Upload</Label>
                    <Input type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground mt-1">Max 2MB, square recommended</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Tagline</Label>
                    <Input placeholder="Excellence in Education" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Address</Label>
                    <Textarea rows={2} placeholder="Full address..." />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input placeholder="Mumbai" />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input placeholder="Maharashtra" />
                  </div>
                  <div>
                    <Label>PIN Code</Label>
                    <Input placeholder="400001" />
                  </div>
                  <div>
                    <Label>Contact Phone</Label>
                    <Input placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input type="email" placeholder="info@tuition.com" />
                  </div>
                  <div>
                    <Label>Website URL</Label>
                    <Input placeholder="https://tuition.com" />
                  </div>
                  <div>
                    <Label>Established Year</Label>
                    <Input type="number" placeholder="2010" />
                  </div>
                  <div>
                    <Label>Registration Number</Label>
                    <Input placeholder="REG/2010/12345" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Branding</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" defaultValue="#3b82f6" className="w-16" />
                        <Input defaultValue="#3b82f6" />
                      </div>
                    </div>
                    <div>
                      <Label>Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" defaultValue="#10b981" className="w-16" />
                        <Input defaultValue="#10b981" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Settings */}
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Academic Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Academic Year</Label>
                    <Select defaultValue="2024-2025">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Passing Marks Percentage</Label>
                    <Input type="number" defaultValue="40" />
                  </div>
                  <div>
                    <Label>Minimum Attendance Required</Label>
                    <Input type="number" defaultValue="75" />
                  </div>
                </div>
                <div className="pt-4 border-t space-y-3">
                  <h3 className="font-semibold">Enable Features</h3>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Online Exams</p>
                      <p className="text-sm text-muted-foreground">Allow students to take exams online</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Assignment Submissions</p>
                      <p className="text-sm text-muted-foreground">Students can submit assignments digitally</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Student Doubt Forum</p>
                      <p className="text-sm text-muted-foreground">Q&A section for students</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fee Settings */}
          <TabsContent value="fees">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Fee Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Default Fee Due Date</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 5, 10, 15, 20].map((day) => (
                          <SelectItem key={day} value={day.toString()}>{day}th of month</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Late Fee Amount (₹)</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label>Late Fee After (Days)</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label>Enable Payment Gateway</Label>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Payment Gateway</Label>
                  <Select defaultValue="razorpay">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="payu">PayU</SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Accepted Payment Modes</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {['Cash', 'Online Payment', 'Cheque', 'Bank Transfer'].map((mode) => (
                      <div key={mode} className="flex items-center space-x-2">
                        <Switch id={mode} defaultChecked />
                        <Label htmlFor={mode}>{mode}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Auto-generate Invoices</Label>
                    <p className="text-sm text-muted-foreground">On 1st of every month</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication */}
          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Communication Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">SMS Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>SMS Provider</Label>
                      <Select defaultValue="twilio">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="twilio">Twilio</SelectItem>
                          <SelectItem value="msg91">MSG91</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>API Key</Label>
                      <Input type="password" defaultValue="••••••••••••" />
                    </div>
                    <div>
                      <Label>Sender ID</Label>
                      <Input defaultValue="TUTCLS" maxLength={6} />
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">SMS Credits Remaining: <strong>5,000</strong></p>
                      <Button variant="link" className="p-0 h-auto text-sm">Recharge Credits</Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">WhatsApp Business API</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Provider</Label>
                      <Select defaultValue="gupshup">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gupshup">Gupshup</SelectItem>
                          <SelectItem value="kaleyra">Kaleyra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>API Key</Label>
                      <Input type="password" defaultValue="••••••••••••" />
                    </div>
                    <div>
                      <Label>Verified Business Number</Label>
                      <Input defaultValue="+91-XXXXXXXXXX" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Email Settings (SMTP)</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>SMTP Server</Label>
                        <Input defaultValue="smtp.gmail.com" />
                      </div>
                      <div>
                        <Label>SMTP Port</Label>
                        <Input defaultValue="587" />
                      </div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" defaultValue="tuition@example.com" />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input type="password" defaultValue="••••••••" />
                    </div>
                    <Button variant="outline">Test Email Configuration</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Password Policy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label>Minimum length: 8 characters</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label>Require uppercase letters</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label>Require numbers</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Label>Require special characters</Label>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>Password expiry (days)</Label>
                      <Input type="number" defaultValue="90" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label>Enforce 2FA for admin users</Label>
                      <p className="text-sm text-muted-foreground">Required for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Session Management</h3>
                  <div>
                    <Label>Auto-logout after inactivity (minutes)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Data Backup</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Auto-backup frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline">Manual Backup Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plug className="w-5 h-5" />
                  Integration Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Google Workspace</h3>
                        <p className="text-sm text-muted-foreground">Calendar sync, Meet, Drive</p>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Zoom</h3>
                        <p className="text-sm text-muted-foreground">Online class meetings</p>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Razorpay</h3>
                        <p className="text-sm text-muted-foreground">Payment gateway</p>
                      </div>
                      <Button variant="secondary">Connected ✓</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Time Format</Label>
                  <Select defaultValue="12">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>First Day of Week</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
