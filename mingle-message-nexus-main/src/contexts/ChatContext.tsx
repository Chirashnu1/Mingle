
import React, { createContext, useState, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuth, User } from "./AuthContext";

// Mock data for development - will be replaced with real data from socket
import { mockChats } from "@/lib/mockData";

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
};

export type Chat = {
  id: string;
  name: string;
  participants: User[];
  isGroup: boolean;
  lastMessage?: {
    content: string;
    timestamp: Date;
    senderId: string;
  };
  unreadCount: number;
};

type ChatContextType = {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Record<string, Message[]>;
  setActiveChat: (chat: Chat) => void;
  sendMessage: (chatId: string, content: string) => void;
  isTyping: Record<string, string[]>;
  startTyping: () => void;
  stopTyping: () => void;
  onlineUsers: string[];
  loading: boolean;
};

const ChatContext = createContext<ChatContextType>({
  chats: [],
  activeChat: null,
  messages: {},
  setActiveChat: () => {},
  sendMessage: () => {},
  isTyping: {},
  startTyping: () => {},
  stopTyping: () => {},
  onlineUsers: [],
  loading: true,
});

// Socket.IO server URL - in production, this would be your deployed backend
const SOCKET_URL = "http://localhost:3001";
let socket: Socket | null = null;

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isTyping, setIsTyping] = useState<Record<string, string[]>>({});
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Connect to Socket.IO server when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Initialize with mock data for UI structure
      setChats(mockChats);
      
      // Initialize empty messages for each chat
      const initialMessages: Record<string, Message[]> = {};
      mockChats.forEach(chat => {
        initialMessages[chat.id] = [];
      });
      setMessages(initialMessages);
      
      // Connect to Socket.IO server
      socket = io(SOCKET_URL, {
        query: { userId: user.id, userName: user.name }
      });
      
      // Socket event listeners
      socket.on("connect", () => {
        console.log("Connected to chat server");
        toast.success("Connected to chat server");
      });
      
      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
        toast.error("Couldn't connect to chat server. Using offline mode.");
        setLoading(false);
      });
      
      socket.on("disconnect", () => {
        console.log("Disconnected from chat server");
        toast.warning("Disconnected from chat server");
      });
      
      socket.on("message:new", handleNewMessage);
      socket.on("user:typing", handleUserTyping);
      socket.on("user:online", handleUserOnline);
      socket.on("user:offline", handleUserOffline);
      socket.on("user:connected", (userId: string) => {
        toast.info(`User ${userId} connected`);
      });
      socket.on("user:disconnected", (userId: string) => {
        toast.info(`User ${userId} disconnected`);
      });
      
      setLoading(false);
      
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
    
    // If not authenticated yet, just load mock data for development
    else {
      setChats(mockChats);
      const initialMessages: Record<string, Message[]> = {};
      mockChats.forEach(chat => {
        initialMessages[chat.id] = [];
      });
      setMessages(initialMessages);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const handleNewMessage = (message: Message) => {
    setMessages(prev => {
      const chatMessages = [...(prev[message.chatId] || []), message];
      return {
        ...prev,
        [message.chatId]: chatMessages,
      };
    });
    
    setChats(prev => 
      prev.map(chat => 
        chat.id === message.chatId
          ? {
              ...chat,
              lastMessage: {
                content: message.content,
                timestamp: message.timestamp,
                senderId: message.senderId,
              },
              unreadCount: activeChat?.id === chat.id ? 0 : chat.unreadCount + 1,
            }
          : chat
      )
    );
  };

  const sendMessage = (chatId: string, content: string) => {
    if (!user) return;
    
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      chatId,
      senderId: user.id,
      content,
      timestamp: new Date(),
      status: "sent",
    };
    
    // Send message to Socket.IO server if connected
    if (socket && socket.connected) {
      socket.emit("message:send", newMessage);
    } else {
      // Fallback for offline mode or connection issues
      toast.warning("Using offline mode - message not sent to server");
    }
    
    // Immediately add message to UI for responsiveness
    handleNewMessage(newMessage);
    
    // Simulate message being read after 2 seconds in offline mode
    if (!socket || !socket.connected) {
      setTimeout(() => {
        setMessages(prev => {
          const chatMessages = prev[chatId].map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "read" as const } : msg
          );
          return { ...prev, [chatId]: chatMessages };
        });
      }, 2000);
    }
  };

  const startTyping = () => {
    if (!user || !activeChat || !socket || !socket.connected) return;
    
    socket.emit("user:typing:start", {
      chatId: activeChat.id,
      userId: user.id,
    });
  };

  const stopTyping = () => {
    if (!user || !activeChat || !socket || !socket.connected) return;
    
    socket.emit("user:typing:stop", {
      chatId: activeChat.id,
      userId: user.id,
    });
  };

  const handleUserTyping = ({
    chatId,
    userId,
    isTyping: typing,
  }: {
    chatId: string;
    userId: string;
    isTyping: boolean;
  }) => {
    setIsTyping(prev => {
      const typingUsers = prev[chatId] || [];
      
      if (typing && !typingUsers.includes(userId)) {
        return { ...prev, [chatId]: [...typingUsers, userId] };
      }
      
      if (!typing && typingUsers.includes(userId)) {
        return {
          ...prev,
          [chatId]: typingUsers.filter(id => id !== userId),
        };
      }
      
      return prev;
    });
  };

  const handleUserOnline = (userId: string) => {
    if (!onlineUsers.includes(userId)) {
      setOnlineUsers(prev => [...prev, userId]);
    }
  };

  const handleUserOffline = (userId: string) => {
    setOnlineUsers(prev => prev.filter(id => id !== userId));
  };

  const handleSetActiveChat = (chat: Chat) => {
    setActiveChat(chat);
    
    // Mark messages as read
    if (chat.unreadCount > 0) {
      setChats(prev => 
        prev.map(c => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
      );
      
      // Inform server that messages have been read
      if (socket && socket.connected) {
        socket.emit("messages:read", { chatId: chat.id, userId: user?.id });
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        messages,
        setActiveChat: handleSetActiveChat,
        sendMessage,
        isTyping,
        startTyping,
        stopTyping,
        onlineUsers,
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
