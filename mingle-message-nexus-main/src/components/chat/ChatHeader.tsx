
import { useChat } from "@/contexts/ChatContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, Phone, Video, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ChatHeader = ({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) => {
  const { activeChat, onlineUsers } = useChat();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const isOnline = activeChat?.participants.some(p => onlineUsers.includes(p.id));
  
  return (
    <header className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuToggle}
        >
          <Menu />
        </Button>
        
        {activeChat ? (
          <div className="flex items-center gap-3">
            {activeChat.isGroup ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="font-medium">{activeChat.name.slice(0, 2)}</span>
              </div>
            ) : (
              <Avatar>
                <AvatarImage src={activeChat.participants[0]?.avatar} alt={activeChat.name} />
                <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            
            <div>
              <h2 className="font-semibold">{activeChat.name}</h2>
              
              {activeChat.isGroup ? (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {activeChat.participants.length} participants
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {isOnline ? (
                    <Badge variant="outline" className="text-xs h-5 bg-green-500/10 text-green-500 border-green-500/20">
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs h-5 bg-gray-500/10 text-gray-500 border-gray-500/20">
                      Offline
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <h2 className="font-semibold">Mingle Messages</h2>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        {activeChat && (
          <>
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
              <Info size={18} />
            </Button>
          </>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
