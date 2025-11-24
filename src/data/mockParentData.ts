import { Child, PerformanceAlert, ComparisonMetric, CalendarEvent, PTMSlot, Message, Announcement, Notification, LeaveRequest, FeeInvoice } from "@/types/parent";

export const mockChild: Child = {
  id: '1',
  name: 'Emma Wilson',
  grade: 'Grade 10',
  admissionNumber: 'ADM2024001',
  class: '10-A',
  rollNumber: '15',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  attendance: 92,
  feeStatus: 'paid',
  pendingAssignments: 2,
  lastExamScore: 85,
  lastExamImprovement: 8,
};

export const mockPerformanceAlerts: PerformanceAlert[] = [
  {
    type: 'success',
    message: 'Excellent! Emma ranked 3rd in the recent Mathematics exam! 🎉',
    actionRequired: false,
  },
];

export const mockComparisonMetrics: ComparisonMetric[] = [
  { label: 'Attendance', childValue: 92, classAverage: 85, unit: '%' },
  { label: 'Exam Average', childValue: 85, classAverage: 78, unit: '%' },
  { label: 'Assignment Completion', childValue: 95, classAverage: 88, unit: '%' },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { date: new Date(2025, 4, 25), type: 'exam', title: 'Science Mid-term', description: 'Chapters 1-5' },
  { date: new Date(2025, 4, 28), type: 'holiday', title: 'Summer Break Starts' },
  { date: new Date(2025, 5, 1), type: 'fee', title: 'June Fee Due', description: '₹3,000' },
  { date: new Date(2025, 5, 5), type: 'ptm', title: 'Parent-Teacher Meeting' },
];

export const mockPTMSlots: PTMSlot[] = [
  {
    id: '1',
    date: new Date(2025, 5, 5),
    time: '10:00 AM - 10:30 AM',
    teacher: { name: 'Mr. Robert Smith', subject: 'Mathematics', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
    available: true,
  },
  {
    id: '2',
    date: new Date(2025, 5, 5),
    time: '11:00 AM - 11:30 AM',
    teacher: { name: 'Ms. Sarah Johnson', subject: 'Science', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    available: true,
  },
  {
    id: '3',
    date: new Date(2025, 5, 5),
    time: '2:00 PM - 2:30 PM',
    teacher: { name: 'Mrs. Emily Davis', subject: 'English', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
    available: false,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    from: {
      name: 'Mr. Robert Smith',
      role: 'teacher',
      subject: 'Mathematics',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    },
    lastMessage: 'Emma did excellent in today\'s test!',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    unreadCount: 1,
    isOnline: true,
    isPinned: true,
  },
  {
    id: '2',
    from: {
      name: 'Ms. Sarah Johnson',
      role: 'teacher',
      subject: 'Science',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    lastMessage: 'Please remind Emma to complete the project',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
  },
  {
    id: '3',
    from: {
      name: 'Admin Office',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    lastMessage: 'Your fee payment has been confirmed',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 0,
    isOnline: true,
    isPinned: false,
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Summer Break Schedule Announced',
    category: 'holiday',
    priority: 'urgent',
    content: 'Dear Parents, Summer break will begin from May 28, 2025. School will reopen on June 15, 2025. Please ensure all pending fees are cleared before the break. Wishing your children a wonderful vacation!',
    postedBy: {
      name: 'Principal John Williams',
      role: 'Principal',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Principal',
    },
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    attachments: [
      { name: 'summer-schedule.pdf', url: '#', type: 'pdf' },
    ],
    isRead: false,
    reactions: { like: 45, helpful: 38 },
  },
  {
    id: '2',
    title: 'Mid-term Exam Schedule Released',
    category: 'exam',
    priority: 'normal',
    content: 'The mid-term examination schedule for Grade 10 has been finalized. Exams will be conducted from May 20-25, 2025. Please download the detailed timetable from the attachment.',
    postedBy: {
      name: 'Academic Coordinator',
      role: 'Coordinator',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coordinator',
    },
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    attachments: [
      { name: 'exam-timetable.pdf', url: '#', type: 'pdf' },
    ],
    isRead: true,
    reactions: { like: 62, helpful: 55 },
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'attendance',
    title: 'Attendance Alert',
    message: 'Emma was marked absent on May 15, 2025',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    isRead: false,
    actionUrl: '/parent/attendance',
    actionLabel: 'View Details',
  },
  {
    id: '2',
    type: 'exam',
    title: 'Exam Results Published',
    message: 'Mathematics mid-term results are now available',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: false,
    actionUrl: '/parent/reports',
    actionLabel: 'View Results',
  },
  {
    id: '3',
    type: 'assignment',
    title: 'New Assignment Posted',
    message: 'Science project due on May 30, 2025',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    actionUrl: '/parent/assignments',
    actionLabel: 'View Assignment',
  },
  {
    id: '4',
    type: 'fee',
    title: 'Fee Reminder',
    message: 'June month fee of ₹3,000 is due on June 1, 2025',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: true,
    actionUrl: '/parent/fees',
    actionLabel: 'Pay Now',
  },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    childName: 'Emma Wilson',
    leaveType: 'full',
    dates: [new Date(2025, 4, 20)],
    reason: 'Medical appointment',
    supportingDocument: {
      name: 'doctor-note.pdf',
      url: '#',
    },
    status: 'approved',
    reviewedBy: {
      name: 'Ms. Sarah Johnson',
      role: 'Class Teacher',
    },
    reviewDate: new Date(2025, 4, 19),
    comments: 'Approved. Hope Emma feels better soon.',
    notifyTeacher: true,
  },
  {
    id: '2',
    childName: 'Emma Wilson',
    leaveType: 'afternoon',
    dates: [new Date(2025, 4, 10)],
    reason: 'Family function',
    status: 'approved',
    reviewedBy: {
      name: 'Ms. Sarah Johnson',
      role: 'Class Teacher',
    },
    reviewDate: new Date(2025, 4, 9),
    notifyTeacher: true,
  },
];

export const mockFeeInvoices: FeeInvoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-MAY-001',
    month: 'May 2025',
    period: 'May 2025 Tuition',
    invoiceDate: new Date(2025, 4, 1),
    dueDate: new Date(2025, 4, 5),
    amount: 3000,
    status: 'paid',
    paymentMode: 'upi',
    paymentDate: new Date(2025, 4, 3),
    transactionId: 'UPI2025050300123',
    receiptNumber: 'RCT-2025-MAY-001',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-APR-001',
    month: 'April 2025',
    period: 'April 2025 Tuition',
    invoiceDate: new Date(2025, 3, 1),
    dueDate: new Date(2025, 3, 5),
    amount: 3000,
    status: 'paid',
    paymentMode: 'card',
    paymentDate: new Date(2025, 3, 4),
    transactionId: 'CARD2025040400456',
    receiptNumber: 'RCT-2025-APR-001',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-JUN-001',
    month: 'June 2025',
    period: 'June 2025 Tuition',
    invoiceDate: new Date(2025, 5, 1),
    dueDate: new Date(2025, 5, 5),
    amount: 3000,
    status: 'pending',
  },
];
