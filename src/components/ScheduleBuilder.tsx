import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface ScheduleSlot {
  id: string;
  days: string[];
  startTime: string;
  endTime: string;
}

interface ScheduleBuilderProps {
  schedules: ScheduleSlot[];
  onChange: (schedules: ScheduleSlot[]) => void;
}

const DAYS_OF_WEEK = [
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' },
  { value: 'Sun', label: 'Sunday' },
];

export const ScheduleBuilder = ({ schedules, onChange }: ScheduleBuilderProps) => {
  const addScheduleSlot = () => {
    const newSlot: ScheduleSlot = {
      id: `slot-${Date.now()}`,
      days: [],
      startTime: '09:00',
      endTime: '10:30',
    };
    onChange([...schedules, newSlot]);
  };

  const removeScheduleSlot = (id: string) => {
    onChange(schedules.filter(slot => slot.id !== id));
  };

  const updateScheduleSlot = (id: string, updates: Partial<ScheduleSlot>) => {
    onChange(schedules.map(slot => 
      slot.id === id ? { ...slot, ...updates } : slot
    ));
  };

  const toggleDay = (slotId: string, day: string) => {
    const slot = schedules.find(s => s.id === slotId);
    if (!slot) return;

    const newDays = slot.days.includes(day)
      ? slot.days.filter(d => d !== day)
      : [...slot.days, day];

    updateScheduleSlot(slotId, { days: newDays });
  };

  const quickAddCommon = (pattern: 'weekday' | 'weekend' | 'alternate') => {
    const newSlots: ScheduleSlot[] = [];
    
    if (pattern === 'weekday') {
      newSlots.push({
        id: `slot-${Date.now()}`,
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        startTime: '09:00',
        endTime: '10:30',
      });
    } else if (pattern === 'weekend') {
      newSlots.push({
        id: `slot-${Date.now()}`,
        days: ['Sat', 'Sun'],
        startTime: '10:00',
        endTime: '12:00',
      });
    } else if (pattern === 'alternate') {
      newSlots.push({
        id: `slot-${Date.now()}-1`,
        days: ['Mon', 'Wed', 'Fri'],
        startTime: '09:00',
        endTime: '10:30',
      });
    }

    onChange([...schedules, ...newSlots]);
  };

  return (
    <div className="space-y-4">
      {/* Quick Add Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => quickAddCommon('weekday')}
          className="text-xs"
        >
          <Clock className="w-3 h-3 mr-1" />
          Weekdays
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => quickAddCommon('weekend')}
          className="text-xs"
        >
          <Clock className="w-3 h-3 mr-1" />
          Weekend
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => quickAddCommon('alternate')}
          className="text-xs"
        >
          <Clock className="w-3 h-3 mr-1" />
          Mon/Wed/Fri
        </Button>
      </div>

      {/* Schedule Slots */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {schedules.map((slot, index) => (
          <Card key={slot.id} className="p-4 bg-muted/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Schedule {index + 1}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeScheduleSlot(slot.id)}
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Days Selection */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Select Days</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DAYS_OF_WEEK.map(day => (
                    <div
                      key={day.value}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-background/50 cursor-pointer"
                      onClick={() => toggleDay(slot.id, day.value)}
                    >
                      <Checkbox
                        id={`${slot.id}-${day.value}`}
                        checked={slot.days.includes(day.value)}
                        onCheckedChange={() => toggleDay(slot.id, day.value)}
                        className="pointer-events-none"
                      />
                      <label
                        htmlFor={`${slot.id}-${day.value}`}
                        className="text-xs font-medium cursor-pointer select-none"
                      >
                        {day.value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor={`${slot.id}-start`} className="text-xs text-muted-foreground">
                    Start Time
                  </Label>
                  <Input
                    id={`${slot.id}-start`}
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => updateScheduleSlot(slot.id, { startTime: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`${slot.id}-end`} className="text-xs text-muted-foreground">
                    End Time
                  </Label>
                  <Input
                    id={`${slot.id}-end`}
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => updateScheduleSlot(slot.id, { endTime: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Preview */}
              {slot.days.length > 0 && (
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                  <div className="flex flex-wrap gap-1">
                    {slot.days.map(day => (
                      <Badge key={day} variant="secondary" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground mx-1">•</span>
                    <Badge variant="outline" className="text-xs">
                      {slot.startTime} - {slot.endTime}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Slot */}
      <Button
        type="button"
        variant="outline"
        onClick={addScheduleSlot}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Time Slot
      </Button>
    </div>
  );
};

export const formatScheduleDisplay = (schedules: ScheduleSlot[]): string => {
  if (!schedules || schedules.length === 0) return 'No schedule set';
  
  return schedules
    .map(slot => {
      const daysStr = slot.days.join(', ');
      return `${daysStr}: ${slot.startTime} - ${slot.endTime}`;
    })
    .join(' | ');
};