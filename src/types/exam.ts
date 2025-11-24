export type ExamType = 'unit_test' | 'mid_term' | 'final' | 'weekly_test';

export type Grade = 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';

export interface Exam {
  id: string;
  name: string;
  type: ExamType;
  subject: string;
  batches: string[];
  date: Date;
  duration: number; // in minutes
  totalMarks: number;
  syllabus: string;
  published: boolean;
  createdAt: Date;
}

export interface StudentMark {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  admissionNo: string;
  marksObtained?: number;
  isAbsent: boolean;
  grade?: Grade;
  remarks?: string;
}

export interface ExamStatistics {
  averageMarks: number;
  highestScore: { marks: number; studentName: string };
  lowestScore: { marks: number; studentName: string };
  passPercentage: number;
  gradeDistribution: Record<Grade, number>;
}
