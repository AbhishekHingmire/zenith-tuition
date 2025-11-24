import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Plus, ArrowRight, Users, BookOpen, IndianRupee, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const mockCurrentYear = {
  year: '2024-2025',
  startDate: '2024-04-01',
  endDate: '2025-03-31',
  status: 'active',
  progress: 65,
  daysRemaining: 105
};

const mockStudentsForPromotion = [
  { id: '1', name: 'Rahul Sharma', currentGrade: 'Grade 8', rollNo: '801', attendance: 92, avgScore: 85 },
  { id: '2', name: 'Priya Patel', currentGrade: 'Grade 8', rollNo: '802', attendance: 88, avgScore: 78 },
  { id: '3', name: 'Amit Kumar', currentGrade: 'Grade 8', rollNo: '803', attendance: 75, avgScore: 65 },
  { id: '4', name: 'Sara Khan', currentGrade: 'Grade 9', rollNo: '901', attendance: 95, avgScore: 92 },
  { id: '5', name: 'Vikram Singh', currentGrade: 'Grade 10', rollNo: '1001', attendance: 90, avgScore: 88 },
];

export default function AcademicYear() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [rolloverStep, setRolloverStep] = useState(1);

  const handlePromoteStudents = () => {
    toast.success(`${selectedStudents.length} students promoted successfully`);
    setSelectedStudents([]);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Academic Year Management</h1>
            <p className="text-muted-foreground mt-1">Manage academic years and student promotions</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Academic Year
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Academic Year</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Academic Year</Label>
                    <Input placeholder="2025-2026" />
                  </div>
                  <div>
                    <Label>Number of Terms</Label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Term</SelectItem>
                        <SelectItem value="2">2 Semesters</SelectItem>
                        <SelectItem value="3">3 Terms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="copy-settings" />
                  <Label htmlFor="copy-settings">Copy settings from previous year</Label>
                </div>
                <Button className="w-full">Create Academic Year</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current Academic Year */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Current Academic Year
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{mockCurrentYear.year}</p>
              </div>
              <Badge variant="secondary" className="bg-secondary/20">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-semibold">{new Date(mockCurrentYear.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-semibold">{new Date(mockCurrentYear.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="font-semibold text-primary">{mockCurrentYear.daysRemaining} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="font-semibold">{mockCurrentYear.progress}%</p>
              </div>
            </div>
            <div>
              <Progress value={mockCurrentYear.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Year Rollover Wizard */}
        <Card>
          <CardHeader>
            <CardTitle>Year Rollover Wizard</CardTitle>
            <p className="text-sm text-muted-foreground">Manage end-of-year transition and student promotions</p>
          </CardHeader>
          <CardContent>
            <Tabs value={`step${rolloverStep}`} onValueChange={(v) => setRolloverStep(parseInt(v.replace('step', '')))}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="step1">Review</TabsTrigger>
                <TabsTrigger value="step2">Promotion</TabsTrigger>
                <TabsTrigger value="step3">Batches</TabsTrigger>
                <TabsTrigger value="step4">Fees</TabsTrigger>
                <TabsTrigger value="step5">Archive</TabsTrigger>
              </TabsList>

              <TabsContent value="step1" className="space-y-4">
                <h3 className="font-semibold">Review Current Year</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Students</p>
                          <p className="text-2xl font-bold">450</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <IndianRupee className="w-8 h-8 text-secondary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Fee Collection</p>
                          <p className="text-2xl font-bold">95%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Exams Done</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-8 h-8 text-destructive" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pending Tasks</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Button onClick={() => setRolloverStep(2)} className="w-full">
                  Continue to Promotion <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </TabsContent>

              <TabsContent value="step2" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Student Promotion</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudents(mockStudentsForPromotion.map(s => s.id))}>
                      Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudents([])}>
                      Clear
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left">
                          <Checkbox 
                            checked={selectedStudents.length === mockStudentsForPromotion.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStudents(mockStudentsForPromotion.map(s => s.id));
                              } else {
                                setSelectedStudents([]);
                              }
                            }}
                          />
                        </th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Current Grade</th>
                        <th className="p-3 text-left">Next Grade</th>
                        <th className="p-3 text-left">Attendance</th>
                        <th className="p-3 text-left">Avg Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudentsForPromotion.map((student) => (
                        <tr key={student.id} className="border-t">
                          <td className="p-3">
                            <Checkbox 
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedStudents([...selectedStudents, student.id]);
                                } else {
                                  setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                                }
                              }}
                            />
                          </td>
                          <td className="p-3 font-medium">{student.name}</td>
                          <td className="p-3">{student.currentGrade}</td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {student.currentGrade === 'Grade 10' ? 'Alumni' : `Grade ${parseInt(student.currentGrade.split(' ')[1]) + 1}`}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={student.attendance >= 75 ? 'secondary' : 'destructive'}>
                              {student.attendance}%
                            </Badge>
                          </td>
                          <td className="p-3">{student.avgScore}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setRolloverStep(1)}>Back</Button>
                  <Button onClick={handlePromoteStudents} disabled={selectedStudents.length === 0} className="flex-1">
                    Promote {selectedStudents.length} Students <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="step3" className="space-y-4">
                <h3 className="font-semibold">Batch Reorganization</h3>
                <p className="text-sm text-muted-foreground">Create new batches and assign students for the new academic year</p>
                <Button className="w-full">Configure Batches</Button>
                <Button variant="outline" onClick={() => setRolloverStep(2)}>Back</Button>
              </TabsContent>

              <TabsContent value="step4" className="space-y-4">
                <h3 className="font-semibold">Fee Structure Update</h3>
                <p className="text-sm text-muted-foreground">Update fee structure for the new academic year</p>
                <Button className="w-full">Configure Fee Structure</Button>
                <Button variant="outline" onClick={() => setRolloverStep(3)}>Back</Button>
              </TabsContent>

              <TabsContent value="step5" className="space-y-4">
                <h3 className="font-semibold">Archive Previous Year</h3>
                <p className="text-sm text-muted-foreground">Archive old data and generate annual reports</p>
                <Button className="w-full" variant="destructive">Complete Rollover</Button>
                <Button variant="outline" onClick={() => setRolloverStep(4)}>Back</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
