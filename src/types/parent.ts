export interface Child {
  id: string;
  name: string;
  grade: string;
  admissionNumber: string;
  class: string;
  rollNumber: string;
  avatar?: string;
  attendance: number;
  feeStatus: 'paid' | 'due' | 'overdue';
  pendingAssignments: number;
  lastExamScore: number;
  lastExamImprovement: number;
}

export interface PerformanceAlert {
  type: 'error' | 'warning' | 'success';
  message: string;
  actionRequired: boolean;
}

export interface ComparisonMetric {
  label: string;
  childValue: number;
  classAverage: number;
  unit: string;
}

export interface CalendarEvent {
  date: Date;
  type: 'exam' | 'holiday' | 'ptm' | 'fee';
  title: string;
  description?: string;
}

export interface PTMSlot {
  id: string;
  date: Date;
  time: string;
  teacher: {
    name: string;
    subject: string;
    avatar?: string;
  };
  available: boolean;
}

export interface Message {
  id: string;
  from: {
    name: string;
    role: 'teacher' | 'admin';
    subject?: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  isPinned: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: 'parent' | 'teacher' | 'admin';
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
  replyTo?: string;
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  category: 'holiday' | 'exam' | 'event' | 'fee' | 'general';
  priority: 'urgent' | 'normal';
  content: string;
  postedBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  postedAt: Date;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  images?: string[];
  isRead: boolean;
  reactions: {
    like: number;
    helpful: number;
  };
}

export interface Notification {
  id: string;
  type: 'attendance' | 'fee' | 'exam' | 'assignment' | 'announcement' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface LeaveRequest {
  id: string;
  childName: string;
  leaveType: 'full' | 'morning' | 'afternoon';
  dates: Date[];
  reason: string;
  supportingDocument?: {
    name: string;
    url: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: {
    name: string;
    role: string;
  };
  reviewDate?: Date;
  comments?: string;
  notifyTeacher: boolean;
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  month: string;
  period: string;
  invoiceDate: Date;
  dueDate: Date;
  amount: number;
  lateFee?: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMode?: 'cash' | 'upi' | 'card' | 'net-banking' | 'wallet';
  paymentDate?: Date;
  transactionId?: string;
  receiptNumber?: string;
}

export interface FeeStructure {
  tuition: number;
  admission: number;
  exam: number;
  books: number;
  lab: number;
  transport?: number;
  other: number;
  discount?: number;
}
