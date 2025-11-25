export interface ScheduleChangeRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  batchId: string;
  batchName: string;
  currentSchedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  requestedSchedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  reviewComments?: string;
}

export interface TimeSlot {
  id: string;
  days: string[];
  startTime: string;
  endTime: string;
  subject: string;
}
