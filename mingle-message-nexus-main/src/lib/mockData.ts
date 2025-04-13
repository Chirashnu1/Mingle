
import { Chat, Message } from "@/contexts/ChatContext";

export const mockChats: Chat[] = [
  {
    id: "chat1",
    name: "Sarah Johnson",
    isGroup: false,
    participants: [
      {
        id: "user2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah@example.com",
      },
    ],
    lastMessage: {
      content: "See you tomorrow then!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      senderId: "user2",
    },
    unreadCount: 0,
  },
  {
    id: "chat2",
    name: "Team Project",
    isGroup: true,
    participants: [
      {
        id: "user2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah@example.com",
      },
      {
        id: "user3",
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael@example.com",
      },
      {
        id: "user4",
        name: "Jessica Lee",
        email: "jessica@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica@example.com",
      },
    ],
    lastMessage: {
      content: "I've updated the docs with the new requirements",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      senderId: "user3",
    },
    unreadCount: 2,
  },
  {
    id: "chat3",
    name: "David Wilson",
    isGroup: false,
    participants: [
      {
        id: "user5",
        name: "David Wilson",
        email: "david@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david@example.com",
      },
    ],
    lastMessage: {
      content: "Can you send me the presentation?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20 hours ago
      senderId: "user5",
    },
    unreadCount: 1,
  },
  {
    id: "chat4",
    name: "Emma Thompson",
    isGroup: false,
    participants: [
      {
        id: "user6",
        name: "Emma Thompson",
        email: "emma@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma@example.com",
      },
    ],
    lastMessage: {
      content: "Thanks for your help yesterday!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      senderId: "user1", // Current user
    },
    unreadCount: 0,
  },
  {
    id: "chat5",
    name: "Friend Group",
    isGroup: true,
    participants: [
      {
        id: "user3",
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael@example.com",
      },
      {
        id: "user6",
        name: "Emma Thompson",
        email: "emma@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma@example.com",
      },
      {
        id: "user7",
        name: "Alex Rodriguez",
        email: "alex@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex@example.com",
      },
    ],
    lastMessage: {
      content: "Anyone free this weekend?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      senderId: "user7",
    },
    unreadCount: 0,
  },
];

// Generate mock messages for each chat
export const mockMessages: Record<string, Message[]> = {
  chat1: [
    {
      id: "msg1_1",
      chatId: "chat1",
      senderId: "user2",
      content: "Hi there! How are you doing today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "read",
    },
    {
      id: "msg1_2",
      chatId: "chat1",
      senderId: "user1", // Current user
      content: "I'm doing well, thanks for asking! How about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      status: "read",
    },
    {
      id: "msg1_3",
      chatId: "chat1",
      senderId: "user2",
      content: "Pretty good! Just finishing up some work for tomorrow.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      status: "read",
    },
    {
      id: "msg1_4",
      chatId: "chat1",
      senderId: "user1", // Current user
      content: "Nice. Want to grab lunch tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: "read",
    },
    {
      id: "msg1_5",
      chatId: "chat1",
      senderId: "user2",
      content: "Sure, that sounds great! How about that new place downtown?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: "read",
    },
    {
      id: "msg1_6",
      chatId: "chat1",
      senderId: "user1", // Current user
      content: "Perfect! Let's meet there at noon.",
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      status: "read",
    },
    {
      id: "msg1_7",
      chatId: "chat1",
      senderId: "user2",
      content: "See you tomorrow then!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: "read",
    },
  ],
  chat2: [
    {
      id: "msg2_1",
      chatId: "chat2",
      senderId: "user2",
      content: "Has everyone reviewed the latest project brief?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      status: "read",
    },
    {
      id: "msg2_2",
      chatId: "chat2",
      senderId: "user1", // Current user
      content: "Yes, I've gone through it. Looks good overall.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.9),
      status: "read",
    },
    {
      id: "msg2_3",
      chatId: "chat2",
      senderId: "user3",
      content: "I have a few questions about the timeline. Can we discuss in our next meeting?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.8),
      status: "read",
    },
    {
      id: "msg2_4",
      chatId: "chat2",
      senderId: "user4",
      content: "Sure, I'll add it to the agenda.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.7),
      status: "read",
    },
    {
      id: "msg2_5",
      chatId: "chat2",
      senderId: "user3",
      content: "I've updated the docs with the new requirements",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: "delivered",
    },
    {
      id: "msg2_6",
      chatId: "chat2",
      senderId: "user2",
      content: "Can everyone review by EOD?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
      status: "delivered",
    },
  ],
  chat3: [
    {
      id: "msg3_1",
      chatId: "chat3",
      senderId: "user5",
      content: "Hey, do you have time for a quick call later?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21),
      status: "read",
    },
    {
      id: "msg3_2",
      chatId: "chat3",
      senderId: "user1", // Current user
      content: "Sure, what time works for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20.5),
      status: "read",
    },
    {
      id: "msg3_3",
      chatId: "chat3",
      senderId: "user5",
      content: "How about 3pm?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20.3),
      status: "read",
    },
    {
      id: "msg3_4",
      chatId: "chat3",
      senderId: "user1", // Current user
      content: "That works for me. I'll send you a meeting link.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20.2),
      status: "read",
    },
    {
      id: "msg3_5",
      chatId: "chat3",
      senderId: "user5",
      content: "Can you send me the presentation?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
      status: "delivered",
    },
  ],
  chat4: [
    {
      id: "msg4_1",
      chatId: "chat4",
      senderId: "user6",
      content: "Thank you for your help with the project yesterday!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.1),
      status: "read",
    },
    {
      id: "msg4_2",
      chatId: "chat4",
      senderId: "user1", // Current user
      content: "No problem at all! Happy to help.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.05),
      status: "read",
    },
    {
      id: "msg4_3",
      chatId: "chat4",
      senderId: "user6",
      content: "Do you have time to review another document this week?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.03),
      status: "read",
    },
    {
      id: "msg4_4",
      chatId: "chat4",
      senderId: "user1", // Current user
      content: "Sure, just send it over when it's ready.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.02),
      status: "read",
    },
    {
      id: "msg4_5",
      chatId: "chat4",
      senderId: "user1", // Current user
      content: "Thanks for your help yesterday!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      status: "delivered",
    },
  ],
  chat5: [
    {
      id: "msg5_1",
      chatId: "chat5",
      senderId: "user3",
      content: "Hey everyone! How's it going?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.2),
      status: "read",
    },
    {
      id: "msg5_2",
      chatId: "chat5",
      senderId: "user6",
      content: "All good here! Just finished a big project.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.15),
      status: "read",
    },
    {
      id: "msg5_3",
      chatId: "chat5",
      senderId: "user1", // Current user
      content: "Congrats on finishing the project, Emma!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.1),
      status: "read",
    },
    {
      id: "msg5_4",
      chatId: "chat5",
      senderId: "user7",
      content: "Anyone free this weekend?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      status: "read",
    },
  ],
};
