import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsightCard } from '@/components/ui/insight-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Flame, 
  Star, 
  TrendingUp, 
  BookOpen,
  Calendar,
  Award,
  Target,
  Clock,
  Medal,
  ChevronDown,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { studentInsights } from '@/data/mockInsights';
import { mockStudents } from '@/data/mockData';
import { mockAssignments, mockTodaySchedule } from '@/data/mockStudentData';
import { useState } from 'react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const student = mockStudents[0];
  const performance = 88; // Mock performance score
  const upcomingAssignments = mockAssignments.filter(a => a.status === 'pending').slice(0, 3);
  const upcomingExams = [
    { name: 'Mid-Term Math', subject: 'Mathematics', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), totalMarks: 100 },
    { name: 'Science Unit Test', subject: 'Science', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), totalMarks: 50 }
  ];

  // Gamification data
  const level = 5;
  const currentXP = 850;
  const nextLevelXP = 1000;
  const xpProgress = (currentXP / nextLevelXP) * 100;
  const streak = 15;
  const rank = 5;
  const totalStudents = 30;

  const badges = [
    { name: 'Perfect Week', icon: '🎯', rarity: 'rare', earned: true },
    { name: 'Top Scorer', icon: '🏆', rarity: 'epic', earned: true },
    { name: 'Assignment Ace', icon: '📚', rarity: 'rare', earned: true },
    { name: 'Helpful Student', icon: '🤝', rarity: 'common', earned: false, progress: 8, max: 10 },
  ];

  // Collapsible states
  const [badgesOpen, setBadgesOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);

  // Stats data
  const statsData = {
    attendance: {
      overall: 87,
      present: 78,
      absent: 8,
      leave: 4,
      subjects: [
        { name: 'Mathematics', percentage: 90 },
        { name: 'Science', percentage: 85 },
        { name: 'English', percentage: 88 },
        { name: 'Computer Science', percentage: 92 },
      ]
    },
    assignments: {
      total: 45,
      completed: 38,
      pending: 7,
      avgScore: 85,
      onTime: 36,
      late: 2
    },
    exams: {
      totalExams: 12,
      avgScore: 88,
      highest: 98,
      lowest: 72,
      recentExams: [
        { name: 'Math Mid-Term', score: 95, total: 100, date: '2024-01-15' },
        { name: 'Science Quiz', score: 88, total: 100, date: '2024-01-10' },
        { name: 'English Essay', score: 82, total: 100, date: '2024-01-05' },
      ]
    },
    subjects: [
      { name: 'Mathematics', score: 92, grade: 'A+', trend: '+5%' },
      { name: 'Science', score: 88, grade: 'A', trend: '+3%' },
      { name: 'English', score: 85, grade: 'A', trend: '+2%' },
      { name: 'Computer Science', score: 95, grade: 'A+', trend: '+7%' },
    ]
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-20 md:pb-6">
        {/* Header with Gamification */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-6 border border-primary/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                Welcome back, {student.name}! 
                <span className="text-2xl">👋</span>
              </h1>
              <p className="text-muted-foreground mt-1">Keep up the great work and stay motivated!</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-2 text-3xl font-bold">
                  <Flame className="w-8 h-8 text-orange-500" />
                  <span className="text-foreground">{streak}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Day Streak</p>
              </div>
              
              <div className="h-12 w-px bg-border" />
              
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">#{rank}</div>
                <p className="text-sm text-muted-foreground mt-1">Rank</p>
              </div>
            </div>
          </div>
        </div>

        {/* XP and Level */}
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {level}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Level {level}</h3>
                  <p className="text-sm text-muted-foreground">{currentXP} / {nextLevelXP} XP</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setStatsDialogOpen(true)}>
                View Stats
              </Button>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {nextLevelXP - currentXP} XP to Level {level + 1}
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover-scale cursor-pointer" onClick={() => navigate('/student/assignments')}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                  <p className="text-2xl font-bold text-foreground">{upcomingAssignments.length}</p>
                </div>
                <BookOpen className="text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Pending</p>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer" onClick={() => navigate('/student/exams')}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold text-foreground">{performance}%</p>
                </div>
                <TrendingUp className="text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+5% this month</p>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold text-foreground">3.5h</p>
                </div>
                <Clock className="text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Today</p>
            </CardContent>
          </Card>

          <Card className="hover-scale cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-2xl font-bold text-foreground">{badges.filter(b => b.earned).length}</p>
                </div>
                <Award className="text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges Showcase - Collapsible */}
        <Collapsible open={badgesOpen} onOpenChange={setBadgesOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Recent Achievements
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${badgesOpen ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        badge.earned
                          ? badge.rarity === 'epic'
                            ? 'border-purple-500 bg-purple-500/10'
                            : badge.rarity === 'rare'
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-500 bg-gray-500/10'
                          : 'border-dashed border-muted-foreground/30 bg-muted/30 opacity-60'
                      }`}
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className="font-semibold text-sm">{badge.name}</h4>
                      {!badge.earned && badge.progress && (
                        <div className="mt-2">
                          <Progress value={(badge.progress / badge.max!) * 100} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {badge.progress}/{badge.max}
                          </p>
                        </div>
                      )}
                      {badge.earned && (
                        <Badge className="mt-2" variant="secondary">Earned</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((assignment) => {
                const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysUntilDue <= 2;
                
                return (
                  <div key={assignment.id} className={`p-3 border rounded-lg ${isUrgent ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <Badge variant={isUrgent ? 'destructive' : 'secondary'}>
                        {daysUntilDue}d
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>📅 {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      <span>📝 {assignment.totalMarks} marks</span>
                    </div>
                  </div>
                );
              })}
              <Button className="w-full" onClick={() => navigate('/student/assignments')}>
                View All Assignments
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam, index) => {
                const daysUntilExam = Math.ceil((new Date(exam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{exam.name}</h4>
                        <p className="text-sm text-muted-foreground">{exam.subject}</p>
                      </div>
                      <Badge variant="secondary">
                        {daysUntilExam} days
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>📅 {new Date(exam.date).toLocaleDateString()}</span>
                      <span>📝 {exam.totalMarks} marks</span>
                    </div>
                  </div>
                );
              })}
              <Button className="w-full" onClick={() => navigate('/student/exams')}>
                View All Exams
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Preview - Collapsible */}
        <Collapsible open={leaderboardOpen} onOpenChange={setLeaderboardOpen}>
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Class Leaderboard
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${leaderboardOpen ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((position) => (
                    <div key={position} className={`flex items-center gap-3 p-3 rounded-lg ${position === rank ? 'bg-primary/10 border border-primary' : 'bg-muted/30'}`}>
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : position}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{position === rank ? 'You' : `Student ${position}`}</h4>
                        <p className="text-sm text-muted-foreground">Level {level + (5 - position)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{currentXP + ((5 - position) * 200)} XP</p>
                        <p className="text-sm text-muted-foreground">{3 + (5 - position)} badges</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Stats Dialog */}
      <Dialog open={statsDialogOpen} onOpenChange={setStatsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              My Complete Statistics
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{statsData.attendance.overall}%</p>
                      <p className="text-sm text-muted-foreground mt-1">Attendance</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{statsData.assignments.avgScore}%</p>
                      <p className="text-sm text-muted-foreground mt-1">Avg Assignment Score</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{statsData.exams.avgScore}%</p>
                      <p className="text-sm text-muted-foreground mt-1">Avg Exam Score</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">#{rank}</p>
                      <p className="text-sm text-muted-foreground mt-1">Class Rank</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subject-wise Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statsData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{subject.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={subject.score} className="h-2 flex-1" />
                          <span className="text-sm text-muted-foreground">{subject.score}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <Badge variant="secondary">{subject.grade}</Badge>
                        <span className="text-sm text-green-500">{subject.trend}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{statsData.attendance.overall}%</p>
                        <p className="text-sm text-muted-foreground">Overall</p>
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{statsData.attendance.present}</p>
                        <p className="text-sm text-muted-foreground">Present</p>
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{statsData.attendance.absent}</p>
                        <p className="text-sm text-muted-foreground">Absent</p>
                      </div>
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{statsData.attendance.leave}</p>
                        <p className="text-sm text-muted-foreground">Leave</p>
                      </div>
                      <Calendar className="w-8 h-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subject-wise Attendance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statsData.attendance.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{subject.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={subject.percentage} className="h-2 flex-1" />
                          <span className="text-sm text-muted-foreground">{subject.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{statsData.assignments.total}</p>
                      <p className="text-sm text-muted-foreground mt-1">Total Assignments</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-500">{statsData.assignments.completed}</p>
                      <p className="text-sm text-muted-foreground mt-1">Completed</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-amber-500">{statsData.assignments.pending}</p>
                      <p className="text-sm text-muted-foreground mt-1">Pending</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Score</span>
                      <span className="text-lg font-bold">{statsData.assignments.avgScore}%</span>
                    </div>
                    <Progress value={statsData.assignments.avgScore} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Submission Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">On Time</span>
                      <span className="text-lg font-bold text-green-500">{statsData.assignments.onTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Late</span>
                      <span className="text-lg font-bold text-red-500">{statsData.assignments.late}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="exams" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{statsData.exams.totalExams}</p>
                      <p className="text-sm text-muted-foreground mt-1">Total Exams</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{statsData.exams.avgScore}%</p>
                      <p className="text-sm text-muted-foreground mt-1">Average Score</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-500">{statsData.exams.highest}%</p>
                      <p className="text-sm text-muted-foreground mt-1">Highest Score</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-amber-500">{statsData.exams.lowest}%</p>
                      <p className="text-sm text-muted-foreground mt-1">Lowest Score</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Exam Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statsData.exams.recentExams.map((exam, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{exam.name}</h4>
                        <p className="text-sm text-muted-foreground">{new Date(exam.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold">{exam.score}/{exam.total}</p>
                          <p className="text-sm text-muted-foreground">{Math.round((exam.score/exam.total)*100)}%</p>
                        </div>
                        <Badge variant={exam.score >= 90 ? 'default' : exam.score >= 75 ? 'secondary' : 'destructive'}>
                          {exam.score >= 90 ? 'A+' : exam.score >= 75 ? 'B' : 'C'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
