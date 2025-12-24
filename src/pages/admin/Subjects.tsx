import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Users, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const mockSubjects = [
  { id: '1', name: 'Mathematics', code: 'MATH', category: 'Core', grades: ['8', '9', '10'], teachers: 3, color: '#3b82f6', passingMarks: 40, maxMarks: 100 },
  { id: '2', name: 'Science', code: 'SCI', category: 'Core', grades: ['8', '9', '10'], teachers: 4, color: '#10b981', passingMarks: 40, maxMarks: 100 },
  { id: '3', name: 'English', code: 'ENG', category: 'Core', grades: ['8', '9', '10'], teachers: 2, color: '#f59e0b', passingMarks: 35, maxMarks: 100 },
  { id: '4', name: 'Social Studies', code: 'SST', category: 'Core', grades: ['8', '9', '10'], teachers: 2, color: '#8b5cf6', passingMarks: 35, maxMarks: 100 },
  { id: '5', name: 'Computer Science', code: 'CS', category: 'Elective', grades: ['9', '10'], teachers: 1, color: '#ec4899', passingMarks: 40, maxMarks: 100 },
];

const mockGrades = [
  { id: '1', name: 'Grade 8', subjects: 5, batches: 3, students: 120, active: true },
  { id: '2', name: 'Grade 9', subjects: 6, batches: 3, students: 135, active: true },
  { id: '3', name: 'Grade 10', subjects: 6, batches: 4, students: 150, active: true },
];

const mockGradingScheme = [
  { grade: 'A+', range: '90-100%', description: 'Outstanding' },
  { grade: 'A', range: '80-89%', description: 'Excellent' },
  { grade: 'B+', range: '70-79%', description: 'Very Good' },
  { grade: 'B', range: '60-69%', description: 'Good' },
  { grade: 'C', range: '50-59%', description: 'Average' },
  { grade: 'D', range: '40-49%', description: 'Pass' },
  { grade: 'F', range: '<40%', description: 'Fail' },
];

export default function SubjectsManagement() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Subject & Grade Management</h1>
            <p className="text-muted-foreground mt-1">Manage subjects, grades, and grading schemes</p>
          </div>
        </div>

        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="grades">Grades & Scheme</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-6">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                  <DialogHeader>
                    <DialogTitle>Add New Subject</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Subject Name</Label>
                        <Input placeholder="e.g., Mathematics" />
                      </div>
                      <div>
                        <Label>Subject Code</Label>
                        <Input placeholder="e.g., MATH" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="core">Core</SelectItem>
                            <SelectItem value="elective">Elective</SelectItem>
                            <SelectItem value="optional">Optional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Color Code</Label>
                        <Input type="color" defaultValue="#3b82f6" />
                      </div>
                    </div>
                    <div>
                      <Label>Applicable Grades (Select multiple)</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['8', '9', '10', '11', '12'].map((grade) => (
                          <Badge key={grade} variant="outline" className="cursor-pointer">
                            Grade {grade}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Passing Marks</Label>
                        <Input type="number" placeholder="40" />
                      </div>
                      <div>
                        <Label>Maximum Marks</Label>
                        <Input type="number" placeholder="100" />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Subject description..." rows={3} />
                    </div>
                    <Button className="w-full" onClick={() => toast.success('Subject added successfully')}>
                      Save Subject
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${subject.color}20` }}>
                          <BookOpen className="w-6 h-6" style={{ color: subject.color }} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{subject.code}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <Badge variant="outline">{subject.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Grades:</p>
                      <div className="flex flex-wrap gap-1">
                        {subject.grades.map((grade) => (
                          <Badge key={grade} variant="secondary" className="text-xs">
                            Grade {grade}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Teachers:</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">{subject.teachers}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Passing</p>
                        <p className="font-semibold">{subject.passingMarks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Max Marks</p>
                        <p className="font-semibold">{subject.maxMarks}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            {/* Grades List */}
            <Card>
              <CardHeader>
                <CardTitle>Grades/Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGrades.map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{grade.name}</h3>
                          <Badge variant={grade.active ? 'secondary' : 'outline'}>
                            {grade.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{grade.subjects} subjects</span>
                          <span>{grade.batches} batches</span>
                          <span>{grade.students} students</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Configure</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grading Scheme */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Grading Scheme Configuration</CardTitle>
                  <Button variant="outline" size="sm">Edit Scheme</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Grade</th>
                        <th className="p-3 text-left font-medium">Percentage Range</th>
                        <th className="p-3 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockGradingScheme.map((item, idx) => (
                        <tr key={idx} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <Badge className={item.grade === 'F' ? 'bg-destructive' : 'bg-primary'}>
                              {item.grade}
                            </Badge>
                          </td>
                          <td className="p-3 font-medium">{item.range}</td>
                          <td className="p-3 text-muted-foreground">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm"><span className="font-medium">Passing Marks:</span> 40%</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
