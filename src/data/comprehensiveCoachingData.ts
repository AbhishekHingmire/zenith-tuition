// Comprehensive Mock Data for Coaching Institute
// 150-200 Students | 10 Batches | Classes 6th-12th

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Arnav', 'Ayaan', 'Krishna', 'Ishaan',
  'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Reyansh', 'Mohammad', 'Aryan', 'Aadhya', 'Ananya',
  'Pari', 'Anika', 'Navya', 'Angel', 'Diya', 'Myra', 'Sara', 'Shanaya', 'Aarohi', 'Aditi',
  'Saanvi', 'Kavya', 'Riya', 'Kiara', 'Prisha', 'Khushi', 'Anvi', 'Nora', 'Pihu', 'Aanya',
  'Avni', 'Larisa', 'Ira', 'Mira', 'Siya', 'Tara', 'Zara', 'Aarush', 'Dhruv', 'Kabir',
  'Shivansh', 'Yash', 'Darsh', 'Rudra', 'Vedant', 'Viaan', 'Harsh', 'Karan', 'Rohan', 'Dev'
];

const lastNames = [
  'Sharma', 'Verma', 'Kumar', 'Singh', 'Patel', 'Gupta', 'Shah', 'Jain', 'Agarwal', 'Mehta',
  'Reddy', 'Iyer', 'Nair', 'Rao', 'Desai', 'Joshi', 'Kapoor', 'Malhotra', 'Chopra', 'Arora',
  'Sinha', 'Das', 'Roy', 'Chatterjee', 'Banerjee', 'Mukherjee', 'Khan', 'Ali', 'Ahmed', 'Ansari'
];

const subjects = {
  6: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  7: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  8: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  9: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Science'],
  10: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Science'],
  11: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'],
  12: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']
};

// Generate realistic batches for classes 6-12
export const coachingBatches = [
  { 
    id: 'b1', 
    name: 'Grade 6-A', 
    grade: '6', 
    section: 'A',
    teacher: 'Mrs. Anjali Sharma',
    subjects: subjects[6],
    capacity: 30,
    schedule: 'Mon, Wed, Fri: 16:00-18:00',
    feeType: 'monthly',
    monthlyFee: 3500,
    yearlyFee: 40000
  },
  { 
    id: 'b2', 
    name: 'Grade 7-A', 
    grade: '7', 
    section: 'A',
    teacher: 'Mr. Rajesh Kumar',
    subjects: subjects[7],
    capacity: 30,
    schedule: 'Tue, Thu, Sat: 16:00-18:00',
    feeType: 'monthly',
    monthlyFee: 3500,
    yearlyFee: 40000
  },
  { 
    id: 'b3', 
    name: 'Grade 8-A', 
    grade: '8', 
    section: 'A',
    teacher: 'Dr. Priya Mehta',
    subjects: subjects[8],
    capacity: 30,
    schedule: 'Mon, Wed, Fri: 14:00-16:00',
    feeType: 'monthly',
    monthlyFee: 4000,
    yearlyFee: 45000
  },
  { 
    id: 'b4', 
    name: 'Grade 9-A', 
    grade: '9', 
    section: 'A',
    teacher: 'Prof. Suresh Gupta',
    subjects: subjects[9],
    capacity: 30,
    schedule: 'Mon, Wed, Fri: 09:00-12:00',
    feeType: 'monthly',
    monthlyFee: 4500,
    yearlyFee: 50000
  },
  { 
    id: 'b5', 
    name: 'Grade 10-A', 
    grade: '10', 
    section: 'A',
    teacher: 'Dr. Vikram Singh',
    subjects: subjects[10],
    capacity: 30,
    schedule: 'Tue, Thu, Sat: 09:00-12:00',
    feeType: 'monthly',
    monthlyFee: 5000,
    yearlyFee: 55000
  },
  { 
    id: 'b6', 
    name: 'Grade 10-B', 
    grade: '10', 
    section: 'B',
    teacher: 'Mrs. Kavita Desai',
    subjects: subjects[10],
    capacity: 30,
    schedule: 'Mon, Wed, Fri: 14:00-17:00',
    feeType: 'monthly',
    monthlyFee: 5000,
    yearlyFee: 55000
  },
  { 
    id: 'b7', 
    name: 'Grade 11-Science', 
    grade: '11', 
    section: 'Science',
    teacher: 'Dr. Ramesh Iyer',
    subjects: subjects[11],
    capacity: 25,
    schedule: 'Daily: 06:00-09:00',
    feeType: 'monthly',
    monthlyFee: 6000,
    yearlyFee: 65000
  },
  { 
    id: 'b8', 
    name: 'Grade 11-Commerce', 
    grade: '11', 
    section: 'Commerce',
    teacher: 'Mr. Anil Joshi',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics'],
    capacity: 25,
    schedule: 'Daily: 14:00-17:00',
    feeType: 'monthly',
    monthlyFee: 5500,
    yearlyFee: 60000
  },
  { 
    id: 'b9', 
    name: 'Grade 12-Science', 
    grade: '12', 
    section: 'Science',
    teacher: 'Dr. Sunita Reddy',
    subjects: subjects[12],
    capacity: 25,
    schedule: 'Daily: 06:00-09:00',
    feeType: 'monthly',
    monthlyFee: 7000,
    yearlyFee: 75000
  },
  { 
    id: 'b10', 
    name: 'Grade 12-Commerce', 
    grade: '12', 
    section: 'Commerce',
    teacher: 'Mrs. Meena Kapoor',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics'],
    capacity: 25,
    schedule: 'Daily: 14:00-17:00',
    feeType: 'monthly',
    monthlyFee: 6500,
    yearlyFee: 70000
  },
  { 
    id: 'b11', 
    name: 'Grade 9-B', 
    grade: '9', 
    section: 'B',
    teacher: 'Dr. Neha Saxena',
    subjects: subjects[9],
    capacity: 30,
    schedule: 'Tue, Thu, Sat: 14:00-17:00',
    feeType: 'monthly',
    monthlyFee: 4500,
    yearlyFee: 50000
  },
  { 
    id: 'b12', 
    name: 'Grade 8-B', 
    grade: '8', 
    section: 'B',
    teacher: 'Mr. Karthik Nair',
    subjects: subjects[8],
    capacity: 30,
    schedule: 'Tue, Thu, Sat: 16:00-18:00',
    feeType: 'monthly',
    monthlyFee: 4000,
    yearlyFee: 45000
  },
  { 
    id: 'b13', 
    name: 'Grade 7-B', 
    grade: '7', 
    section: 'B',
    teacher: 'Mrs. Pooja Verma',
    subjects: subjects[7],
    capacity: 30,
    schedule: 'Mon, Wed, Fri: 16:00-18:00',
    feeType: 'monthly',
    monthlyFee: 3500,
    yearlyFee: 40000
  },
  { 
    id: 'b14', 
    name: 'Grade 6-B', 
    grade: '6', 
    section: 'B',
    teacher: 'Mr. Amit Deshmukh',
    subjects: subjects[6],
    capacity: 30,
    schedule: 'Tue, Thu, Sat: 14:00-16:00',
    feeType: 'monthly',
    monthlyFee: 3500,
    yearlyFee: 40000
  },
  { 
    id: 'b15', 
    name: 'Grade 11-Science-B', 
    grade: '11', 
    section: 'Science-B',
    teacher: 'Dr. Lakshmi Rao',
    subjects: subjects[11],
    capacity: 25,
    schedule: 'Daily: 14:00-17:00',
    feeType: 'monthly',
    monthlyFee: 6000,
    yearlyFee: 65000
  }
];

// Generate comprehensive test/exam data for 1 year
const generateYearlyExamRecords = (batch: any, studentIndex: number) => {
  const examTypes = [
    { type: 'weekly_test', name: 'Weekly Test', frequency: 40, marks: 50 },
    { type: 'unit_test', name: 'Unit Test', frequency: 12, marks: 100 },
    { type: 'mid_term', name: 'Mid Term Exam', frequency: 2, marks: 100 },
    { type: 'final_exam', name: 'Final Exam', frequency: 1, marks: 100 },
    { type: 'class_test', name: 'Class Test', frequency: 24, marks: 25 }
  ];
  
  const records = [];
  const subjects = batch.subjects.slice(0, 3);
  let recordId = 1;
  
  // Generate tests across 12 months
  examTypes.forEach(examType => {
    for (let i = 0; i < examType.frequency; i++) {
      subjects.forEach(subject => {
        const monthsAgo = Math.floor((i / examType.frequency) * 12);
        const baseMarks = 60 + (studentIndex % 30); // Student ability
        const variance = Math.random() * 20 - 10; // Random variance
        const marks = Math.min(examType.marks, Math.max(0, Math.floor(baseMarks + variance)));
        const percentage = (marks / examType.marks) * 100;
        const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : 'D';
        
        records.push({
          id: `E${recordId++}`,
          examName: examType.name,
          subject,
          type: examType.type,
          date: `2024-${String(12 - monthsAgo).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
          marksObtained: marks,
          totalMarks: examType.marks,
          grade,
          percentage: Math.round(percentage),
          rank: Math.floor(Math.random() * 25) + 1
        });
      });
    }
  });
  
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 50);
};

// Generate assignments for students
const generateAssignments = (batch: any) => {
  const assignments = [];
  const subjects = batch.subjects;
  
  for (let month = 0; month < 12; month++) {
    subjects.forEach((subject, idx) => {
      assignments.push({
        id: `ASG${month * 10 + idx}`,
        title: `${subject} - Chapter ${month + 1} Assignment`,
        subject,
        dueDate: `2024-${String(12 - month).padStart(2, '0')}-${String(15 + idx).padStart(2, '0')}`,
        status: Math.random() > 0.2 ? 'submitted' : Math.random() > 0.5 ? 'pending' : 'overdue',
        marks: Math.random() > 0.2 ? Math.floor(Math.random() * 30) + 70 : null,
        totalMarks: 100
      });
    });
  }
  
  return assignments.slice(0, 30);
};

// Generate 250 students distributed across batches
const generateStudent = (index: number, batch: any) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const attendancePercentage = 70 + Math.floor(Math.random() * 30); // 70-100%
  const year = parseInt(batch.grade) <= 9 ? 2011 + (10 - parseInt(batch.grade)) : 2007 + (12 - parseInt(batch.grade));
  const feeType = Math.random() > 0.4 ? 'monthly' : 'yearly';
  
  return {
    id: `s${index + 1}`,
    name,
    admissionNo: `STU-2024-${String(index + 1).padStart(3, '0')}`,
    batch: batch.name,
    batchId: batch.id,
    grade: batch.grade,
    phone: `98765${String(43210 + index).slice(-5)}`,
    parentPhone: `97654${String(32109 + index).slice(-5)}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    status: Math.random() > 0.95 ? 'Inactive' : 'Active',
    photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    attendancePercentage,
    dateOfBirth: `${year}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    gender,
    address: `${Math.floor(Math.random() * 999) + 1} Street ${Math.floor(Math.random() * 50) + 1}, ${['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'][Math.floor(Math.random() * 5)]}`,
    parentName: `${gender === 'Male' ? 'Mr.' : 'Mrs.'} ${lastName}`,
    parentEmail: `${lastName.toLowerCase()}@example.com`,
    joiningDate: `2024-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    feeType: feeType,
    monthlyFee: batch.monthlyFee,
    totalFee: batch.yearlyFee,
    totalPaid: Math.floor(batch.yearlyFee * (Math.random() * 0.7 + 0.3)),
    totalDue: Math.floor(batch.monthlyFee * Math.random() * 2),
    lastPayment: `2024-${String(Math.floor(Math.random() * 3) + 10).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    lastPaymentAmount: batch.monthlyFee,
    feeStatus: Math.random() > 0.7 ? 'overdue' : Math.random() > 0.5 ? 'paid' : 'pending',
    nextDueDate: '2025-01-05',
    attendance: {
      present: attendancePercentage,
      absent: Math.floor((100 - attendancePercentage) * 0.7),
      late: Math.floor((100 - attendancePercentage) * 0.3),
      percentage: attendancePercentage
    },
    attendanceRecords: generateAttendanceRecords(batch),
    examRecords: generateYearlyExamRecords(batch, index),
    assignments: generateAssignments(batch),
    paymentHistory: generatePaymentHistory(batch.monthlyFee, feeType),
    scores: generateScores(batch.subjects),
    averageMarks: 60 + Math.floor(Math.random() * 35),
    rank: Math.floor(Math.random() * 30) + 1,
    strengths: batch.subjects.slice(0, 2),
    improvements: batch.subjects.slice(-1)
  };
};

const generateAttendanceRecords = (batch: any) => {
  const records = [];
  const dates = ['2024-12-23', '2024-12-22', '2024-12-21', '2024-12-20', '2024-12-19', '2024-12-18', '2024-12-17'];
  const subjects = batch.subjects;
  
  for (const date of dates) {
    const numClasses = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numClasses; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const status = Math.random() > 0.15 ? 'Present' : Math.random() > 0.5 ? 'Absent' : 'Late';
      records.push({
        date,
        batch: batch.name,
        subject,
        time: `${String(9 + i * 2).padStart(2, '0')}:00-${String(10 + i * 2).padStart(2, '0')}:30`,
        status
      });
    }
  }
  
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generatePaymentHistory = (monthlyFee: number, feeType: string) => {
  const history = [];
  const modes = ['UPI', 'Cash', 'Bank Transfer', 'Card'];
  const currentDate = new Date('2024-12-24');
  
  if (feeType === 'yearly') {
    // One yearly payment
    history.push({
      id: 'P001',
      date: '2024-04-15',
      amount: monthlyFee * 11, // Yearly fee (11 months worth)
      mode: modes[Math.floor(Math.random() * modes.length)],
      transactionId: `TXN${Math.floor(Math.random() * 1000000)}`,
      receiptNo: 'RCT-YEAR-001',
      status: 'paid',
      month: 'Yearly 2024-25'
    });
  } else {
    // Monthly payments for the entire year (12 months)
    for (let i = 0; i < 12; i++) {
      const month = 12 - i; // Start from December, go back
      const year = month <= 0 ? 2023 : 2024;
      const adjustedMonth = month <= 0 ? 12 + month : month;
      const paymentDay = Math.floor(Math.random() * 15) + 5; // Random day between 5-20
      
      const isPaid = Math.random() > 0.1; // 90% payment success rate
      const isLate = Math.random() > 0.8; // 20% late payments
      
      history.push({
        id: `P${String(i + 1).padStart(3, '0')}`,
        date: `${year}-${String(adjustedMonth).padStart(2, '0')}-${String(paymentDay).padStart(2, '0')}`,
        amount: monthlyFee,
        mode: isPaid ? modes[Math.floor(Math.random() * modes.length)] : '-',
        transactionId: isPaid ? `TXN${Math.floor(Math.random() * 1000000)}` : '-',
        receiptNo: isPaid ? `RCT-${String(i + 1).padStart(3, '0')}` : '-',
        status: isPaid ? (isLate ? 'late' : 'paid') : 'pending',
        month: new Date(year, adjustedMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
      });
    }
  }
  
  return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateScores = (subjects: string[]) => {
  return subjects.slice(0, 4).map(subject => {
    const marks = 60 + Math.floor(Math.random() * 40);
    const grade = marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B+' : marks >= 60 ? 'B' : 'C';
    const trend = Math.random() > 0.5 ? `+${Math.floor(Math.random() * 10)}` : `-${Math.floor(Math.random() * 5)}`;
    
    return {
      subject,
      marks,
      total: 100,
      grade,
      trend
    };
  });
};

// Generate all students (200-300 total)
export const coachingStudents = (() => {
  const students = [];
  let studentIndex = 0;
  
  // Distribute students across batches (20-30 students per batch)
  coachingBatches.forEach(batch => {
    const studentsInBatch = batch.capacity === 30 
      ? Math.floor(Math.random() * 11) + 25  // 25-35 students for larger batches
      : Math.floor(Math.random() * 11) + 20;  // 20-30 students for smaller batches
    
    for (let i = 0; i < studentsInBatch; i++) {
      students.push(generateStudent(studentIndex, batch));
      studentIndex++;
    }
  });
  
  console.log(`📊 Generated ${students.length} students across ${coachingBatches.length} batches`);
  console.log(`📝 Each student has ${students[0]?.examRecords?.length || 0} exam records and ${students[0]?.assignments?.length || 0} assignments`);
  
  return students;
})();

// Generate teachers
export const coachingTeachers = [
  {
    id: 't1',
    name: 'Mrs. Anjali Sharma',
    employeeId: 'EMP-001',
    email: 'anjali.sharma@coaching.com',
    phone: '9876501001',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
    subjects: ['Mathematics', 'Science', 'English'],
    qualification: 'M.Sc Mathematics, B.Ed',
    joiningDate: '2020-01-15',
    salary: 45000,
    assignedBatches: ['Grade 6-A', 'Grade 7-A'],
    status: 'active'
  },
  {
    id: 't2',
    name: 'Mr. Rajesh Kumar',
    employeeId: 'EMP-002',
    email: 'rajesh.kumar@coaching.com',
    phone: '9876501002',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    subjects: ['Physics', 'Chemistry'],
    qualification: 'M.Sc Physics',
    joiningDate: '2019-05-10',
    salary: 50000,
    assignedBatches: ['Grade 11-Science', 'Grade 12-Science'],
    status: 'active'
  },
  {
    id: 't3',
    name: 'Dr. Priya Mehta',
    employeeId: 'EMP-003',
    email: 'priya.mehta@coaching.com',
    phone: '9876501003',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    subjects: ['Mathematics', 'Science'],
    qualification: 'Ph.D Chemistry',
    joiningDate: '2018-03-20',
    salary: 55000,
    assignedBatches: ['Grade 8-A'],
    status: 'active'
  },
  {
    id: 't4',
    name: 'Prof. Suresh Gupta',
    employeeId: 'EMP-004',
    email: 'suresh.gupta@coaching.com',
    phone: '9876501004',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    qualification: 'M.Sc Physics, M.Ed',
    joiningDate: '2017-07-10',
    salary: 60000,
    assignedBatches: ['Grade 9-A'],
    status: 'active'
  },
  {
    id: 't5',
    name: 'Dr. Vikram Singh',
    employeeId: 'EMP-005',
    email: 'vikram.singh@coaching.com',
    phone: '9876501005',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    qualification: 'Ph.D Physics',
    joiningDate: '2016-04-01',
    salary: 65000,
    assignedBatches: ['Grade 10-A'],
    status: 'active'
  },
  {
    id: 't6',
    name: 'Mrs. Kavita Desai',
    employeeId: 'EMP-006',
    email: 'kavita.desai@coaching.com',
    phone: '9876501006',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita',
    subjects: ['Biology', 'Chemistry'],
    qualification: 'M.Sc Biology, B.Ed',
    joiningDate: '2019-08-15',
    salary: 50000,
    assignedBatches: ['Grade 10-B'],
    status: 'active'
  },
  {
    id: 't7',
    name: 'Dr. Ramesh Iyer',
    employeeId: 'EMP-007',
    email: 'ramesh.iyer@coaching.com',
    phone: '9876501007',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh',
    subjects: ['Physics', 'Mathematics', 'Chemistry'],
    qualification: 'Ph.D Physics, M.Sc Mathematics',
    joiningDate: '2015-01-10',
    salary: 70000,
    assignedBatches: ['Grade 11-Science'],
    status: 'active'
  },
  {
    id: 't8',
    name: 'Mr. Anil Joshi',
    employeeId: 'EMP-008',
    email: 'anil.joshi@coaching.com',
    phone: '9876501008',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anil',
    subjects: ['Accountancy', 'Business Studies', 'Economics'],
    qualification: 'M.Com, MBA',
    joiningDate: '2018-07-01',
    salary: 55000,
    assignedBatches: ['Grade 11-Commerce'],
    status: 'active'
  },
  {
    id: 't9',
    name: 'Dr. Sunita Reddy',
    employeeId: 'EMP-009',
    email: 'sunita.reddy@coaching.com',
    phone: '9876501009',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
    subjects: ['Chemistry', 'Biology', 'Physics'],
    qualification: 'Ph.D Chemistry',
    joiningDate: '2014-06-15',
    salary: 75000,
    assignedBatches: ['Grade 12-Science'],
    status: 'active'
  },
  {
    id: 't10',
    name: 'Mrs. Meena Kapoor',
    employeeId: 'EMP-010',
    email: 'meena.kapoor@coaching.com',
    phone: '9876501010',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meena',
    subjects: ['Accountancy', 'Economics', 'Business Studies'],
    qualification: 'M.Com, CA',
    joiningDate: '2017-03-01',
    salary: 60000,
    assignedBatches: ['Grade 12-Commerce'],
    status: 'active'
  },
  {
    id: 't11',
    name: 'Dr. Neha Saxena',
    employeeId: 'EMP-011',
    email: 'neha.saxena@coaching.com',
    phone: '9876501011',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    qualification: 'Ph.D Mathematics',
    joiningDate: '2019-09-01',
    salary: 52000,
    assignedBatches: ['Grade 9-B'],
    status: 'active'
  },
  {
    id: 't12',
    name: 'Mr. Karthik Nair',
    employeeId: 'EMP-012',
    email: 'karthik.nair@coaching.com',
    phone: '9876501012',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik',
    subjects: ['Science', 'Mathematics', 'English'],
    qualification: 'M.Sc Chemistry, B.Ed',
    joiningDate: '2020-06-15',
    salary: 48000,
    assignedBatches: ['Grade 8-B'],
    status: 'active'
  },
  {
    id: 't13',
    name: 'Mrs. Pooja Verma',
    employeeId: 'EMP-013',
    email: 'pooja.verma@coaching.com',
    phone: '9876501013',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja',
    subjects: ['Mathematics', 'Science', 'English'],
    qualification: 'M.Sc Physics, M.Ed',
    joiningDate: '2018-11-20',
    salary: 47000,
    assignedBatches: ['Grade 7-B'],
    status: 'active'
  },
  {
    id: 't14',
    name: 'Mr. Amit Deshmukh',
    employeeId: 'EMP-014',
    email: 'amit.deshmukh@coaching.com',
    phone: '9876501014',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    subjects: ['Mathematics', 'Science', 'English'],
    qualification: 'M.Sc Mathematics',
    joiningDate: '2021-02-10',
    salary: 46000,
    assignedBatches: ['Grade 6-B'],
    status: 'active'
  },
  {
    id: 't15',
    name: 'Dr. Lakshmi Rao',
    employeeId: 'EMP-015',
    email: 'lakshmi.rao@coaching.com',
    phone: '9876501015',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    qualification: 'Ph.D Biology',
    joiningDate: '2016-08-25',
    salary: 68000,
    assignedBatches: ['Grade 11-Science-B'],
    status: 'active'
  }
];

console.log(`Generated ${coachingStudents.length} students across ${coachingBatches.length} batches`);
// Generate comprehensive exam schedule for the year
export const yearlyExamSchedule = [
  // Weekly Tests (every week)
  ...Array.from({ length: 48 }, (_, i) => ({
    id: `WT${i + 1}`,
    name: `Weekly Test ${i + 1}`,
    type: 'weekly_test',
    date: `2024-${String(Math.floor(i / 4) + 1).padStart(2, '0')}-${String((i % 4) * 7 + 5).padStart(2, '0')}`,
    duration: 60,
    totalMarks: 50,
    status: new Date(`2024-${Math.floor(i / 4) + 1}-${(i % 4) * 7 + 5}`) < new Date() ? 'completed' : 'upcoming'
  })),
  
  // Unit Tests (monthly)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `UT${i + 1}`,
    name: `Unit Test ${i + 1}`,
    type: 'unit_test',
    date: `2024-${String(i + 1).padStart(2, '0')}-20`,
    duration: 90,
    totalMarks: 100,
    status: i < 11 ? 'completed' : 'upcoming'
  })),
  
  // Mid Terms (twice a year)
  { id: 'MT1', name: 'Mid Term Exam 1', type: 'mid_term', date: '2024-06-15', duration: 180, totalMarks: 100, status: 'completed' },
  { id: 'MT2', name: 'Mid Term Exam 2', type: 'mid_term', date: '2024-12-15', duration: 180, totalMarks: 100, status: 'completed' },
  
  // Final Exam
  { id: 'FE1', name: 'Final Exam', type: 'final_exam', date: '2024-03-25', duration: 180, totalMarks: 100, status: 'completed' }
];

// Teacher performance and activity data
export const teacherActivityData = coachingTeachers.map(teacher => ({
  ...teacher,
  classesCompleted: Math.floor(Math.random() * 200) + 150,
  totalClasses: 240,
  attendanceMarked: Math.floor(Math.random() * 200) + 150,
  assignmentsGiven: Math.floor(Math.random() * 50) + 30,
  examsCreated: Math.floor(Math.random() * 30) + 20,
  averageStudentScore: 70 + Math.floor(Math.random() * 25),
  studentSatisfaction: 3.5 + Math.random() * 1.5, // out of 5
  leaveTaken: Math.floor(Math.random() * 10),
  totalLeave: 24,
  monthlyClasses: [
    { month: 'Jan', completed: 20, scheduled: 22 },
    { month: 'Feb', completed: 18, scheduled: 20 },
    { month: 'Mar', completed: 21, scheduled: 22 },
    { month: 'Apr', completed: 19, scheduled: 20 },
    { month: 'May', completed: 20, scheduled: 21 },
    { month: 'Jun', completed: 22, scheduled: 22 },
    { month: 'Jul', completed: 20, scheduled: 20 },
    { month: 'Aug', completed: 19, scheduled: 20 },
    { month: 'Sep', completed: 21, scheduled: 22 },
    { month: 'Oct', completed: 20, scheduled: 21 },
    { month: 'Nov', completed: 18, scheduled: 20 },
    { month: 'Dec', completed: 16, scheduled: 20 }
  ]
}));

// Batch performance analytics
export const batchAnalytics = coachingBatches.map(batch => ({
  batchId: batch.id,
  batchName: batch.name,
  totalStudents: coachingStudents.filter(s => s.batch === batch.name).length,
  averageAttendance: 75 + Math.floor(Math.random() * 20),
  averageMarks: 65 + Math.floor(Math.random() * 25),
  topPerformer: coachingStudents.find(s => s.batch === batch.name)?.name || 'N/A',
  passPercentage: 80 + Math.floor(Math.random() * 20),
  monthlyPerformance: [
    { month: 'Jan', avgMarks: 70, attendance: 85 },
    { month: 'Feb', avgMarks: 72, attendance: 83 },
    { month: 'Mar', avgMarks: 75, attendance: 88 },
    { month: 'Apr', avgMarks: 73, attendance: 82 },
    { month: 'May', avgMarks: 76, attendance: 86 },
    { month: 'Jun', avgMarks: 78, attendance: 87 },
    { month: 'Jul', avgMarks: 77, attendance: 85 },
    { month: 'Aug', avgMarks: 79, attendance: 89 },
    { month: 'Sep', avgMarks: 80, attendance: 88 },
    { month: 'Oct', avgMarks: 82, attendance: 90 },
    { month: 'Nov', avgMarks: 81, attendance: 87 },
    { month: 'Dec', avgMarks: 83, attendance: 86 }
  ]
}));

// Assignment library
export const assignmentLibrary = coachingBatches.flatMap(batch => 
  batch.subjects.flatMap(subject => 
    Array.from({ length: 12 }, (_, month) => ({
      id: `${batch.id}-${subject}-${month}`,
      title: `${subject} - Chapter ${month + 1}`,
      subject,
      batch: batch.name,
      dueDate: `2024-${String(month + 1).padStart(2, '0')}-25`,
      assignedDate: `2024-${String(month + 1).padStart(2, '0')}-10`,
      totalMarks: 100,
      submittedCount: Math.floor(Math.random() * 20) + 10,
      totalStudents: coachingStudents.filter(s => s.batch === batch.name).length,
      status: month < 11 ? 'completed' : 'ongoing'
    }))
  )
);

console.log(`Generated ${coachingStudents.length} students across ${coachingBatches.length} batches`);
console.log(`Generated ${yearlyExamSchedule.length} exams/tests for the year`);
console.log(`Generated ${assignmentLibrary.length} assignments across all batches`);