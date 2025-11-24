import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { calculateGrade, getGradeColor } from '@/utils/gradeCalculator';
import { StudentMark } from '@/types/exam';
import { Save, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { mockExams, mockExamResults } from '@/data/mockData';

export default function MarksEntry() {
  const { examId } = useParams();
  const { toast } = useToast();
  const exam = mockExams.find((e) => e.id === examId);
  const [students, setStudents] = useState<StudentMark[]>(
    mockExamResults.filter((r) => r.examId === examId)
  );
  const [published, setPublished] = useState(exam?.published || false);
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

  const updateStudentMarks = (index: number, marks: string) => {
    const marksNum = parseInt(marks);
    
    if (marks && (isNaN(marksNum) || marksNum < 0 || marksNum > exam.totalMarks)) {
      toast({
        title: 'Invalid Marks',
        description: `Marks must be between 0 and ${exam.totalMarks}`,
        variant: 'destructive',
      });
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
    toast({
      title: 'Marks Saved',
      description: 'All marks have been saved successfully',
    });
  };

  const togglePublish = () => {
    setPublished(!published);
    toast({
      title: published ? 'Results Unpublished' : 'Results Published',
      description: published
        ? 'Results are now hidden from students'
        : 'Students can now view their results',
    });
  };

  // Calculate statistics
  const gradedStudents = students.filter((s) => !s.isAbsent && s.marksObtained !== undefined);
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
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{exam.name}</CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline">{exam.subject}</Badge>
                  <Badge variant="outline">{exam.batches[0]}</Badge>
                  <span className="text-sm text-gray-600">
                    Total Marks: {exam.totalMarks}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={published} onCheckedChange={togglePublish} />
                  <Label className="cursor-pointer">Publish Results</Label>
                </div>
                <Button onClick={saveAll} className="bg-indigo-600 hover:bg-indigo-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save All
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Marks</p>
                  <p className="text-2xl font-bold">{averageMarks.toFixed(1)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Highest Score</p>
                  <p className="text-2xl font-bold">{highestScore?.marks || 0}</p>
                  <p className="text-xs text-gray-500">{highestScore?.name}</p>
                </div>
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Lowest Score</p>
                  <p className="text-2xl font-bold">{lowestScore?.marks || 0}</p>
                  <p className="text-xs text-gray-500">{lowestScore?.name}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pass Percentage</p>
                  <p className="text-2xl font-bold">{passPercentage.toFixed(0)}%</p>
                  <p className="text-xs text-gray-500">{passedStudents}/{gradedStudents.length} passed</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-600" />
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
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sr.</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Marks</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Grade</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Absent</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {students.map((student, index) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.studentPhoto}
                              alt={student.studentName}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{student.studentName}</p>
                              <p className="text-xs text-gray-500">{student.admissionNo}</p>
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
                          {student.grade && (
                            <Badge className={getGradeColor(student.grade)}>
                              {student.grade}
                            </Badge>
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
                          <p className="text-sm text-gray-500">{student.admissionNo}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={student.isAbsent}
                            onCheckedChange={() => toggleAbsent(index)}
                          />
                          <Label className="text-sm">Absent</Label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
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
                          <Label className="text-xs">Grade</Label>
                          <div className="mt-1">
                            {student.grade ? (
                              <Badge className={getGradeColor(student.grade)}>
                                {student.grade}
                              </Badge>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
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
