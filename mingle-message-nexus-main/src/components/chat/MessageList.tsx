
import { useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat, Message } from "@/contexts/ChatContext";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCheck, Check } from "lucide-react";

const MessageList = () => {
  const { user } = useAuth();
  const { activeChat, messages, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const chatMessages = activeChat ? messages[activeChat.id] || [] : [];
  const typingUsers = activeChat ? isTyping[activeChat.id] || [] : [];
  
  // Find users who are typing, excluding the current user
  const typingParticipants = activeChat?.participants.filter(
    (p) => typingUsers.includes(p.id) && p.id !== user?.id
  ) || [];
  
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, typingParticipants]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!activeChat) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md space-y-4">
          <h3 className="text-2xl font-bold">Welcome to Mingle</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollAreaRef} className="h-full flex-1 flex flex-col overflow-y-auto p-4 chat-scroll-smooth">
      {chatMessages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No messages yet. Start the conversation!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {chatMessages.map((message, index) => {
            const isCurrentUser = message.senderId === user?.id;
            const showAvatar = !isCurrentUser && 
              (index === 0 || chatMessages[index - 1].senderId !== message.senderId);
            
            return (
              <MessageBubble 
                key={message.id} 
                message={message} 
                isCurrentUser={isCurrentUser}
                showAvatar={showAvatar}
                chat={activeChat}
                isNew={index === chatMessages.length - 1}
              />
            );
          })}
          
          {typingParticipants.length > 0 && (
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={typingParticipants[0].avatar} alt={typingParticipants[0].name} />
                <AvatarFallback>{typingParticipants[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="message-bubble message-bubble-received py-3 px-4">
                <div className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showAvatar: boolean;
  chat: any;
  isNew?: boolean;
}

const MessageBubble = ({ message, isCurrentUser, showAvatar, chat, isNew }: MessageBubbleProps) => {
  const sender = chat.participants.find((p: any) => p.id === message.senderId);
  
  return (
    <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'} ${isNew ? 'message-new' : ''}`}>
      {!isCurrentUser && showAvatar ? (
        <Avatar className="h-8 w-8">
          <AvatarImage src={sender?.avatar} alt={sender?.name} />
          <AvatarFallback>{sender?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-8"></div>
      )}
      
      <div
        className={`message-bubble ${
          isCurrentUser ? 'message-bubble-sent' : 'message-bubble-received'
        }`}
      >
        <p>{message.content}</p>
        <div className="flex items-center justify-end gap-1 mt-1 text-xs text-right">
          <span className={isCurrentUser ? 'text-gray-100' : 'text-gray-500'}>
            {format(new Date(message.timestamp), 'p')}
          </span>
          
          {isCurrentUser && (
            <span className="ml-1">
              {message.status === 'read' ? (
                <CheckCheck size={14} />
              ) : (
                <Check size={14} />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageList;
