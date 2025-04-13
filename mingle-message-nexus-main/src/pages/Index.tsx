
import { useAuth } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import AuthForm from "@/components/auth/AuthForm";
import ChatContainer from "@/components/chat/ChatContainer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      {isAuthenticated ? (
        <ChatProvider>
          <ChatContainer />
        </ChatProvider>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-gray-900 dark:to-indigo-950 p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Mingle
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Connect and chat with friends in real-time
              </p>
            </div>
            <AuthForm />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default Index;
