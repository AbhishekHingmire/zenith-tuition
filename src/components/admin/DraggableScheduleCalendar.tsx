import { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, Users, AlertCircle, Check, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ScheduleSlot {
  id: string;
  batchId: string;
  batchName: string;
  subject: string;
  teacher: string;
  students: number;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

interface DroppableSlot {
  day: string;
  timeSlot: string;
}

const timeSlots = [
  { id: 'slot-1', label: '08:00 - 09:30', start: '08:00', end: '09:30' },
  { id: 'slot-2', label: '09:30 - 11:00', start: '09:30', end: '11:00' },
  { id: 'slot-3', label: '11:15 - 12:45', start: '11:15', end: '12:45' },
  { id: 'slot-4', label: '13:45 - 15:15', start: '13:45', end: '15:15' },
  { id: 'slot-5', label: '15:30 - 17:00', start: '15:30', end: '17:00' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initialSchedule: ScheduleSlot[] = [
  {
    id: 'sch-1',
    batchId: 'b1',
    batchName: 'Grade 10 - Mathematics',
    subject: 'Mathematics',
    teacher: 'Dr. John Smith',
    students: 30,
    day: 'Monday',
    startTime: '08:00',
    endTime: '09:30',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 'sch-2',
    batchId: 'b2',
    batchName: 'Grade 9 - Biology',
    subject: 'Biology',
    teacher: 'Ms. Sarah Johnson',
    students: 25,
    day: 'Monday',
    startTime: '09:30',
    endTime: '11:00',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  {
    id: 'sch-3',
    batchId: 'b3',
    batchName: 'Grade 11 - Physics',
    subject: 'Physics',
    teacher: 'Dr. John Smith',
    students: 28,
    day: 'Tuesday',
    startTime: '08:00',
    endTime: '09:30',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
  },
  {
    id: 'sch-4',
    batchId: 'b1',
    batchName: 'Grade 10 - Mathematics',
    subject: 'Mathematics',
    teacher: 'Dr. John Smith',
    students: 30,
    day: 'Wednesday',
    startTime: '11:15',
    endTime: '12:45',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
  },
  {
    id: 'sch-5',
    batchId: 'b2',
    batchName: 'Grade 9 - Biology',
    subject: 'Biology',
    teacher: 'Ms. Sarah Johnson',
    students: 25,
    day: 'Thursday',
    startTime: '13:45',
    endTime: '15:15',
    color: 'bg-green-100 border-green-300 text-green-900',
  },
  {
    id: 'sch-6',
    batchId: 'b3',
    batchName: 'Grade 11 - Physics',
    subject: 'Physics',
    teacher: 'Dr. John Smith',
    students: 28,
    day: 'Friday',
    startTime: '09:30',
    endTime: '11:00',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
  },
];

interface ScheduleCardProps {
  schedule: ScheduleSlot;
  isDragging?: boolean;
  isOverlay?: boolean;
}

function ScheduleCard({ schedule, isDragging, isOverlay }: ScheduleCardProps) {
  return (
    <div
      className={cn(
        'p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all',
        schedule.color,
        isDragging && !isOverlay && 'opacity-50 scale-95',
        isOverlay && 'shadow-2xl scale-105 rotate-3',
        !isDragging && 'hover:shadow-md'
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-50" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{schedule.batchName}</p>
          <p className="text-xs opacity-75 mt-0.5">{schedule.teacher}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3" />
              <span>{schedule.startTime} - {schedule.endTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Users className="w-3 h-3" />
              <span>{schedule.students}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DraggableScheduleCalendar() {
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(initialSchedule);
  const [activeSchedule, setActiveSchedule] = useState<ScheduleSlot | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const checkConflict = (newSchedule: ScheduleSlot, day: string, timeSlot: string): string | null => {
    const [startTime] = timeSlot.split(' - ');
    
    // Check if teacher has another class at same time
    const teacherConflict = schedule.find(
      s => s.id !== newSchedule.id && 
      s.teacher === newSchedule.teacher && 
      s.day === day && 
      s.startTime === startTime
    );
    
    if (teacherConflict) {
      return `Teacher ${newSchedule.teacher} already has ${teacherConflict.batchName} at this time`;
    }

    // Check if same batch has class at same time
    const batchConflict = schedule.find(
      s => s.id !== newSchedule.id && 
      s.batchId === newSchedule.batchId && 
      s.day === day && 
      s.startTime === startTime
    );
    
    if (batchConflict) {
      return `${newSchedule.batchName} already scheduled at this time`;
    }

    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const scheduleItem = schedule.find(s => s.id === event.active.id);
    if (scheduleItem) {
      setActiveSchedule(scheduleItem);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveSchedule(null);

    if (!over) return;

    const scheduleItem = schedule.find(s => s.id === active.id);
    if (!scheduleItem) return;

    const [day, timeSlotLabel] = (over.id as string).split('_');
    const timeSlot = timeSlots.find(ts => ts.label === timeSlotLabel);
    
    if (!timeSlot) return;

    // Check if dropping on same slot
    if (scheduleItem.day === day && scheduleItem.startTime === timeSlot.start) {
      return;
    }

    // Check for conflicts
    const conflict = checkConflict(scheduleItem, day, timeSlot.label);
    
    if (conflict) {
      toast.error('Schedule Conflict', {
        description: conflict,
        icon: <AlertCircle className="w-4 h-4" />,
      });
      return;
    }

    // Update schedule
    setSchedule(prev =>
      prev.map(s =>
        s.id === active.id
          ? { ...s, day, startTime: timeSlot.start, endTime: timeSlot.end }
          : s
      )
    );
    
    setHasChanges(true);
    
    toast.success('Schedule Updated', {
      description: `${scheduleItem.batchName} moved to ${day} at ${timeSlot.label}`,
      icon: <Check className="w-4 h-4" />,
    });
  };

  const handleSaveChanges = () => {
    toast.success('Schedule Saved', {
      description: 'All changes have been saved successfully. Teachers and students will be notified.',
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    setSchedule(initialSchedule);
    setHasChanges(false);
    toast.info('Schedule Reset', {
      description: 'All changes have been discarded',
    });
  };

  const getScheduleForSlot = (day: string, timeSlotLabel: string) => {
    const [startTime] = timeSlotLabel.split(' - ');
    return schedule.find(s => s.day === day && s.startTime === startTime);
  };

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-3 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm font-medium">
            {hasChanges ? 'Unsaved Changes' : 'All changes saved'}
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
          )}
          <Button 
            size="sm" 
            disabled={!hasChanges}
            onClick={handleSaveChanges}
          >
            <Check className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <GripVertical className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary">Drag & Drop to Reschedule</p>
            <p className="text-xs text-muted-foreground mt-1">
              Click and drag class cards to move them to different days and time slots. The system will automatically detect conflicts.
            </p>
          </div>
        </div>
      </Card>

      {/* Calendar Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Header */}
              <div className="grid grid-cols-[120px_repeat(6,1fr)] bg-muted border-b">
                <div className="p-3 font-semibold text-sm border-r">Time</div>
                {days.map(day => (
                  <div key={day} className="p-3 font-semibold text-sm text-center border-r last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map(timeSlot => (
                <div key={timeSlot.id} className="grid grid-cols-[120px_repeat(6,1fr)] border-b last:border-b-0">
                  <div className="p-3 bg-muted/50 border-r flex flex-col justify-center">
                    <p className="text-xs font-medium">{timeSlot.label}</p>
                  </div>
                  {days.map(day => {
                    const scheduleItem = getScheduleForSlot(day, timeSlot.label);
                    const dropId = `${day}_${timeSlot.label}`;
                    
                    return (
                      <DroppableCell
                        key={dropId}
                        id={dropId}
                        schedule={scheduleItem}
                        activeSchedule={activeSchedule}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeSchedule && (
            <ScheduleCard schedule={activeSchedule} isOverlay />
          )}
        </DragOverlay>
      </DndContext>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded" />
          <span>Mathematics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded" />
          <span>Biology</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded" />
          <span>Physics</span>
        </div>
      </div>
    </div>
  );
}

interface DroppableCellProps {
  id: string;
  schedule?: ScheduleSlot;
  activeSchedule: ScheduleSlot | null;
}

function DroppableCell({ id, schedule, activeSchedule }: DroppableCellProps) {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      id={id}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={() => setIsOver(false)}
      className={cn(
        'p-2 border-r last:border-r-0 min-h-[100px] transition-colors',
        isOver && 'bg-primary/10',
        !schedule && 'bg-muted/20'
      )}
    >
      {schedule ? (
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', schedule.id);
          }}
        >
          <ScheduleCard 
            schedule={schedule} 
            isDragging={activeSchedule?.id === schedule.id}
          />
        </div>
      ) : (
        <div className={cn(
          'h-full min-h-[84px] border-2 border-dashed rounded-lg flex items-center justify-center transition-all',
          isOver ? 'border-primary bg-primary/5' : 'border-muted'
        )}>
          {isOver && (
            <p className="text-xs text-primary font-medium">Drop here</p>
          )}
        </div>
      )}
    </div>
  );
}
