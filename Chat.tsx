import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Chat, Message, ChatData, FilterType, NavItem } from "@/types/chat";
import { initialChats, initialMessages } from "@/data/chatData";
import Sidebar from "@/components/Sidebar";
import ChatList from "@/components/ChatList";
import ConversationPanel from "@/components/ConversationPanel";
import ProfilePanel from "@/components/ProfilePanel";

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [messages, setMessages] = useState<ChatData>(initialMessages);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [archivedChats, setArchivedChats] = useState<Chat[]>([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeNavItem, setActiveNavItem] = useState<NavItem>("chats");

  // Filter chats based on search query and active filter
  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.phone.includes(searchQuery);

    switch (activeFilter) {
      case "unread":
        return matchesSearch && chat.unread > 0;
      case "groups":
        return false; // No groups in demo
      default:
        return matchesSearch;
    }
  });

  const handleChatSelect = (chat: Chat) => {
    setCurrentChat(chat);
    setIsProfilePanelOpen(false);

    // Clear unread count
    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)),
    );
  };

  const handleSendMessage = (text: string) => {
    if (!currentChat) return;

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: Message = {
      id: Date.now(),
      text,
      sent: true,
      time,
    };

    // Add message to messages
    setMessages((prevMessages) => ({
      ...prevMessages,
      [currentChat.id]: [...(prevMessages[currentChat.id] || []), newMessage],
    }));

    // Update chat last message
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChat.id
          ? { ...chat, lastMessage: text, time }
          : chat,
      ),
    );

    // Simulate response after delay
    setTimeout(
      () => {
        const responses = [
          "Thanks for your message!",
          "I'll get back to you soon.",
          "That sounds interesting.",
          "Let me think about it.",
          "Sure, no problem!",
          "I agree with you.",
          "Can you send more details?",
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const responseTime = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });

        const responseMessage: Message = {
          id: Date.now() + 1,
          text: randomResponse,
          sent: false,
          time: responseTime,
        };

        setMessages((prevMessages) => ({
          ...prevMessages,
          [currentChat.id]: [
            ...(prevMessages[currentChat.id] || []),
            responseMessage,
          ],
        }));

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChat.id
              ? { ...chat, lastMessage: randomResponse, time: responseTime }
              : chat,
          ),
        );
      },
      1000 + Math.random() * 2000,
    );
  };

  const handleShowProfile = () => {
    setIsProfilePanelOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfilePanelOpen(false);
  };

  const handleDeleteChat = (chatId: number) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      delete newMessages[chatId];
      return newMessages;
    });
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
      setIsProfilePanelOpen(false);
    }
  };

  const handleArchiveChat = (chatId: number) => {
    const chatToArchive = chats.find((chat) => chat.id === chatId);
    if (chatToArchive) {
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      setArchivedChats((prevArchived) => [...prevArchived, chatToArchive]);
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setIsProfilePanelOpen(false);
      }
    }
  };

  const handleCreateNewChat = () => {
    const name = prompt("Enter contact name:");
    const phone = prompt("Enter phone number:");

    if (name && phone) {
      const newChat: Chat = {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        lastMessage: "No messages yet",
        time: "now",
        unread: 0,
        online: false,
      };

      setChats((prevChats) => [newChat, ...prevChats]);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [newChat.id]: [],
      }));
      setCurrentChat(newChat);
    }
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsProfilePanelOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#111b21] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeNavItem={activeNavItem}
        onNavItemChange={setActiveNavItem}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 bg-[#0b141a] transition-all duration-300 ease-in-out">
        {/* Chat List Panel */}
        <ChatList
          chats={filteredChats}
          currentChat={currentChat}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onChatSelect={handleChatSelect}
          onSearchChange={setSearchQuery}
          onFilterChange={setActiveFilter}
          onCreateNewChat={handleCreateNewChat}
        />

        {/* Conversation Panel */}
        <ConversationPanel
          currentChat={currentChat}
          messages={messages[currentChat?.id || 0] || []}
          onSendMessage={handleSendMessage}
          onShowProfile={handleShowProfile}
          onDeleteChat={handleDeleteChat}
          onArchiveChat={handleArchiveChat}
          onCreateNewChat={handleCreateNewChat}
        />

        {/* Profile Panel */}
        {currentChat && (
          <ProfilePanel
            chat={currentChat}
            isOpen={isProfilePanelOpen}
            onClose={handleCloseProfile}
            onDeleteChat={handleDeleteChat}
            onArchiveChat={handleArchiveChat}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
