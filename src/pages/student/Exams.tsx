import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockExamResults } from '@/data/mockStudentData';
import { Calendar, Clock, TrendingUp, Trophy } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

export default function StudentExams() {
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [resultsFilter, setResultsFilter] = useState<'all' | 'week' | 'month'>('all');

  const upcomingExams = [
    {
      id: '1',
      name: 'Mathematics Unit Test 4',
      subject: 'Mathematics',
      date: new Date(2025, 4, 25),
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      totalMarks: 100,
      room: 'Room 101',
      syllabus: ['Chapter 4: Quadratic Equations', 'Chapter 5: Arithmetic Progressions'],
      chapters: 'Chapters 4-5',
    },
    {
      id: '2',
      name: 'Science Mid-term',
      subject: 'Science',
      date: new Date(2025, 4, 28),
      time: '9:00 AM - 12:00 PM',
      duration: '3 hours',
      totalMarks: 150,
      room: 'Hall A',
      syllabus: ['Physics: Chapters 1-5', 'Chemistry: Chapters 1-4', 'Biology: Chapters 1-3'],
      chapters: 'Physics (Ch 1-5), Chemistry (Ch 1-4), Biology (Ch 1-3)',
    },
  ];

  const getDaysUntil = (date: Date) => {
    const diff = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Filter results based on selected filter
  const filteredResults = mockExamResults.filter((result) => {
    const examDate = new Date(result.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (resultsFilter === 'week') return examDate >= weekAgo;
    if (resultsFilter === 'month') return examDate >= monthAgo;
    return true;
  });

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
          <TabsContent value="upcoming" className="space-y-3">
            {upcomingExams.map((exam) => {
              const daysLeft = getDaysUntil(exam.date);

              return (
                <Card key={exam.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="destructive" className="text-xs font-semibold">
                            {daysLeft}d
                          </Badge>
                        </div>
                        <h3 className="font-bold text-foreground text-base mb-1">{exam.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{format(exam.date, 'MMM d, yyyy')} • {exam.time}</span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex-shrink-0 h-9">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md mx-4">
                          <DialogHeader>
                            <DialogTitle className="text-lg">{exam.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Date</div>
                                <div className="font-semibold text-sm">{format(exam.date, 'MMM d, yyyy')}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Time</div>
                                <div className="font-semibold text-sm">{exam.time}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Duration</div>
                                <div className="font-semibold text-sm">{exam.duration}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Total Marks</div>
                                <div className="font-semibold text-sm">{exam.totalMarks}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Room</div>
                                <div className="font-semibold text-sm">{exam.room}</div>
                              </div>
                            </div>

                            <div className="border-t pt-3">
                              <h4 className="font-semibold text-sm mb-2">Covered Chapters</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{exam.chapters}</p>
                            </div>

                            <div className="border-t pt-3">
                              <h4 className="font-semibold text-sm mb-2">Syllabus Details</h4>
                              <ul className="space-y-2">
                                {exam.syllabus.map((topic, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0 mt-2" />
                                    <span className="flex-1">{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* RESULTS TAB */}
          <TabsContent value="results" className="space-y-3">
            {/* Filter Tabs */}
            <Card className="p-3">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={resultsFilter === 'week' ? 'default' : 'outline'}
                  onClick={() => setResultsFilter('week')}
                  className="flex-1"
                >
                  This Week
                </Button>
                <Button
                  size="sm"
                  variant={resultsFilter === 'month' ? 'default' : 'outline'}
                  onClick={() => setResultsFilter('month')}
                  className="flex-1"
                >
                  This Month
                </Button>
                <Button
                  size="sm"
                  variant={resultsFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setResultsFilter('all')}
                  className="flex-1"
                >
                  All
                </Button>
              </div>
            </Card>

            {/* Results List */}
            {filteredResults.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">No results found for this period</p>
                </CardContent>
              </Card>
            ) : (
              filteredResults.map((result) => {
                const percentage = result.percentage;
                const gradeColor = 
                  percentage >= 90 ? 'bg-emerald-500' :
                  percentage >= 75 ? 'bg-primary' :
                  percentage >= 60 ? 'bg-amber-500' :
                  'bg-destructive';

                return (
                  <Card key={result.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{result.subject}</Badge>
                            <div className={`${gradeColor} text-white text-xs font-bold px-2 py-0.5 rounded`}>
                              {result.grade}
                            </div>
                          </div>
                          <h3 className="font-semibold text-foreground text-sm leading-tight">
                            {result.examName}
                          </h3>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {format(result.date, 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-base font-bold text-foreground">
                            {result.marksObtained}<span className="text-xs text-muted-foreground">/{result.totalMarks}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {percentage}%
                          </div>
                        </div>
                      </div>

                      <Progress value={percentage} className="h-1 mb-2" />

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        {result.rank && result.totalStudents && (
                          <div className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            Rank {result.rank}/{result.totalStudents}
                          </div>
                        )}
                        {result.classAverage && (
                          <span>Class Avg: {result.classAverage}%</span>
                        )}
                      </div>

                      {result.teacherRemarks && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-[10px]">
                          <span className="font-medium">Remarks: </span>
                          <span className="text-muted-foreground">{result.teacherRemarks}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
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
