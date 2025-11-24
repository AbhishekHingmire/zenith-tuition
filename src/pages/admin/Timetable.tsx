import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Plus, Save, Copy } from 'lucide-react';
import { toast } from 'sonner';

const mockTimeSlots = [
  { id: '1', name: 'Period 1', startTime: '08:00', endTime: '09:00', type: 'class' },
  { id: '2', name: 'Period 2', startTime: '09:00', endTime: '10:00', type: 'class' },
  { id: '3', name: 'Break', startTime: '10:00', endTime: '10:15', type: 'break' },
  { id: '4', name: 'Period 3', startTime: '10:15', endTime: '11:15', type: 'class' },
  { id: '5', name: 'Period 4', startTime: '11:15', endTime: '12:15', type: 'class' },
  { id: '6', name: 'Lunch', startTime: '12:15', endTime: '13:00', type: 'lunch' },
  { id: '7', name: 'Period 5', startTime: '13:00', endTime: '14:00', type: 'class' },
  { id: '8', name: 'Period 6', startTime: '14:00', endTime: '15:00', type: 'class' },
];

const mockTimetable = {
  Monday: {
    '1': { subject: 'Mathematics', teacher: 'Mr. Sharma' },
    '2': { subject: 'Science', teacher: 'Mrs. Patel' },
    '4': { subject: 'English', teacher: 'Ms. Khan' },
    '5': { subject: 'Social Studies', teacher: 'Mr. Singh' },
    '7': { subject: 'Computer Science', teacher: 'Mr. Kumar' },
    '8': { subject: 'Mathematics', teacher: 'Mr. Sharma' },
  },
  Tuesday: {
    '1': { subject: 'Science', teacher: 'Mrs. Patel' },
    '2': { subject: 'Mathematics', teacher: 'Mr. Sharma' },
    '4': { subject: 'English', teacher: 'Ms. Khan' },
    '5': { subject: 'Physical Education', teacher: 'Mr. Verma' },
    '7': { subject: 'Social Studies', teacher: 'Mr. Singh' },
    '8': { subject: 'Computer Science', teacher: 'Mr. Kumar' },
  },
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TimetableManagement() {
  const [selectedBatch, setSelectedBatch] = useState('Grade 10-A');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Timetable Configuration</h1>
            <p className="text-muted-foreground mt-1">Manage class timings and batch timetables</p>
          </div>
        </div>

        <Tabs defaultValue="slots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="slots">Time Slots</TabsTrigger>
            <TabsTrigger value="timetable">Batch Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="slots" className="space-y-6">
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Time Slot
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Time Slot</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Slot Name</Label>
                      <Input placeholder="e.g., Period 1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <Input type="time" />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input type="time" />
                      </div>
                    </div>
                    <div>
                      <Label>Slot Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class">Class</SelectItem>
                          <SelectItem value="break">Break</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="lab">Lab</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={() => toast.success('Time slot added successfully')}>
                      Save Slot
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Time Slots Master
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockTimeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Badge variant={slot.type === 'break' || slot.type === 'lunch' ? 'outline' : 'secondary'}>
                          {slot.type.toUpperCase()}
                        </Badge>
                        <div>
                          <p className="font-semibold">{slot.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {slot.startTime} - {slot.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetable" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 w-full">
                <Label>Select Batch</Label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 8-A">Grade 8-A</SelectItem>
                    <SelectItem value="Grade 9-A">Grade 9-A</SelectItem>
                    <SelectItem value="Grade 10-A">Grade 10-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy from Template
                </Button>
                <Button className="flex-1 sm:flex-none">
                  <Save className="w-4 h-4 mr-2" />
                  Save & Publish
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Timetable Builder - {selectedBatch}</CardTitle>
                <p className="text-sm text-muted-foreground">Drag and drop subjects to time slots</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-3 text-left border font-medium min-w-[120px]">Time</th>
                        {days.map((day) => (
                          <th key={day} className="p-3 text-left border font-medium min-w-[150px]">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockTimeSlots.map((slot) => (
                        <tr key={slot.id}>
                          <td className="p-3 border font-medium bg-muted/50">
                            <div>
                              <p className="text-sm">{slot.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {slot.startTime}-{slot.endTime}
                              </p>
                            </div>
                          </td>
                          {days.map((day) => (
                            <td key={`${day}-${slot.id}`} className="p-2 border">
                              {slot.type === 'break' || slot.type === 'lunch' ? (
                                <div className="p-2 bg-muted/30 rounded text-center text-sm text-muted-foreground">
                                  {slot.type === 'break' ? 'Break' : 'Lunch Break'}
                                </div>
                              ) : mockTimetable[day as keyof typeof mockTimetable]?.[slot.id] ? (
                                <div className="p-2 bg-primary/10 rounded hover:bg-primary/20 cursor-pointer transition-colors">
                                  <p className="font-medium text-sm">
                                    {mockTimetable[day as keyof typeof mockTimetable][slot.id].subject}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {mockTimetable[day as keyof typeof mockTimetable][slot.id].teacher}
                                  </p>
                                </div>
                              ) : (
                                <div className="p-2 border-2 border-dashed border-muted rounded text-center text-sm text-muted-foreground hover:border-primary/50 cursor-pointer transition-colors">
                                  + Add
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
