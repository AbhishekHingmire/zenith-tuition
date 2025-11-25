export type ScheduleScope = 'today' | 'next_2_days' | 'recurring';

export interface ConflictInfo {
  hasConflict: boolean;
  conflictingBatchId?: string;
  conflictingBatchName?: string;
  conflictingTeacherId?: string;
  conflictingTeacherName?: string;
  peerApprovalRequired?: boolean;
  peerApprovalStatus?: 'pending' | 'approved' | 'rejected';
}

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
  scope: ScheduleScope;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  reviewComments?: string;
  conflictInfo?: ConflictInfo;
}

export interface TimeSlot {
  id: string;
  days: string[];
  startTime: string;
  endTime: string;
  subject: string;
}
