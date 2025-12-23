import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GamificationStats } from '@/components/student/GamificationStats';
import { Leaderboard } from '@/components/student/Leaderboard';
import { InteractiveTimetable } from '@/components/student/InteractiveTimetable';
import { 
  mockStudentProfile, 
  mockBadges, 
  mockLeaderboard, 
  mockTodaySchedule,
  mockAssignments 
} from '@/data/mockStudentData';
import { BookOpen, FileText, TrendingUp, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const profile = mockStudentProfile;
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome back, {profile.name.split(' ')[0]}! 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your studies today</p>
        </div>

        {/* Gamification Stats */}
        <GamificationStats profile={profile} badges={mockBadges} />

        {/* Study Timer and Goals */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Today's Study Time</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">2h 30m</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Goal: 4h</p>
                </div>
                <div className="bg-primary/20 p-2 rounded-full flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
              </div>
              <Progress value={62.5} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Pending Work</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{pendingAssignments.length}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Assignments</p>
                </div>
                <div className="bg-accent/20 p-2 rounded-full flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
              </div>
              <Badge 
                variant="outline" 
                className="w-full justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors touch-manipulation min-h-[44px]"
                onClick={() => navigate('/student/assignments')}
              >
                View All
              </Badge>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Average Score</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">85%</p>
                  <p className="text-xs text-secondary mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5% from last month
                  </p>
                </div>
                <div className="bg-secondary/20 p-2 rounded-full flex-shrink-0">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <Badge 
                variant="outline" 
                className="w-full justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors touch-manipulation min-h-[44px]"
                onClick={() => navigate('/student/exams')}
              >
                View Results
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Timetable - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <InteractiveTimetable schedule={mockTodaySchedule} />
          </div>

          {/* Leaderboard - Takes 1 column */}
          <div>
            <Leaderboard entries={mockLeaderboard} currentStudentId="current" />
          </div>
        </div>

        {/* Pending Assignments Preview */}
        {pendingAssignments.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between flex-wrap gap-2 text-lg">
                <span>Pending Assignments</span>
                <Badge variant="destructive">{pendingAssignments.length} Pending</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {pendingAssignments.slice(0, 3).map((assignment) => {
                  const daysLeft = Math.ceil((assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysLeft <= 2;

                  return (
                    <div
                      key={assignment.id}
                      className={`border rounded-lg p-3 hover:border-primary/50 transition-colors cursor-pointer touch-manipulation ${
                        isUrgent ? 'border-destructive bg-destructive/5' : 'border-border'
                      }`}
                      onClick={() => navigate('/student/assignments')}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground mb-0.5">{assignment.title}</h4>
                          <p className="text-xs text-muted-foreground mb-1.5">
                            {assignment.subject} • {assignment.totalMarks} marks
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge variant="outline" className="capitalize text-xs">
                              {assignment.difficulty || 'medium'}
                            </Badge>
                            {assignment.estimatedTime && (
                              <span className="text-xs text-muted-foreground">
                                ~{assignment.estimatedTime} mins
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant={isUrgent ? 'destructive' : 'secondary'}
                          className={`${isUrgent ? 'animate-pulse' : ''} whitespace-nowrap`}
                        >
                          {isUrgent ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left!` : `Due in ${daysLeft} days`}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-foreground mb-2">💡 Personalized Recommendations</h3>
            <div className="space-y-1.5">
              <div className="p-2.5 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs text-foreground">
                  <strong>Focus on Mathematics:</strong> Chapter 5 test coming up next week!
                </p>
              </div>
              <div className="p-2.5 bg-secondary/5 rounded-lg border border-secondary/20">
                <p className="text-xs text-foreground">
                  <strong>Great progress!</strong> Your Science scores improved by 15% this month 📈
                </p>
              </div>
              <div className="p-2.5 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-xs text-foreground">
                  <strong>Reminder:</strong> {pendingAssignments.length} assignments due soon. Start now!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
