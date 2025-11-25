import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Clock, Users, CheckSquare, BookOpen, Bell, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const todayClasses = [
  { batch: 'Grade 10 - Mathematics', time: '9:00 AM - 10:30 AM', students: 25, room: 'Room 101' },
  { batch: 'Grade 9 - Science', time: '11:00 AM - 12:30 PM', students: 28, room: 'Room 203' },
  { batch: 'Grade 11 - Physics', time: '2:00 PM - 3:30 PM', students: 22, room: 'Lab 1' },
];

const pendingTasks = [
  { task: 'Grade Math Assignment - Grade 10', count: 25, dueDate: 'Today', link: '/teacher/assignments' },
  { task: 'Mark Attendance - Science Batch', count: 1, dueDate: 'Today', link: '/teacher/attendance' },
  { task: 'Enter Marks - Unit Test', count: 28, dueDate: 'Tomorrow', link: '/teacher/marks-entry' },
];

const announcements = [
  { title: 'Parent-Teacher Meeting', date: '2024-02-15', priority: 'high' },
  { title: 'Mid-term Exams Schedule Released', date: '2024-02-10', priority: 'medium' },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [classesOpen, setClassesOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(true);
  const [announcementsOpen, setAnnouncementsOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Good morning! Here's your schedule for today.</p>
        </div>

        {/* Today's Classes - Collapsible */}
        <Collapsible open={classesOpen} onOpenChange={setClassesOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    My Classes Today
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${classesOpen ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {todayClasses.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground truncate">{cls.batch}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {cls.time}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {cls.students} students
                          </span>
                          <span>{cls.room}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 text-xs ml-2"
                        onClick={() => navigate('/teacher/attendance', { state: { batch: cls.batch } })}
                      >
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pending Tasks - Collapsible */}
          <Collapsible open={tasksOpen} onOpenChange={setTasksOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <CheckSquare className="w-4 h-4 mr-2 text-secondary" />
                      Pending Tasks
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${tasksOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {pendingTasks.map((task, index) => (
                      <div key={index} className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{task.task}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {task.count} item{task.count > 1 ? 's' : ''} • Due: {task.dueDate}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-7 flex-shrink-0"
                            onClick={() => navigate(task.link)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Announcements - Collapsible */}
          <Collapsible open={announcementsOpen} onOpenChange={setAnnouncementsOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <Bell className="w-4 h-4 mr-2 text-accent" />
                      Recent Announcements
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${announcementsOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {announcements.map((announcement, index) => (
                      <div key={index} className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{announcement.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{announcement.date}</p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                              announcement.priority === 'high'
                                ? 'bg-destructive/10 text-destructive'
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {announcement.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>

        {/* Quick Actions - Collapsible */}
        <Collapsible open={actionsOpen} onOpenChange={setActionsOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>Quick Actions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${actionsOpen ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    onClick={() => navigate('/teacher/attendance')}
                    className="bg-primary hover:bg-primary/90 h-auto py-3 flex-col gap-1"
                  >
                    <CheckSquare className="w-5 h-5" />
                    <span className="text-xs">Mark Attendance</span>
                  </Button>
                  <Button 
                    onClick={() => navigate('/teacher/assignments')}
                    className="bg-secondary hover:bg-secondary/90 h-auto py-3 flex-col gap-1"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-xs">Post Assignment</span>
                  </Button>
                  <Button
                    onClick={() => navigate('/teacher/exams')}
                    className="bg-accent hover:bg-accent/90 h-auto py-3 flex-col gap-1"
                  >
                    <CheckSquare className="w-5 h-5" />
                    <span className="text-xs">Manage Exams</span>
                  </Button>
                  <Button 
                    onClick={() => navigate('/teacher/performance')}
                    className="bg-primary hover:bg-primary/90 h-auto py-3 flex-col gap-1"
                  >
                    <Users className="w-5 h-5" />
                    <span className="text-xs">View Students</span>
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </MainLayout>
  );
}
