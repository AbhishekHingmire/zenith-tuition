// 1-Year Comprehensive Mock Data for Testing Pagination and Filters
// Generated for 2024-2025 Academic Year

import { coachingBatches, coachingStudents, coachingTeachers } from './comprehensiveCoachingData';

// Helper to generate dates for the year
const generateDateRange = (startDate: Date, endDate: Date) => {
  const dates: Date[] = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

// Academic Year: 2024-01-01 to 2024-12-31
const academicYearStart = new Date('2024-01-01');
const academicYearEnd = new Date('2024-12-31');

// ========== EXAMS DATA (150+ exams across the year) ==========
export const yearlyExams = [
  // Weekly Tests (every Saturday for each batch - 52 weeks)
  ...coachingBatches.flatMap(batch => 
    Array.from({ length: 52 }, (_, week) => {
      const examDate = new Date(academicYearStart);
      examDate.setDate(examDate.getDate() + (week * 7) + 5); // Every Saturday
      
      return {
        id: `WT-${batch.id}-${week + 1}`,
        title: `Weekly Test ${week + 1}`,
        subject: batch.subjects[week % batch.subjects.length],
        batch: batch.name,
        batchId: batch.id,
        teacher: batch.teacher,
        type: 'weekly_test',
        date: examDate.toISOString().split('T')[0],
        time: '10:00 AM',
        duration: 60, // minutes
        totalMarks: 50,
        passingMarks: 20,
        syllabus: `Chapters covered in Week ${week + 1}`,
        status: examDate < new Date() ? 'completed' : 'upcoming',
        createdAt: new Date(examDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: batch.teacher,
      };
    })
  ),

  // Monthly Unit Tests (12 months × 15 batches = 180 exams)
  ...coachingBatches.flatMap(batch => 
    batch.subjects.slice(0, 3).flatMap(subject =>
      Array.from({ length: 12 }, (_, month) => ({
        id: `UT-${batch.id}-${subject.replace(/\s+/g, '')}-${month + 1}`,
        title: `${subject} - Unit Test ${month + 1}`,
        subject,
        batch: batch.name,
        batchId: batch.id,
        teacher: batch.teacher,
        type: 'unit_test',
        date: `2024-${String(month + 1).padStart(2, '0')}-20`,
        time: '02:00 PM',
        duration: 90,
        totalMarks: 100,
        passingMarks: 40,
        syllabus: `Unit ${month + 1} - Complete`,
        status: month < 11 ? 'completed' : 'upcoming',
        createdAt: new Date(2024, month, 10).toISOString(),
        createdBy: batch.teacher,
      }))
    )
  ),

  // Quarterly Exams (4 quarters × 15 batches = 60 exams)
  ...coachingBatches.flatMap(batch => [
    {
      id: `Q1-${batch.id}`,
      title: 'Q1 Quarterly Exam',
      subject: 'All Subjects',
      batch: batch.name,
      batchId: batch.id,
      teacher: batch.teacher,
      type: 'quarterly',
      date: '2024-03-25',
      time: '09:00 AM',
      duration: 180,
      totalMarks: 200,
      passingMarks: 80,
      syllabus: 'Jan-March Syllabus',
      status: 'completed',
      createdAt: '2024-03-10',
      createdBy: batch.teacher,
    },
    {
      id: `Q2-${batch.id}`,
      title: 'Q2 Quarterly Exam',
      subject: 'All Subjects',
      batch: batch.name,
      batchId: batch.id,
      teacher: batch.teacher,
      type: 'quarterly',
      date: '2024-06-25',
      time: '09:00 AM',
      duration: 180,
      totalMarks: 200,
      passingMarks: 80,
      syllabus: 'April-June Syllabus',
      status: 'completed',
      createdAt: '2024-06-10',
      createdBy: batch.teacher,
    },
    {
      id: `Q3-${batch.id}`,
      title: 'Q3 Quarterly Exam',
      subject: 'All Subjects',
      batch: batch.name,
      batchId: batch.id,
      teacher: batch.teacher,
      type: 'quarterly',
      date: '2024-09-25',
      time: '09:00 AM',
      duration: 180,
      totalMarks: 200,
      passingMarks: 80,
      syllabus: 'July-Sep Syllabus',
      status: 'completed',
      createdAt: '2024-09-10',
      createdBy: batch.teacher,
    },
    {
      id: `Q4-${batch.id}`,
      title: 'Q4 Quarterly Exam',
      subject: 'All Subjects',
      batch: batch.name,
      batchId: batch.id,
      teacher: batch.teacher,
      type: 'quarterly',
      date: '2024-12-20',
      time: '09:00 AM',
      duration: 180,
      totalMarks: 200,
      passingMarks: 80,
      syllabus: 'Oct-Dec Syllabus',
      status: 'upcoming',
      createdAt: '2024-12-01',
      createdBy: batch.teacher,
    },
  ]),

  // Half-Yearly & Final Exams (2 × 15 batches = 30 exams)
  ...coachingBatches.flatMap(batch => [
    {
      id: `HY-${batch.id}`,
      title: 'Half-Yearly Examination',
      subject: 'All Subjects',
      batch: batch.name,
      batchId: batch.id,
      teacher: batch.teacher,
      type: 'half_yearly',
      date: '2024-06-10',
      time: '09:00 AM',
      duration: 180,
      totalMarks: 300,
      passingMarks: 120,
      syllabus: 'Complete Jan-June Syllabus',
      status: 'completed',
      createdAt: '2024-05-25',
      createdBy: batch.teacher,
    },
    {
      id: `FE-${batch.id}`,
      title: 'Final Examination',
      subject: 'All Subjects',
      batch: batch.name,
      batchId: batch.id,
      teacher: batch.teacher,
      type: 'final',
      date: '2024-12-15',
      time: '09:00 AM',
      duration: 180,
      totalMarks: 300,
      passingMarks: 120,
      syllabus: 'Complete Annual Syllabus',
      status: 'upcoming',
      createdAt: '2024-11-30',
      createdBy: batch.teacher,
    },
  ]),
];

// ========== MATERIALS DATA (200+ materials) ==========
const materialTypes = ['pdf', 'video', 'link', 'ppt', 'doc'];
const chapterNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

export const yearlyMaterials = coachingBatches.flatMap(batch => 
  batch.subjects.flatMap(subject => 
    chapterNumbers.map((chapter, idx) => {
      const uploadDate = new Date(academicYearStart);
      uploadDate.setDate(uploadDate.getDate() + (idx * 7));
      
      return {
        id: `MAT-${batch.id}-${subject.replace(/\s+/g, '')}-CH${chapter}`,
        title: `${subject} - Chapter ${chapter} Notes`,
        subject,
        batches: [batch.name],
        batchIds: [batch.id],
        chapter: `Chapter ${chapter}`,
        type: materialTypes[idx % materialTypes.length],
        uploadDate: uploadDate.toISOString().split('T')[0],
        uploadedBy: batch.teacher,
        views: Math.floor(Math.random() * 200) + 50,
        downloads: Math.floor(Math.random() * 150) + 20,
        description: `Complete notes for ${subject} Chapter ${chapter} with examples and exercises`,
        tags: `${subject}, Chapter ${chapter}, ${batch.name}`,
        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
        externalLink: materialTypes[idx % materialTypes.length] === 'link' 
          ? 'https://example.com/material' 
          : undefined,
      };
    })
  )
);

// ========== FEES DATA (12 months × 300 students = 3600+ records) ==========
export const yearlyFees = coachingStudents.flatMap(student => {
  const batch = coachingBatches.find(b => b.name === student.batch);
  if (!batch) return [];

  return Array.from({ length: 12 }, (_, month) => {
    const dueDate = new Date(2024, month, 5);
    const paidDate = Math.random() > 0.2 ? new Date(2024, month, Math.floor(Math.random() * 10) + 1) : null;
    const isPaid = !!paidDate && paidDate < new Date();
    
    return {
      id: `FEE-${student.id}-2024-${String(month + 1).padStart(2, '0')}`,
      studentId: student.id,
      studentName: student.name,
      admissionNo: student.admissionNo,
      batch: batch.name,
      batchId: batch.id,
      grade: batch.grade,
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
      monthNumber: month + 1,
      year: 2024,
      amount: batch.monthlyFee,
      dueDate: dueDate.toISOString().split('T')[0],
      paidDate: paidDate?.toISOString().split('T')[0] || null,
      status: isPaid ? 'paid' : (dueDate < new Date() ? 'overdue' : 'pending'),
      paymentMethod: isPaid ? ['UPI', 'Cash', 'Card', 'Bank Transfer'][Math.floor(Math.random() * 4)] : null,
      transactionId: isPaid ? `TXN${Math.random().toString(36).substring(2, 12).toUpperCase()}` : null,
      remarks: isPaid ? 'Paid on time' : (dueDate < new Date() ? 'Payment overdue' : 'Payment pending'),
    };
  });
});

// ========== ATTENDANCE DATA (365 days × 15 batches = 5475 records) ==========
const allDaysInYear = generateDateRange(academicYearStart, academicYearEnd);

export const yearlyAttendance = coachingBatches.flatMap(batch => {
  // Get schedule days for this batch
  const scheduleDays = batch.schedule.includes('Daily') 
    ? [0, 1, 2, 3, 4, 5, 6] 
    : batch.schedule.includes('Mon') ? [1, 3, 5] : [2, 4, 6];
  
  return allDaysInYear
    .filter(date => scheduleDays.includes(date.getDay()) && date < new Date())
    .map(date => {
      const students = coachingStudents.filter(s => s.batch === batch.name);
      const presentCount = students.length - Math.floor(Math.random() * 5);
      
      return {
        id: `ATT-${batch.id}-${date.toISOString().split('T')[0]}`,
        batchId: batch.id,
        batch: batch.name,
        teacher: batch.teacher,
        date: date.toISOString().split('T')[0],
        totalStudents: students.length,
        present: presentCount,
        absent: students.length - presentCount,
        percentage: Math.round((presentCount / students.length) * 100),
        markedBy: batch.teacher,
        markedAt: `${date.getHours()}:${date.getMinutes()}`,
        isCompleted: true,
        studentAttendance: students.map(student => ({
          studentId: student.id,
          studentName: student.name,
          admissionNo: student.admissionNo,
          status: Math.random() > 0.15 ? 'present' : 'absent',
        })),
      };
    });
});

// ========== STUDENT ATTENDANCE (For individual student view) ==========
export const studentAttendanceRecords = coachingStudents.flatMap(student => {
  const batch = coachingBatches.find(b => b.name === student.batch);
  if (!batch) return [];

  const scheduleDays = batch.schedule.includes('Daily') 
    ? [0, 1, 2, 3, 4, 5, 6] 
    : batch.schedule.includes('Mon') ? [1, 3, 5] : [2, 4, 6];

  return allDaysInYear
    .filter(date => scheduleDays.includes(date.getDay()) && date < new Date())
    .map(date => ({
      id: `STU-ATT-${student.id}-${date.toISOString().split('T')[0]}`,
      studentId: student.id,
      studentName: student.name,
      batch: batch.name,
      date: date.toISOString().split('T')[0],
      status: Math.random() > 0.1 ? 'present' : 'absent',
    }));
});

// ========== EXAM RESULTS ==========
export const yearlyExamResults = yearlyExams
  .filter(exam => exam.status === 'completed')
  .flatMap(exam => {
    const students = coachingStudents.filter(s => s.batch === exam.batch);
    
    return students.map(student => ({
      id: `RESULT-${exam.id}-${student.id}`,
      examId: exam.id,
      examTitle: exam.title,
      studentId: student.id,
      studentName: student.name,
      admissionNo: student.admissionNo,
      batch: exam.batch,
      subject: exam.subject,
      marksObtained: Math.floor(Math.random() * (exam.totalMarks - exam.passingMarks)) + exam.passingMarks,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      grade: '', // Will be calculated
      percentage: 0, // Will be calculated
      rank: 0, // Will be calculated per exam
      remarks: '',
    }));
  });

// Calculate percentage, grade, and rank
yearlyExamResults.forEach(result => {
  result.percentage = Math.round((result.marksObtained / result.totalMarks) * 100);
  
  if (result.percentage >= 90) result.grade = 'A+';
  else if (result.percentage >= 80) result.grade = 'A';
  else if (result.percentage >= 70) result.grade = 'B+';
  else if (result.percentage >= 60) result.grade = 'B';
  else if (result.percentage >= 50) result.grade = 'C';
  else if (result.percentage >= 40) result.grade = 'D';
  else result.grade = 'F';
  
  result.remarks = result.percentage >= result.passingMarks * 100 / result.totalMarks 
    ? 'Pass' 
    : 'Fail';
});

// Calculate ranks per exam
yearlyExams.forEach(exam => {
  const examResults = yearlyExamResults
    .filter(r => r.examId === exam.id)
    .sort((a, b) => b.marksObtained - a.marksObtained);
  
  examResults.forEach((result, index) => {
    result.rank = index + 1;
  });
});

// Export summary
console.log('=== YEARLY DATA GENERATED ===');
console.log(`Exams: ${yearlyExams.length}`);
console.log(`Materials: ${yearlyMaterials.length}`);
console.log(`Fee Records: ${yearlyFees.length}`);
console.log(`Attendance Records: ${yearlyAttendance.length}`);
console.log(`Student Attendance: ${studentAttendanceRecords.length}`);
console.log(`Exam Results: ${yearlyExamResults.length}`);
console.log('===========================');

// ========== ASSIGNMENTS DATA (300+ assignments) ==========
export const yearlyAssignments = coachingBatches.flatMap(batch => 
  batch.subjects.flatMap(subject => {
    // 2 assignments per month per subject (24 per subject per batch)
    return Array.from({ length: 24 }, (_, idx) => {
      const month = Math.floor(idx / 2);
      const assignmentDate = new Date(2024, month, (idx % 2) * 15 + 5);
      const dueDate = new Date(assignmentDate);
      dueDate.setDate(dueDate.getDate() + 7);
      
      const students = coachingStudents.filter(s => s.batch === batch.name);
      const submittedCount = Math.floor(students.length * (Math.random() * 0.3 + 0.6)); // 60-90% submission
      const gradedCount = assignmentDate < new Date() ? Math.floor(submittedCount * 0.7) : 0;
      
      return {
        id: `ASSIGN-${batch.id}-${subject.replace(/\s+/g, '')}-${idx + 1}`,
        title: `${subject} - Assignment ${idx + 1}`,
        description: `Practice problems and exercises for ${subject}. Cover chapters ${Math.floor(idx / 2) + 1}-${Math.floor(idx / 2) + 2}.`,
        subject,
        batches: [batch.name],
        batchIds: [batch.id],
        teacher: batch.teacher,
        dueDate: dueDate.toISOString().split('T')[0],
        totalMarks: [20, 30, 50, 100][Math.floor(Math.random() * 4)],
        rubric: [
          { id: 'r1', name: 'Correctness', description: 'Accuracy of solutions', maxPoints: 40 },
          { id: 'r2', name: 'Working', description: 'Step-by-step solutions', maxPoints: 30 },
          { id: 'r3', name: 'Presentation', description: 'Neatness and clarity', maxPoints: 30 },
        ],
        attachments: [{ name: `${subject}-assignment-${idx + 1}.pdf`, size: 245000, type: 'application/pdf' }],
        allowLateSubmission: Math.random() > 0.3,
        lateSubmissionPenalty: 10,
        status: dueDate < new Date() ? 'closed' : (assignmentDate < new Date() ? 'active' : 'draft'),
        createdAt: assignmentDate.toISOString().split('T')[0],
        submissions: {
          total: students.length,
          submitted: assignmentDate < new Date() ? submittedCount : 0,
          graded: gradedCount,
        },
      };
    });
  })
);
