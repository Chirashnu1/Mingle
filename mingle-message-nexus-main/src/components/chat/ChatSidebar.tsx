
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat, Chat } from "@/contexts/ChatContext";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, LogOut, Plus } from "lucide-react";

const ChatSidebar = () => {
  const { user, logout } = useAuth();
  const { chats, activeChat, setActiveChat, onlineUsers } = useChat();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col border-r dark:border-gray-800">
      <div className="p-4 border-b dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={logout} title="Logout">
            <LogOut size={20} />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search chats..."
            className="pl-10 bg-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="py-2">
          {filteredChats.map((chat) => (
            <ChatItem 
              key={chat.id} 
              chat={chat} 
              isActive={activeChat?.id === chat.id}
              isOnline={chat.participants.some(p => onlineUsers.includes(p.id))}
              onClick={() => setActiveChat(chat)}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t dark:border-gray-800">
        <Button className="w-full gap-2">
          <Plus size={18} /> New Chat
        </Button>
      </div>
    </div>
  );
};

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  isOnline: boolean;
  onClick: () => void;
}

const ChatItem = ({ chat, isActive, isOnline, onClick }: ChatItemProps) => {
  const lastMessageTime = chat.lastMessage?.timestamp;
  
  return (
    <div
      className={`
        flex items-center p-3 gap-3 cursor-pointer transition-colors
        ${isActive ? 'bg-secondary dark:bg-gray-800' : 'hover:bg-muted dark:hover:bg-gray-900'}
      `}
      onClick={onClick}
    >
      <div className="relative">
        {chat.isGroup ? (
          <div className="relative w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <span className="text-lg font-medium">
              {chat.name.slice(0, 2)}
            </span>
          </div>
        ) : (
          <Avatar className="h-12 w-12">
            <AvatarImage src={chat.participants[0]?.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        
        {isOnline && !chat.isGroup && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium truncate">{chat.name}</h4>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {lastMessageTime && format(lastMessageTime, 'p')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {chat.lastMessage?.content}
          </p>
          {chat.unreadCount > 0 && (
            <Badge variant="default" className="ml-2 px-1.5 rounded-full">
              {chat.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
