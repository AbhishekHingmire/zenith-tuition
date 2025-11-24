export interface StudentProfile {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: number;
  totalStudents: number;
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  badgeCount: number;
}

export interface ClassSchedule {
  id: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  room: string;
  type: 'lecture' | 'lab' | 'test' | 'doubt-session';
  attendanceStatus?: 'present' | 'absent' | 'not-marked';
  materials?: {
    title: string;
    url: string;
    type: string;
  }[];
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  postedBy: {
    name: string;
    avatar?: string;
  };
  postedDate: Date;
  dueDate: Date;
  estimatedTime?: number; // in minutes
  difficulty?: 'easy' | 'medium' | 'hard';
  totalMarks: number;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
  status: 'pending' | 'submitted' | 'graded';
  submission?: {
    submittedDate: Date;
    files?: string[];
    textAnswer?: string;
    marks?: number;
    grade?: string;
    feedback?: string;
  };
}

export interface ExamResult {
  id: string;
  examName: string;
  subject: string;
  date: Date;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  totalStudents?: number;
  classAverage?: number;
  teacherRemarks?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  chapter?: string;
  type: 'pdf' | 'video' | 'test' | 'notes' | 'reference';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  uploadedBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  uploadedDate: Date;
  size?: string;
  duration?: string; // for videos
  pageCount?: number; // for PDFs
  views: number;
  downloads: number;
  rating: number;
  tags: string[];
  thumbnail?: string;
}

export interface Doubt {
  id: string;
  question: string;
  description: string;
  subject: string;
  chapter?: string;
  tags: string[];
  postedBy: {
    name: string;
    avatar?: string;
  };
  postedDate: Date;
  status: 'answered' | 'pending';
  viewCount: number;
  upvotes: number;
  answers: {
    id: string;
    answeredBy: {
      name: string;
      role: 'teacher' | 'student';
      avatar?: string;
    };
    answer: string;
    postedDate: Date;
    isVerified: boolean;
    helpfulCount: number;
    attachments?: {
      name: string;
      url: string;
    }[];
  }[];
  images?: string[];
}
