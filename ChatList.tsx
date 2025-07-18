import React from "react";
import { Search, Edit3, MoreVertical } from "lucide-react";
import { Chat, FilterType } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatListProps {
  chats: Chat[];
  currentChat: Chat | null;
  searchQuery: string;
  activeFilter: FilterType;
  onChatSelect: (chat: Chat) => void;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: FilterType) => void;
  onCreateNewChat?: () => void;
}

const filterOptions: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "groups", label: "Groups" },
];

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const ChatItem: React.FC<{
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}> = ({ chat, isActive, onClick }) => {
  return (
    <div
      className={cn(
        "flex items-center p-3 cursor-pointer transition-colors duration-200 border-b border-[#1f2c34]",
        "hover:bg-[#2a3942]",
        isActive && "bg-[#2a3942]",
      )}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="w-[50px] h-[50px] rounded-full mr-[15px] flex-shrink-0 overflow-hidden bg-[#2a3942] flex items-center justify-center text-[#8696a0] text-xl font-medium">
        {chat.avatar ? (
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials(chat.name)
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="text-[#e9edef] text-base font-normal whitespace-nowrap overflow-hidden text-ellipsis">
            {chat.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8696a0] text-xs whitespace-nowrap">
              {chat.time}
            </span>
            {chat.unread > 0 && (
              <span className="bg-[#00a884] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {chat.unread}
              </span>
            )}
          </div>
        </div>
        <p className="text-[#8696a0] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {chat.lastMessage}
        </p>
      </div>
    </div>
  );
};

const ChatList: React.FC<ChatListProps> = ({
  chats,
  currentChat,
  searchQuery,
  activeFilter,
  onChatSelect,
  onSearchChange,
  onFilterChange,
  onCreateNewChat,
}) => {
  return (
    <div className="w-full lg:w-[350px] bg-[#111b21] border-r border-[#2a3942] flex flex-col transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="h-[60px] bg-[#202c33] flex items-center justify-between px-5 border-b border-[#2a3942]">
        <h2 className="text-[#e9edef] text-xl font-normal">Chats</h2>
        <div className="flex gap-2.5">
          <button
            className="bg-transparent border-none text-[#8696a0] cursor-pointer p-2 rounded-full transition-colors duration-200 hover:bg-[#2a3942] hover:text-[#d1d7db]"
            title="New Chat"
            onClick={onCreateNewChat}
          >
            <Edit3 size={20} />
          </button>
          <button
            className="bg-transparent border-none text-[#8696a0] cursor-pointer p-2 rounded-full transition-colors duration-200 hover:bg-[#2a3942] hover:text-[#d1d7db]"
            title="Menu"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-[10px_15px] bg-[#111b21]">
        <div className="bg-[#202c33] rounded-lg flex items-center px-3 py-2 gap-2.5">
          <Search size={20} className="text-[#8696a0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search or start new chat"
            className="bg-transparent border-none text-[#e9edef] text-sm flex-1 outline-none placeholder:text-[#8696a0]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#111b21] px-[15px] py-2.5 gap-1.5">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            className={cn(
              "bg-transparent border-none px-4 py-2 rounded-[20px] cursor-pointer text-sm transition-all duration-200",
              activeFilter === option.id
                ? "bg-[#2a3942] text-[#d1d7db]"
                : "text-[#8696a0] hover:bg-[#2a3942] hover:text-[#d1d7db]",
            )}
            onClick={() => onFilterChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-[#111b21] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2a3942] hover:scrollbar-thumb-[#3b4a54]">
        {chats.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[#8696a0] text-sm">
            No chats found
          </div>
        ) : (
          chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={currentChat?.id === chat.id}
              onClick={() => onChatSelect(chat)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
