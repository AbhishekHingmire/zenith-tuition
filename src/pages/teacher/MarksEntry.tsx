import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { calculateGrade, getGradeColor } from '@/utils/gradeCalculator';
import { StudentMark } from '@/types/exam';
import { Save, TrendingUp, Award, BarChart3, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { mockExams, mockExamResults } from '@/data/mockData';

export default function MarksEntry() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = mockExams.find((e) => e.id === examId);
  const [students, setStudents] = useState<StudentMark[]>(
    mockExamResults.filter((r) => r.examId === examId)
  );
  const [published, setPublished] = useState(exam?.published || false);
  const [isSaving, setIsSaving] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!exam) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Exam not found</h2>
        </div>
      </MainLayout>
    );
  }

  const calculatePercentage = (marks: number): number => {
    return (marks / exam.totalMarks) * 100;
  };

  const updateStudentMarks = (index: number, marks: string) => {
    const marksNum = parseInt(marks);
    
    if (marks && (isNaN(marksNum) || marksNum < 0 || marksNum > exam.totalMarks)) {
      toast.error(`Marks must be between 0 and ${exam.totalMarks}`);
      return;
    }

    const newStudents = [...students];
    newStudents[index] = {
      ...newStudents[index],
      marksObtained: marks ? marksNum : undefined,
      grade: marks ? calculateGrade(marksNum, exam.totalMarks) : undefined,
    };
    setStudents(newStudents);
  };

  const toggleAbsent = (index: number) => {
    const newStudents = [...students];
    newStudents[index] = {
      ...newStudents[index],
      isAbsent: !newStudents[index].isAbsent,
      marksObtained: !newStudents[index].isAbsent ? undefined : newStudents[index].marksObtained,
      grade: undefined,
    };
    setStudents(newStudents);
  };

  const updateRemarks = (index: number, remarks: string) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], remarks };
    setStudents(newStudents);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < students.length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const saveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('All marks saved successfully', {
        description: `Graded ${gradedStudents.length} out of ${students.length} students`,
      });
    }, 1000);
  };

  const togglePublish = () => {
    const newPublishState = !published;
    setPublished(newPublishState);
    
    if (newPublishState) {
      const ungradedCount = students.length - gradedStudents.length;
      if (ungradedCount > 0) {
        toast.warning(`${ungradedCount} students haven't been graded yet`);
      } else {
        toast.success('Results published', {
          description: 'Students can now view their exam results',
        });
      }
    } else {
      toast.info('Results unpublished', {
        description: 'Results are now hidden from students',
      });
    }
  };

  // Calculate statistics
  const gradedStudents = students.filter((s) => !s.isAbsent && s.marksObtained !== undefined);
  const absentStudents = students.filter((s) => s.isAbsent);
  const pendingStudents = students.filter((s) => !s.isAbsent && s.marksObtained === undefined);
  const gradingProgress = (gradedStudents.length / students.length) * 100;
  
  const averageMarks = gradedStudents.length > 0
    ? gradedStudents.reduce((sum, s) => sum + (s.marksObtained || 0), 0) / gradedStudents.length
    : 0;
  
  const highestScore = gradedStudents.length > 0
    ? gradedStudents.reduce((max, s) => (s.marksObtained || 0) > max.marks ? { marks: s.marksObtained || 0, name: s.studentName } : max, { marks: 0, name: '' })
    : null;
  
  const lowestScore = gradedStudents.length > 0
    ? gradedStudents.reduce((min, s) => (s.marksObtained || 0) < min.marks ? { marks: s.marksObtained || 0, name: s.studentName } : min, { marks: exam.totalMarks, name: '' })
    : null;
  
  const passedStudents = gradedStudents.filter((s) => (s.marksObtained || 0) >= exam.totalMarks * 0.4).length;
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl md:text-2xl">{exam.name}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="outline">{exam.subject}</Badge>
                  <Badge variant="outline">{exam.batches[0]}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Total Marks: {exam.totalMarks}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch checked={published} onCheckedChange={togglePublish} />
                  <Label className="cursor-pointer text-sm">Publish Results</Label>
                </div>
                <Button onClick={saveAll} disabled={isSaving} className="w-full sm:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save All'}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Grading Progress</span>
                </div>
                <span className="text-sm font-medium">
                  {gradedStudents.length}/{students.length} Students
                </span>
              </div>
              <Progress value={gradingProgress} className="h-2" />
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Graded: {gradedStudents.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Absent: {absentStudents.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">Pending: {pendingStudents.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
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
                    <p className="text-2xl font-bold">{highestScore?.marks || 0}</p>
                    <p className="text-xs text-muted-foreground">{highestScore?.name}</p>
                  </div>
                  <Award className="w-8 h-8 text-secondary" />
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Lowest Score</p>
                    <p className="text-2xl font-bold">{lowestScore?.marks || 0}</p>
                    <p className="text-xs text-muted-foreground">{lowestScore?.name}</p>
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
                    <p className="text-xs text-muted-foreground">{passedStudents}/{gradedStudents.length} passed</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Marks Entry Table */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Sr.</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Marks</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">%</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Grade</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Absent</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {students.map((student, index) => (
                      <tr key={student.id} className="hover:bg-muted/50">
                        <td className="px-4 py-4 text-sm">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.studentPhoto}
                              alt={student.studentName}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{student.studentName}</p>
                              <p className="text-xs text-muted-foreground">{student.admissionNo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Input
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="number"
                            min="0"
                            max={exam.totalMarks}
                            value={student.marksObtained || ''}
                            onChange={(e) => updateStudentMarks(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            disabled={student.isAbsent}
                            className="w-24 text-center"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-4 py-4 text-center">
                          {student.marksObtained !== undefined && !student.isAbsent ? (
                            <span className="text-sm font-medium">
                              {calculatePercentage(student.marksObtained).toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {student.grade && !student.isAbsent ? (
                            <Badge className={getGradeColor(student.grade)}>
                              {student.grade}
                            </Badge>
                          ) : student.isAbsent ? (
                            <Badge variant="destructive">Absent</Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Checkbox
                            checked={student.isAbsent}
                            onCheckedChange={() => toggleAbsent(index)}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <Input
                            value={student.remarks}
                            onChange={(e) => updateRemarks(index, e.target.value)}
                            placeholder="Optional remarks"
                            className="w-full"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {students.map((student, index) => (
                  <Card key={student.id}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.studentPhoto}
                          alt={student.studentName}
                          className="w-12 h-12 rounded-full"
                        />
                          <div className="flex-1">
                            <p className="font-medium">{student.studentName}</p>
                            <p className="text-sm text-muted-foreground">{student.admissionNo}</p>
                          </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={student.isAbsent}
                            onCheckedChange={() => toggleAbsent(index)}
                          />
                          <Label className="text-sm">Absent</Label>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label className="text-xs">Marks</Label>
                          <Input
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="number"
                            min="0"
                            max={exam.totalMarks}
                            value={student.marksObtained || ''}
                            onChange={(e) => updateStudentMarks(index, e.target.value)}
                            disabled={student.isAbsent}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Percentage</Label>
                          <div className="mt-1 h-10 flex items-center justify-center border rounded-md bg-muted/50">
                            {student.marksObtained !== undefined && !student.isAbsent ? (
                              <span className="text-sm font-medium">
                                {calculatePercentage(student.marksObtained).toFixed(1)}%
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Grade</Label>
                          <div className="mt-1 h-10 flex items-center justify-center">
                            {student.grade && !student.isAbsent ? (
                              <Badge className={getGradeColor(student.grade)}>
                                {student.grade}
                              </Badge>
                            ) : student.isAbsent ? (
                              <Badge variant="destructive" className="text-xs">Absent</Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs">Remarks</Label>
                        <Input
                          value={student.remarks}
                          onChange={(e) => updateRemarks(index, e.target.value)}
                          placeholder="Optional remarks"
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
