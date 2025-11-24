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
import { Calendar as CalendarIcon, Plus, Download, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';

const mockHolidays = [
  { id: '1', name: 'Independence Day', date: '2024-08-15', type: 'public', description: 'National Holiday' },
  { id: '2', name: 'Diwali Break', date: '2024-11-01', endDate: '2024-11-05', type: 'school', description: 'Festival Holiday' },
  { id: '3', name: 'Christmas', date: '2024-12-25', type: 'public', description: 'National Holiday' },
  { id: '4', name: 'Winter Break', date: '2024-12-28', endDate: '2025-01-02', type: 'school', description: 'Winter Vacation' },
];

const mockUpcomingEvents = [
  { id: '1', name: 'Annual Sports Day', date: '2024-12-15', type: 'event', daysUntil: 25 },
  { id: '2', name: 'Parent-Teacher Meeting', date: '2024-12-20', type: 'ptm', daysUntil: 30 },
  { id: '3', name: 'Fee Due Date', date: '2024-12-05', type: 'fee', daysUntil: 15 },
  { id: '4', name: 'Final Exams Begin', date: '2025-01-10', type: 'exam', daysUntil: 51 },
];

export default function CalendarManagement() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getTypeColor = (type: string) => {
    const colors = {
      public: 'bg-green-500/10 text-green-700 dark:text-green-400',
      school: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      event: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      exam: 'bg-red-500/10 text-red-700 dark:text-red-400',
      ptm: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      fee: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    };
    return colors[type as keyof typeof colors] || '';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Academic Calendar</h1>
            <p className="text-muted-foreground mt-1">Manage holidays, events, and important dates</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Holiday/Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Add Holiday or Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Event Name</Label>
                    <Input placeholder="e.g., Diwali Break" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public Holiday</SelectItem>
                          <SelectItem value="school">School Holiday</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="exam">Exam</SelectItem>
                          <SelectItem value="ptm">PTM</SelectItem>
                          <SelectItem value="fee">Fee Due Date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Applicable To</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All batches" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Batches</SelectItem>
                          <SelectItem value="grade8">Grade 8</SelectItem>
                          <SelectItem value="grade9">Grade 9</SelectItem>
                          <SelectItem value="grade10">Grade 10</SelectItem>
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
                      <Label>End Date (Optional)</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Add description..." rows={3} />
                  </div>
                  <Button className="w-full" onClick={() => toast.success('Holiday added successfully')}>
                    Add to Calendar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={() => toast.success('Calendar published')}>
              <Download className="w-4 h-4 mr-2" />
              Publish Calendar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>School Holidays</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Public Holidays</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Exams</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span>PTM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Events</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUpcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>In {event.daysUntil} days</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holiday List */}
        <Card>
          <CardHeader>
            <CardTitle>All Holidays & Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left font-medium">Name</th>
                    <th className="p-3 text-left font-medium">Date(s)</th>
                    <th className="p-3 text-left font-medium">Type</th>
                    <th className="p-3 text-left font-medium">Description</th>
                    <th className="p-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHolidays.map((holiday) => (
                    <tr key={holiday.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{holiday.name}</td>
                      <td className="p-3">
                        {new Date(holiday.date).toLocaleDateString()}
                        {holiday.endDate && ` - ${new Date(holiday.endDate).toLocaleDateString()}`}
                      </td>
                      <td className="p-3">
                        <Badge className={getTypeColor(holiday.type)}>
                          {holiday.type}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{holiday.description}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
