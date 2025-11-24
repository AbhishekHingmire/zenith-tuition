import { Grade } from '@/types/exam';

export const calculateGrade = (marksObtained: number, totalMarks: number): Grade => {
  const percentage = (marksObtained / totalMarks) * 100;
  
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

export const getGradeColor = (grade: Grade): string => {
  const colors: Record<Grade, string> = {
    'A+': 'bg-emerald-100 text-emerald-700 border-emerald-300',
    'A': 'bg-green-100 text-green-700 border-green-300',
    'B+': 'bg-blue-100 text-blue-700 border-blue-300',
    'B': 'bg-cyan-100 text-cyan-700 border-cyan-300',
    'C': 'bg-amber-100 text-amber-700 border-amber-300',
    'D': 'bg-orange-100 text-orange-700 border-orange-300',
    'F': 'bg-red-100 text-red-700 border-red-300',
  };
  return colors[grade];
};
