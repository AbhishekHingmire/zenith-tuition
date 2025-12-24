import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Plus, Shield, Edit, Trash2, Key } from 'lucide-react';
import { toast } from 'sonner';

const mockAdminUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', status: 'active', lastLogin: '2024-11-20' },
  { id: '2', name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-11-19' },
  { id: '3', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Accountant', status: 'active', lastLogin: '2024-11-18' },
];

const rolePermissions = {
  'Super Admin': ['All Permissions'],
  'Admin': ['View Students', 'Add/Edit Students', 'View Fees', 'Manage Fees', 'View Reports', 'Manage Teachers', 'View Analytics'],
  'Accountant': ['View Fees', 'Manage Fees', 'Financial Reports', 'Expense Tracking'],
};

export default function UserManagement() {
  const [selectedRole, setSelectedRole] = useState('Admin');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">User Management & Roles</h1>
            <p className="text-muted-foreground mt-1">Manage admin users and their permissions</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Admin User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
              <DialogHeader>
                <DialogTitle>Add New Admin User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 9876543210" />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Accountant">Accountant</SelectItem>
                      <SelectItem value="Custom">Custom Role</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Username</Label>
                    <Input placeholder="johndoe" />
                  </div>
                  <div>
                    <Label>Temporary Password</Label>
                    <Input type="password" placeholder="Auto-generate" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium mb-3">Permissions for {selectedRole}:</p>
                  <div className="space-y-2">
                    {rolePermissions[selectedRole as keyof typeof rolePermissions]?.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox id={permission} defaultChecked />
                        <Label htmlFor={permission} className="text-sm font-normal">{permission}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={() => toast.success('Admin user created. Welcome email sent.')}>
                  Create User & Send Credentials
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="users">Admin Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Admin User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Name</th>
                        <th className="p-3 text-left font-medium">Email</th>
                        <th className="p-3 text-left font-medium">Role</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Last Login</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAdminUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{user.name}</td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">
                            <Badge variant={user.role === 'Super Admin' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                              {user.role !== 'Super Admin' && (
                                <>
                                  <Button variant="ghost" size="sm">
                                    <Key className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-destructive">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Super Admin Role */}
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Super Admin</CardTitle>
                      <p className="text-xs text-muted-foreground">Full system access</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    • All permissions<br />
                    • Can create other admins<br />
                    • Can change system settings<br />
                    • Complete control
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    Cannot Edit
                  </Button>
                </CardContent>
              </Card>

              {/* Admin Role */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Admin</CardTitle>
                      <p className="text-xs text-muted-foreground">Limited access</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    • Student management<br />
                    • Fee management<br />
                    • Reports viewing<br />
                    • Cannot delete data
                  </div>
                  <Button variant="outline" className="w-full">
                    <Edit className="w-3 h-3 mr-2" />
                    Edit Permissions
                  </Button>
                </CardContent>
              </Card>

              {/* Accountant Role */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Accountant</CardTitle>
                      <p className="text-xs text-muted-foreground">Finance only</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    • Fee management only<br />
                    • Financial reports<br />
                    • Expense tracking<br />
                    • No academic data access
                  </div>
                  <Button variant="outline" className="w-full">
                    <Edit className="w-3 h-3 mr-2" />
                    Edit Permissions
                  </Button>
                </CardContent>
              </Card>

              {/* Custom Role */}
              <Card className="border-dashed">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-lg">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Custom Role</CardTitle>
                      <p className="text-xs text-muted-foreground">Create new role</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-3 h-3 mr-2" />
                    Create Custom Role
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Permissions Reference */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Available Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'View Students', 'Add/Edit Students', 'Delete Students',
                    'View Fees', 'Manage Fees', 'View Reports',
                    'Manage Teachers', 'View Analytics', 'System Settings',
                    'Manage Batches', 'Manage Subjects', 'Manage Exams',
                    'Send WhatsApp Notifications', 'Generate Certificates', 'Manage Calendar'
                  ].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2 p-2 border rounded">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
