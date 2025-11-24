import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockExams, mockExamResults } from '@/data/mockData';
import { getGradeColor } from '@/utils/gradeCalculator';
import { Award, TrendingUp, BarChart3, Download, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function ExamResults() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = mockExams.find((e) => e.id === examId);
  
  if (!exam) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Exam not found</h2>
        </div>
      </MainLayout>
    );
  }

  const results = mockExamResults.filter((r) => r.examId === examId);
  const gradedStudents = results.filter((r) => !r.isAbsent && r.marksObtained !== undefined);
  
  const averageMarks = gradedStudents.length > 0
    ? gradedStudents.reduce((sum, r) => sum + (r.marksObtained || 0), 0) / gradedStudents.length
    : 0;
  
  const highestScore = gradedStudents.length > 0
    ? gradedStudents.reduce((max, r) => (r.marksObtained || 0) > (max.marksObtained || 0) ? r : max)
    : null;
  
  const passedStudents = gradedStudents.filter((r) => (r.marksObtained || 0) >= exam.totalMarks * 0.4).length;
  const passPercentage = gradedStudents.length > 0 ? (passedStudents / gradedStudents.length) * 100 : 0;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/teacher/exams')}
          className="mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Exams
        </Button>

        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{exam.name}</CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline">{exam.subject}</Badge>
                  <Badge variant="outline">{exam.batches[0]}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Date: {format(exam.date, 'PPP')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Total Marks: {exam.totalMarks}
                  </span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Marks</p>
                  <p className="text-2xl font-bold">{averageMarks.toFixed(1)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Highest Score</p>
                  <p className="text-2xl font-bold">{highestScore?.marksObtained || 0}</p>
                  <p className="text-xs text-muted-foreground">{highestScore?.studentName}</p>
                </div>
                <Award className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Students Appeared</p>
                  <p className="text-2xl font-bold">{gradedStudents.length}</p>
                  <p className="text-xs text-muted-foreground">out of {results.length}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pass Percentage</p>
                  <p className="text-2xl font-bold">{passPercentage.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">{passedStudents} passed</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Rank</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Marks</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Grade</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {results
                    .sort((a, b) => (b.marksObtained || 0) - (a.marksObtained || 0))
                    .map((result, index) => (
                      <tr key={result.id} className="hover:bg-muted/50">
                        <td className="px-4 py-4 text-sm font-medium">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={result.studentPhoto}
                              alt={result.studentName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{result.studentName}</p>
                              <p className="text-sm text-muted-foreground">{result.admissionNo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {result.isAbsent ? (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">
                              Absent
                            </Badge>
                          ) : (
                            <span className="text-lg font-semibold">
                              {result.marksObtained}/{exam.totalMarks}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {result.grade && (
                            <Badge className={getGradeColor(result.grade)}>
                              {result.grade}
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{result.remarks || '-'}</td>
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
