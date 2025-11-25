import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  label?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showIcon?: boolean;
}

export const WhatsAppButton = ({ 
  phoneNumber, 
  message = 'Hello',
  label = 'Chat on WhatsApp',
  variant = 'default',
  size = 'default',
  className,
  showIcon = true
}: WhatsAppButtonProps) => {
  // Remove any non-digit characters from phone number
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Ensure phone number starts with country code (91 for India)
  const fullPhoneNumber = cleanPhoneNumber.startsWith('91') 
    ? cleanPhoneNumber 
    : `91${cleanPhoneNumber}`;
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodedMessage}`;
  
  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn(
        'bg-green-600 hover:bg-green-700 text-white',
        variant === 'outline' && 'bg-transparent border-green-600 text-green-600 hover:bg-green-50',
        variant === 'ghost' && 'bg-transparent text-green-600 hover:bg-green-50',
        className
      )}
    >
      {showIcon && <MessageCircle className="w-4 h-4 mr-2" />}
      {label}
    </Button>
  );
};

// Utility function to send automated WhatsApp notifications
export const sendWhatsAppNotification = (phoneNumber: string, message: string) => {
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  const fullPhoneNumber = cleanPhoneNumber.startsWith('91') 
    ? cleanPhoneNumber 
    : `91${cleanPhoneNumber}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodedMessage}`;
  
  // In production, this would integrate with WhatsApp Business API
  // For now, it opens WhatsApp web/app
  window.open(whatsappUrl, '_blank');
  
  return true;
};

// Pre-defined message templates for common notifications
export const WHATSAPP_TEMPLATES = {
  ABSENCE_ALERT: (studentName: string, date: string) => 
    `Hello! Your child ${studentName} was marked absent on ${date}. If this is an error, please contact us immediately.`,
  
  FEE_REMINDER: (studentName: string, amount: string, dueDate: string) =>
    `Dear Parent, Fee reminder for ${studentName}. Amount: ₹${amount} is due on ${dueDate}. Please make the payment at your earliest convenience.`,
  
  FEE_OVERDUE: (studentName: string, amount: string, daysPastDue: number) =>
    `URGENT: Fee payment for ${studentName} is overdue by ${daysPastDue} days. Amount: ₹${amount}. Please clear the dues immediately.`,
  
  ASSIGNMENT_POSTED: (studentName: string, subject: string, dueDate: string) =>
    `New assignment posted for ${studentName} in ${subject}. Due date: ${dueDate}. Please ensure timely submission.`,
  
  EXAM_RESULTS: (studentName: string, examName: string, percentage: number) =>
    `Exam results published for ${studentName}. ${examName}: ${percentage}%. Detailed report card is available. Contact us for more details.`,
  
  LEAVE_APPROVED: (studentName: string, date: string) =>
    `Leave request for ${studentName} on ${date} has been approved.`,
  
  LEAVE_REJECTED: (studentName: string, date: string, reason: string) =>
    `Leave request for ${studentName} on ${date} has been rejected. Reason: ${reason}`,
  
  PTM_INVITATION: (studentName: string, date: string, time: string) =>
    `Parent-Teacher Meeting scheduled for ${studentName}. Date: ${date}, Time: ${time}. Please confirm your attendance.`,
  
  REPORT_CARD: (studentName: string, term: string) =>
    `${term} Report Card for ${studentName} is now available. Please collect it from the office or download from our system.`,
  
  GENERAL_ANNOUNCEMENT: (title: string, content: string) =>
    `📢 Announcement: ${title}\n\n${content}`,
};
