
import { useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatSidebar from "./ChatSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatContainer = () => {
  const { activeChat } = useChat();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="h-screen w-full flex">
      {/* Chat Sidebar - Mobile (Overlay) */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden",
          isMobileSidebarOpen ? "block" : "hidden"
        )}
        onClick={toggleMobileSidebar}
      >
        <div
          className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background z-50 h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <ChatSidebar />
        </div>
      </div>
      
      {/* Chat Sidebar - Desktop */}
      <div className="hidden md:block w-[350px] border-r dark:border-gray-800 h-full">
        <ChatSidebar />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        <ChatHeader onMobileMenuToggle={toggleMobileSidebar} />
        
        <ScrollArea className="flex-1 overflow-y-auto">
          <MessageList />
        </ScrollArea>
        
        {activeChat && <MessageInput />}
      </div>
    </div>
  );
};

export default ChatContainer;
