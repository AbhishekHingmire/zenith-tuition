import { PTMSlot } from "@/types/parent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, User, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  slots: PTMSlot[];
}

export const PTMBooking = ({ slots }: Props) => {
  const [selectedSlot, setSelectedSlot] = useState<PTMSlot | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBookSlot = () => {
    if (selectedSlot) {
      toast.success('PTM Slot Booked Successfully!', {
        description: `Meeting with ${selectedSlot.teacher.name} on ${format(selectedSlot.date, 'MMM d, yyyy')} at ${selectedSlot.time}`,
      });
      setIsOpen(false);
      setSelectedSlot(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full touch-manipulation min-h-[44px]">
          <Calendar className="w-4 h-4 mr-2" />
          Book Parent-Teacher Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Book PTM Slot</DialogTitle>
          <DialogDescription>
            Select a slot to meet with your child's teachers
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all touch-manipulation ${
                  selectedSlot?.id === slot.id
                    ? 'border-primary bg-primary/5'
                    : slot.available
                    ? 'border-border hover:border-primary/50'
                    : 'border-border bg-muted/50 cursor-not-allowed'
                }`}
                onClick={() => slot.available && setSelectedSlot(slot)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {slot.teacher.avatar ? (
                      <img src={slot.teacher.avatar} alt={slot.teacher.name} className="w-12 h-12 rounded-full" />
                    ) : (
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{slot.teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{slot.teacher.subject}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(slot.date, 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {slot.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant={slot.available ? 'default' : 'secondary'}>
                    {slot.available ? 'Available' : 'Booked'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleBookSlot}
            disabled={!selectedSlot}
            className="w-full sm:w-auto"
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
