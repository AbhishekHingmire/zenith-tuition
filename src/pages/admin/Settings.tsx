import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockSubjects } from '@/data/mockData';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminSettings() {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    category: '',
  });

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubject = () => {
    setEditingSubject(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      category: '',
    });
    setDialogOpen(true);
  };

  const handleEditSubject = (subject: any) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      category: subject.category,
    });
    setDialogOpen(true);
  };

  const handleSaveSubject = () => {
    if (editingSubject) {
      setSubjects(subjects.map(s => 
        s.id === editingSubject.id ? { ...s, ...formData } : s
      ));
      toast.success('Subject updated successfully');
    } else {
      const newSubject = {
        ...formData,
        id: `sub${subjects.length + 1}`,
        status: 'active',
      };
      setSubjects([...subjects, newSubject]);
      toast.success('Subject added successfully');
    }
    setDialogOpen(false);
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjectToDelete(subjectId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      setSubjects(subjects.filter(s => s.id !== subjectToDelete));
      toast.success('Subject deleted successfully');
    }
    setDeleteDialogOpen(false);
    setSubjectToDelete(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure system settings and preferences</p>
        </div>

        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Subjects Management</h2>
                <p className="text-muted-foreground text-sm">Manage all subjects and courses</p>
              </div>
              <Button onClick={handleAddSubject} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle>All Subjects ({filteredSubjects.length})</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search subjects..." 
                      className="pl-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Subject Code</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Subject Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredSubjects.map((subject) => (
                        <tr key={subject.id} className="hover:bg-muted/50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <BookOpen className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-medium">{subject.code}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium">{subject.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{subject.description}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant="outline">{subject.category}</Badge>
                          </td>
                          <td className="px-4 py-4">
                            <Badge className="bg-secondary text-secondary-foreground">
                              {subject.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleEditSubject(subject)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteSubject(subject.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">System settings coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Subject Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Subject Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  placeholder="e.g., Science, Mathematics, Languages"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveSubject} className="bg-primary hover:bg-primary/90">
                {editingSubject ? 'Update' : 'Add'} Subject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the subject.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
