import { ChatMessage } from "@/types/parent";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";

interface Props {
  messages: ChatMessage[];
  currentUserId: string;
}

export const MessageThread = ({ messages, currentUserId }: Props) => {
  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return format(date, 'h:mm a');
    if (diffInMinutes < 10080) return format(date, 'EEE h:mm a');
    return format(date, 'MMM d, h:mm a');
  };

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};
    
    messages.forEach(msg => {
      const dateKey = format(msg.timestamp, 'yyyy-MM-dd');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
    });
    
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) return 'Today';
    if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) return 'Yesterday';
    return format(date, 'MMMM d, yyyy');
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {groupedMessages.map(([dateStr, msgs]) => (
        <div key={dateStr}>
          {/* Date separator */}
          <div className="flex items-center justify-center my-4">
            <div className="bg-muted px-3 py-1 rounded-full">
              <span className="text-xs text-muted-foreground font-medium">
                {getDateLabel(dateStr)}
              </span>
            </div>
          </div>

          {/* Messages */}
          {msgs.map((message) => {
            const isOwnMessage = message.senderId === currentUserId;
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-3`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[60%] rounded-lg px-4 py-2 ${
                    isOwnMessage
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {/* Reply indicator */}
                  {message.replyTo && (
                    <div className={`text-xs mb-2 pb-2 border-b ${
                      isOwnMessage ? 'border-primary-foreground/20' : 'border-border'
                    }`}>
                      <span className="opacity-70">Replying to previous message</span>
                    </div>
                  )}

                  {/* Message content */}
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className={`text-xs p-2 rounded border ${
                            isOwnMessage
                              ? 'border-primary-foreground/20 bg-primary-foreground/10'
                              : 'border-border bg-background/50'
                          }`}
                        >
                          <span className="font-medium">{file.name}</span>
                          <span className="ml-2 opacity-70">({file.size})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timestamp and read status */}
                  <div className={`flex items-center gap-1 mt-1 text-xs ${
                    isOwnMessage ? 'opacity-80' : 'opacity-60'
                  }`}>
                    <span>{formatMessageTime(message.timestamp)}</span>
                    {isOwnMessage && (
                      message.isRead ? (
                        <CheckCheck className="w-3 h-3" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )
                    )}
                  </div>

                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.reactions.map((reaction, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isOwnMessage
                              ? 'bg-primary-foreground/20'
                              : 'bg-background/50'
                          }`}
                        >
                          {reaction.emoji} {reaction.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
