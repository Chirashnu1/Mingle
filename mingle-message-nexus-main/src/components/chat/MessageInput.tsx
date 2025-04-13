
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Smile } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { activeChat, sendMessage, startTyping, stopTyping } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    startTyping();
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 1000);
  };
  
  const handleSendMessage = () => {
    if (!activeChat || !message.trim()) return;
    
    sendMessage(activeChat.id, message.trim());
    setMessage("");
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    stopTyping();
    
    // Focus textarea after sending
    textareaRef.current?.focus();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!activeChat) return null;
  
  return (
    <div className="p-4 border-t dark:border-gray-800">
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          disabled
        >
          <Smile size={20} />
        </Button>
        
        <div className="flex-1 rounded-md border flex items-end">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="min-h-[3rem] max-h-[8rem] resize-none border-none focus-visible:ring-0"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <Button
          size="icon"
          className="rounded-full h-10 w-10"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
