// Mock insights data for different user roles

export interface Insight {
  type: 'success' | 'warning' | 'info' | 'error';
  icon: string;
  title: string;
  message: string;
  action?: string;
}

export const parentInsights: Insight[] = [
  {
    type: 'success',
    icon: '👍',
    title: 'Great Progress!',
    message: "Your child's overall performance improved by 12% this month!",
    action: 'View Details'
  },
  {
    type: 'warning',
    icon: '⏰',
    title: 'Upcoming PTM',
    message: 'Parent-Teacher Meeting scheduled for next week. Book your slot now.',
    action: 'Book Slot'
  },
  {
    type: 'info',
    icon: '📊',
    title: 'Performance Update',
    message: "Your child's Math score is 10% above class average.",
    action: 'View Report'
  }
];

export const studentInsights: Insight[] = [
  {
    type: 'success',
    icon: '💡',
    title: 'Great Job!',
    message: 'You score 15% higher when you submit assignments on time. Keep it up!',
    action: 'View Insights'
  },
  {
    type: 'info',
    icon: '📈',
    title: 'Improvement Trend',
    message: 'Your Math scores have improved by 20% over last 3 exams!',
    action: 'See Progress'
  },
  {
    type: 'warning',
    icon: '⚠️',
    title: 'Attendance Alert',
    message: 'Your Science attendance is 70%. Attend 3 more classes to reach 75%.',
    action: 'View Schedule'
  },
  {
    type: 'info',
    icon: '🎯',
    title: 'Study Tip',
    message: 'Practice 10 more problems in Algebra to master this topic.',
    action: 'Start Practice'
  }
];

export const teacherInsights: Insight[] = [
  {
    type: 'info',
    icon: '📚',
    title: 'Engagement Insight',
    message: 'Grade 10 Math batch has 20% lower attendance on Mondays. Consider engagement strategies.',
    action: 'View Analytics'
  },
  {
    type: 'warning',
    icon: '👥',
    title: 'Follow-up Needed',
    message: "5 students haven't submitted last 3 assignments. Follow up recommended.",
    action: 'View Students'
  },
  {
    type: 'success',
    icon: '📈',
    title: 'Improvement Detected',
    message: 'Your class average improved by 12% after the new teaching method.',
    action: 'View Report'
  },
  {
    type: 'success',
    icon: '⭐',
    title: 'Great Feedback!',
    message: 'Students rated your teaching 4.8/5 this month!',
    action: 'View Feedback'
  }
];

export const adminInsights: Insight[] = [
  {
    type: 'success',
    icon: '💰',
    title: 'Financial Health',
    message: 'On track to exceed revenue target by 8% this quarter.',
    action: 'View Report'
  },
  {
    type: 'warning',
    icon: '📉',
    title: 'Enrollment Alert',
    message: 'Enrollment down 15% vs last year same month. Review marketing.',
    action: 'View Details'
  },
  {
    type: 'info',
    icon: '👥',
    title: 'Retention Success',
    message: 'Student dropout rate is 5%, lower than industry average (8%).',
    action: 'View Report'
  },
  {
    type: 'info',
    icon: '📊',
    title: 'Performance Analysis',
    message: 'Grade 10 batch performing 15% better than Grade 9. Analyze teaching methods.',
    action: 'Compare'
  }
];
