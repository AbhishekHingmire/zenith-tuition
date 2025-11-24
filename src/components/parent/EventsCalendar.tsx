import { CalendarEvent } from "@/types/parent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { FileText, Umbrella, Calendar as CalendarIcon, IndianRupee } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface Props {
  events: CalendarEvent[];
}

export const EventsCalendar = ({ events }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'exam': return FileText;
      case 'holiday': return Umbrella;
      case 'ptm': return CalendarIcon;
      case 'fee': return IndianRupee;
    }
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'exam': return 'bg-destructive text-destructive-foreground';
      case 'holiday': return 'bg-blue-500 text-white';
      case 'ptm': return 'bg-secondary text-secondary-foreground';
      case 'fee': return 'bg-accent text-accent-foreground';
    }
  };

  const eventDates = events.map(e => e.date);
  const selectedDateEvents = events.filter(e => 
    e.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
        <p className="text-sm text-muted-foreground">Next 30 days</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              event: eventDates
            }}
            modifiersStyles={{
              event: { fontWeight: 'bold', textDecoration: 'underline' }
            }}
            className="rounded-md border"
          />

          {selectedDate && selectedDateEvents.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Events on {format(selectedDate, 'MMMM d, yyyy')}
              </p>
              {selectedDateEvents.map((event, index) => {
                const Icon = getEventIcon(event.type);
                return (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{event.title}</p>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="capitalize">{event.type}</Badge>
                  </div>
                );
              })}
            </div>
          )}

          {selectedDate && selectedDateEvents.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No events on this date
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
