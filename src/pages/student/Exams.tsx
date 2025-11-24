import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockExamResults } from '@/data/mockStudentData';
import { Calendar, Clock, FileText, Download, TrendingUp, Trophy, Target } from 'lucide-react';
import { format } from 'date-fns';

export default function StudentExams() {
  const upcomingExams = [
    {
      id: '1',
      name: 'Mathematics Unit Test 4',
      subject: 'Mathematics',
      date: new Date(2025, 4, 25),
      duration: '2 hours',
      totalMarks: 100,
      room: 'Room 101',
      syllabus: ['Chapter 4: Quadratic Equations', 'Chapter 5: Arithmetic Progressions'],
    },
    {
      id: '2',
      name: 'Science Mid-term',
      subject: 'Science',
      date: new Date(2025, 4, 28),
      duration: '3 hours',
      totalMarks: 150,
      room: 'Hall A',
      syllabus: ['Physics: Chapters 1-5', 'Chemistry: Chapters 1-4', 'Biology: Chapters 1-3'],
    },
  ];

  const getDaysUntil = (date: Date) => {
    const diff = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Exams</h1>
          <p className="text-muted-foreground mt-1">Track your exam schedule and results</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="analysis">Performance</TabsTrigger>
          </TabsList>

          {/* UPCOMING EXAMS */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingExams.map((exam) => {
              const daysLeft = getDaysUntil(exam.date);

              return (
                <Card key={exam.id} className="border-2 border-primary/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <Badge variant="destructive" className="mb-2 animate-pulse">
                            🔥 In {daysLeft} days
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground mb-2">{exam.name}</h3>
                          <Badge variant="outline">{exam.subject}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{format(exam.date, 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{exam.totalMarks} marks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{exam.room}</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-sm mb-2">Syllabus Covered:</h4>
                        <ul className="space-y-1">
                          {exam.syllabus.map((topic, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" className="w-full sm:w-auto touch-manipulation min-h-[44px]">
                          View Materials
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto touch-manipulation min-h-[44px]">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* RESULTS TAB */}
          <TabsContent value="results" className="space-y-4">
            {mockExamResults.map((result) => {
              const percentage = result.percentage;
              const gradeColor = 
                percentage >= 90 ? 'bg-secondary text-secondary-foreground' :
                percentage >= 75 ? 'bg-primary text-primary-foreground' :
                percentage >= 60 ? 'bg-accent text-accent-foreground' :
                'bg-destructive text-destructive-foreground';

              return (
                <Card key={result.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {result.examName}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {result.subject} • {format(result.date, 'MMMM d, yyyy')}
                          </p>
                          <Badge variant="outline">{result.subject}</Badge>
                        </div>
                        <Badge className={`${gradeColor} text-2xl px-4 py-2 whitespace-nowrap`}>
                          {result.grade}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Your Score</span>
                          <span className="text-2xl font-bold text-foreground">
                            {result.marksObtained}/{result.totalMarks}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Percentage</span>
                          <span className="font-semibold text-foreground">{percentage}%</span>
                        </div>
                      </div>

                      {result.rank && result.totalStudents && (
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-accent" />
                            <span className="text-sm font-medium">Rank {result.rank} / {result.totalStudents}</span>
                          </div>
                          {result.classAverage && (
                            <span className="text-sm text-muted-foreground">
                              Class Avg: {result.classAverage}%
                            </span>
                          )}
                        </div>
                      )}

                      {result.teacherRemarks && (
                        <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                          <p className="text-sm font-medium mb-1">Teacher's Remarks:</p>
                          <p className="text-sm text-muted-foreground">{result.teacherRemarks}</p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* PERFORMANCE ANALYSIS */}
          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
                      <div className="text-4xl font-bold text-foreground">85</div>
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Performance Score</p>
                    <p className="text-xs text-secondary mt-1 flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +8% from last term
                    </p>
                  </div>

                  {/* Subject-wise Performance */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Subject-wise Performance</h4>
                    {mockExamResults.map((result) => (
                      <div key={result.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{result.subject}</span>
                          <span className="font-semibold">{result.percentage}%</span>
                        </div>
                        <Progress value={result.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                      <h4 className="font-semibold text-secondary mb-3">Strengths 💪</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-secondary">✓</span>
                          <span>English - Consistently scoring &gt;90%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary">✓</span>
                          <span>Mathematics - Strong problem solving</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <h4 className="font-semibold text-accent mb-3">Focus Areas 🎯</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-accent">→</span>
                          <span>Physics - Practice more numericals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent">→</span>
                          <span>Chemistry - Revise chemical equations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
