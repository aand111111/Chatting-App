import React from "react";
import {
  X,
  Phone,
  Video,
  Search,
  MoreVertical,
  Star,
  Archive,
  Trash2,
} from "lucide-react";
import { Chat } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ProfilePanelProps {
  chat: Chat;
  isOpen: boolean;
  onClose: () => void;
  onDeleteChat?: (chatId: number) => void;
  onArchiveChat?: (chatId: number) => void;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const ProfilePanel: React.FC<ProfilePanelProps> = ({
  chat,
  isOpen,
  onClose,
  onDeleteChat,
  onArchiveChat,
}) => {
  const handleDeleteChat = () => {
    if (onDeleteChat) {
      if (confirm(`Are you sure you want to delete chat with ${chat.name}?`)) {
        onDeleteChat(chat.id);
        onClose();
      }
    }
  };

  const handleArchiveChat = () => {
    if (onArchiveChat) {
      onArchiveChat(chat.id);
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "w-full sm:w-[400px] lg:w-[350px] bg-[#111b21] border-l border-[#2a3942] flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
        "absolute right-0 top-0 h-full z-50 md:relative md:translate-x-0",
        !isOpen && "md:hidden",
      )}
    >
      {/* Header */}
      <div className="h-[60px] bg-[#202c33] flex items-center justify-between px-5 border-b border-[#2a3942]">
        <h2 className="text-[#e9edef] text-xl font-normal">
          Customer Profile Data
        </h2>
        <button
          onClick={onClose}
          className="bg-transparent border-none text-[#8696a0] cursor-pointer p-2 rounded-full transition-colors duration-200 hover:bg-[#2a3942] hover:text-[#d1d7db]"
          title="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-[#202c33] flex flex-col items-center py-8 px-5 border-b border-[#2a3942]">
        <div className="w-[120px] h-[120px] rounded-full mb-4 overflow-hidden bg-[#2a3942] flex items-center justify-center text-[#8696a0] text-4xl font-medium">
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
        <h3 className="text-[#e9edef] text-2xl font-normal mb-2">
          {chat.name}
        </h3>
        <p className="text-[#8696a0] text-base">{chat.phone}</p>
        <p className="text-[#8696a0] text-sm mt-1">
          {chat.online ? "online" : "last seen recently"}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-6 mt-6">
          <button
            className="flex flex-col items-center gap-2 p-3 rounded-full bg-[#2a3942] text-[#00a884] hover:bg-[#3b4a54] transition-colors duration-200"
            title="Voice Call"
          >
            <Phone size={20} />
            <span className="text-xs text-[#8696a0]">Call</span>
          </button>
          <button
            className="flex flex-col items-center gap-2 p-3 rounded-full bg-[#2a3942] text-[#00a884] hover:bg-[#3b4a54] transition-colors duration-200"
            title="Video Call"
          >
            <Video size={20} />
            <span className="text-xs text-[#8696a0]">Video</span>
          </button>
          <button
            className="flex flex-col items-center gap-2 p-3 rounded-full bg-[#2a3942] text-[#00a884] hover:bg-[#3b4a54] transition-colors duration-200"
            title="Search"
          >
            <Search size={20} />
            <span className="text-xs text-[#8696a0]">Search</span>
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex-1 overflow-y-auto bg-[#111b21] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2a3942] hover:scrollbar-thumb-[#3b4a54]">
        {/* Customer Details Section */}
        <div className="px-5 py-4 border-b border-[#2a3942]">
          <h4 className="text-[#00a884] text-sm font-medium mb-4">
            Customer Information
          </h4>

          {/* Email */}
          <div className="mb-4">
            <label className="text-[#8696a0] text-xs font-medium block mb-1">
              Email
            </label>
            <p className="text-[#e9edef] text-sm">
              {chat.email || "customer@example.com"}
            </p>
          </div>

          {/* Instagram Profile */}
          <div className="mb-4">
            <label className="text-[#8696a0] text-xs font-medium block mb-1">
              Instagram Profile ID
            </label>
            <p className="text-[#e9edef] text-sm">
              {chat.instagram || "@customer_handle"}
            </p>
          </div>

          {/* Customer Name */}
          <div className="mb-4">
            <label className="text-[#8696a0] text-xs font-medium block mb-1">
              Customer Name
            </label>
            <p className="text-[#e9edef] text-sm">{chat.name}</p>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="text-[#8696a0] text-xs font-medium block mb-1">
              Notes
            </label>
            <textarea
              className="w-full bg-[#2a3942] text-[#e9edef] text-sm p-3 rounded-lg resize-none h-20 outline-none border border-[#3b4a54] focus:border-[#00a884]"
              placeholder="Add customer notes..."
              defaultValue="Premium customer, prefers email communication"
            />
          </div>

          {/* Customer Tags */}
          <div className="mb-4">
            <label className="text-[#8696a0] text-xs font-medium block mb-2">
              Customer tags
            </label>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#00a884] text-white px-3 py-1 rounded-full text-xs">
                VIP
              </span>
              <span className="bg-[#2a3942] text-[#8696a0] px-3 py-1 rounded-full text-xs border border-[#3b4a54]">
                Premium
              </span>
              <span className="bg-[#2a3942] text-[#8696a0] px-3 py-1 rounded-full text-xs border border-[#3b4a54]">
                Loyal
              </span>
            </div>
          </div>

          {/* Customer ID */}
          <div className="mb-4">
            <label className="text-[#8696a0] text-xs font-medium block mb-1">
              Customer ID
            </label>
            <p className="text-[#e9edef] text-sm font-mono">
              CST-{chat.id.toString().padStart(6, "0")}
            </p>
          </div>
        </div>

        {/* Interaction History */}
        <div className="px-5 py-4 border-b border-[#2a3942]">
          <h4 className="text-[#00a884] text-sm font-medium mb-3">
            Recent Interactions
          </h4>
          <div className="space-y-3">
            <div className="bg-[#2a3942] p-3 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#e9edef] text-sm font-medium">
                  Support Ticket #1247
                </span>
                <span className="text-[#8696a0] text-xs">2 days ago</span>
              </div>
              <p className="text-[#8696a0] text-xs">
                Product inquiry - Resolved
              </p>
            </div>
            <div className="bg-[#2a3942] p-3 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#e9edef] text-sm font-medium">
                  Order #ORD-5678
                </span>
                <span className="text-[#8696a0] text-xs">1 week ago</span>
              </div>
              <p className="text-[#8696a0] text-xs">
                Purchase completed - $299.99
              </p>
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="px-5 py-4 border-b border-[#2a3942]">
          <h4 className="text-[#00a884] text-sm font-medium mb-3">
            Communication Preferences
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#e9edef] text-sm">
                Email Notifications
              </span>
              <div className="w-10 h-6 bg-[#00a884] rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#e9edef] text-sm">SMS Updates</span>
              <div className="w-10 h-6 bg-[#3b4a54] rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#e9edef] text-sm">
                Marketing Materials
              </span>
              <div className="w-10 h-6 bg-[#00a884] rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="px-5 py-4">
          <div className="space-y-1">
            <button
              onClick={handleArchiveChat}
              className="w-full flex items-center gap-3 p-3 text-[#e9edef] hover:bg-[#2a3942] transition-colors duration-200 rounded-lg text-left"
            >
              <Archive size={20} className="text-[#8696a0]" />
              <span className="text-sm">Archive chat</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-[#e9edef] hover:bg-[#2a3942] transition-colors duration-200 rounded-lg text-left">
              <Star size={20} className="text-[#8696a0]" />
              <span className="text-sm">Starred messages</span>
            </button>
            <button
              onClick={handleDeleteChat}
              className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-[#2a3942] transition-colors duration-200 rounded-lg text-left"
            >
              <Trash2 size={20} />
              <span className="text-sm">Delete chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
