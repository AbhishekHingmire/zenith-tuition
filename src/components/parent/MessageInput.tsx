import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Paperclip, Send, Mic } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onSend: (content: string, attachments?: File[]) => void;
}

export const MessageInput = ({ onSend }: Props) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileAttach = () => {
    toast.info("File attachment feature", {
      description: "This will open file picker to attach documents/images"
    });
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    toast.info(isRecording ? "Recording stopped" : "Recording started", {
      description: isRecording ? "Voice message ready to send" : "Recording voice message..."
    });
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex items-end gap-2">
        {/* Emoji picker */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 touch-manipulation"
          onClick={() => toast.info("Emoji picker", { description: "Emoji selection will appear here" })}
        >
          <Smile className="w-5 h-5" />
        </Button>

        {/* Text input */}
        <div className="flex-1">
          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          {message.length > 500 && (
            <p className="text-xs text-muted-foreground mt-1">
              {message.length} / 1000 characters
            </p>
          )}
        </div>

        {/* Attach file */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0 touch-manipulation"
          onClick={handleFileAttach}
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        {/* Send or voice record */}
        {message.trim() ? (
          <Button
            type="button"
            size="icon"
            className="flex-shrink-0 touch-manipulation"
            onClick={handleSend}
          >
            <Send className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            type="button"
            variant={isRecording ? "destructive" : "ghost"}
            size="icon"
            className="flex-shrink-0 touch-manipulation"
            onClick={handleVoiceRecord}
          >
            <Mic className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
