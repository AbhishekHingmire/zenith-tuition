import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'Exam name must be at least 3 characters'),
  type: z.enum(['unit_test', 'mid_term', 'final', 'weekly_test']),
  subject: z.string().min(1, 'Subject is required'),
  batches: z.array(z.string()).min(1, 'Select at least one batch'),
  date: z.date({ required_error: 'Date is required' }),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
  totalMarks: z.string().min(1, 'Total marks is required'),
  syllabus: z.string().min(10, 'Syllabus must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

// Mock data
const subjects = ['Mathematics', 'Science', 'English', 'Physics', 'Chemistry', 'Biology'];
const batches = ['Grade 10-A', 'Grade 10-B', 'Grade 9-A', 'Grade 9-B', 'Grade 11-A'];

interface CreateExamFormProps {
  onSuccess?: () => void;
}

export const CreateExamForm = ({ onSuccess }: CreateExamFormProps) => {
  const { toast } = useToast();
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'unit_test',
      subject: '',
      batches: [],
      time: '09:00',
      duration: '60',
      totalMarks: '100',
      syllabus: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Exam data:', data);
    
    toast({
      title: 'Exam Created Successfully',
      description: `${data.name} has been created for ${data.batches.length} batch(es)`,
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleBatchToggle = (batch: string) => {
    const newBatches = selectedBatches.includes(batch)
      ? selectedBatches.filter((b) => b !== batch)
      : [...selectedBatches, batch];
    
    setSelectedBatches(newBatches);
    form.setValue('batches', newBatches);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Create New Exam</h2>
          
          {/* Basic Details */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mid-Term Exam - Mathematics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="unit_test">Unit Test</SelectItem>
                        <SelectItem value="mid_term">Mid-Term</SelectItem>
                        <SelectItem value="final">Final Exam</SelectItem>
                        <SelectItem value="weekly_test">Weekly Test</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Batches */}
            <FormField
              control={form.control}
              name="batches"
              render={() => (
                <FormItem>
                  <FormLabel>Select Batches</FormLabel>
                  <div className="border rounded-md p-4 space-y-2">
                    {batches.map((batch) => (
                      <div key={batch} className="flex items-center space-x-2">
                        <Checkbox
                          id={batch}
                          checked={selectedBatches.includes(batch)}
                          onCheckedChange={() => handleBatchToggle(batch)}
                        />
                        <Label
                          htmlFor={batch}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {batch}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Exam Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Marks</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Syllabus */}
            <FormField
              control={form.control}
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syllabus Covered</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter topics and chapters covered in this exam..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
            Create Exam
          </Button>
        </div>
      </form>
    </Form>
  );
};
