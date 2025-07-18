import React, { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Phone,
  Video,
  Search,
  Smile,
  Paperclip,
  Send,
  Trash2,
  Archive,
  UserPlus,
} from "lucide-react";
import { Chat, Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ConversationPanelProps {
  currentChat: Chat | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onShowProfile: () => void;
  onDeleteChat?: (chatId: number) => void;
  onArchiveChat?: (chatId: number) => void;
  onCreateNewChat?: () => void;
}

const WelcomeScreen: React.FC<{ onCreateNewChat?: () => void }> = ({
  onCreateNewChat,
}) => (
  <div className="flex-1 flex flex-col items-center justify-center bg-[#0b141a] text-center px-8">
    <div className="mb-8">
      <div className="w-32 h-32 bg-[#202c33] rounded-full flex items-center justify-center mb-6">
        <div className="w-16 h-16 border-4 border-[#2a3942] rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-[#00a884] rounded-full"></div>
        </div>
      </div>
    </div>
    <h2 className="text-[#e9edef] text-3xl font-light mb-4">Sup Chat Web</h2>
    <p className="text-[#8696a0] text-base mb-8 max-w-md leading-relaxed">
      Send and receive messages without keeping your phone online. Use Sup Chat
      on up to 4 linked devices and 1 phone at the same time.
    </p>
    <button
      onClick={onCreateNewChat}
      className="flex items-center gap-2 bg-[#00a884] hover:bg-[#06c068] text-white px-6 py-3 rounded-lg transition-colors duration-200"
    >
      <UserPlus size={20} />
      Start New Chat
    </button>
  </div>
);

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const MessageBubble: React.FC<{
  message: Message;
  onReaction?: (emoji: string) => void;
}> = ({ message, onReaction }) => (
  <div
    className={cn(
      "mb-2 flex transition-all duration-300 ease-in-out",
      "max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]",
      message.sent ? "ml-auto" : "mr-auto",
    )}
  >
    <div
      className={cn(
        "rounded-lg px-3 py-2 relative transition-all duration-300 ease-in-out",
        "min-w-[120px] max-w-full break-words",
        message.sent
          ? "bg-[#005c4b] text-[#e9edef] rounded-br-sm"
          : "bg-[#202c33] text-[#e9edef] rounded-bl-sm",
      )}
    >
      <p className="text-sm leading-relaxed mb-1 word-wrap break-words">
        {message.text}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {message.reactions &&
            message.reactions.map((reaction, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#3b4a54] px-2 py-1 rounded-full"
              >
                {reaction.emoji} {reaction.count}
              </span>
            ))}
        </div>
        <span className="text-xs text-[#8696a0]">{message.time}</span>
      </div>
    </div>
  </div>
);

const ConversationPanel: React.FC<ConversationPanelProps> = ({
  currentChat,
  messages,
  onSendMessage,
  onShowProfile,
  onDeleteChat,
  onArchiveChat,
  onCreateNewChat,
}) => {
  const [messageText, setMessageText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEmojiReactions, setShowEmojiReactions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteChat = () => {
    if (currentChat && onDeleteChat) {
      if (
        confirm(
          `Are you sure you want to delete chat with ${currentChat.name}?`,
        )
      ) {
        onDeleteChat(currentChat.id);
        setShowMenu(false);
      }
    }
  };

  const handleArchiveChat = () => {
    if (currentChat && onArchiveChat) {
      onArchiveChat(currentChat.id);
      setShowMenu(false);
    }
  };

  if (!currentChat) {
    return <WelcomeScreen onCreateNewChat={onCreateNewChat} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0b141a]">
      {/* Chat Header */}
      <div className="h-[60px] bg-[#202c33] flex items-center justify-between px-5 border-b border-[#2a3942]">
        <div
          className="flex items-center cursor-pointer flex-1"
          onClick={onShowProfile}
        >
          <div className="w-[40px] h-[40px] rounded-full mr-3 flex-shrink-0 overflow-hidden bg-[#2a3942] flex items-center justify-center text-[#8696a0] text-lg font-medium">
            {currentChat.avatar ? (
              <img
                src={currentChat.avatar}
                alt={currentChat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(currentChat.name)
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-[#e9edef] text-base font-normal">
              {currentChat.name}
            </h3>
            <p className="text-[#8696a0] text-sm">
              {currentChat.online ? "online" : "last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 items-center">
          <button
            className="bg-transparent border-none text-[#8696a0] cursor-pointer p-2 rounded-full transition-colors duration-200 hover:bg-[#2a3942] hover:text-[#d1d7db]"
            title="Video Call"
          >
            <Video size={20} />
          </button>
          <button
            className="bg-transparent border-none text-[#8696a0] cursor-pointer p-2 rounded-full transition-colors duration-200 hover:bg-[#2a3942] hover:text-[#d1d7db]"
            title="Voice Call"
          >
            <Phone size={20} />
          </button>
          <button
            className="bg-transparent border-none text-[#8696a0] cursor-pointer p-2 rounded-full transition-colors duration-200 hover:bg-[#2a3942] hover:text-[#d1d7db]"
            title="Search"
          >
            <Search size={20} />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              className="bg-transparent border-none text-[#8696a0] cursor-pointer p-2 rounded-full transition-colors duration-200 hover:bg-[#2a3942] hover:text-[#d1d7db]"
              title="Menu"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-[#202c33] border border-[#2a3942] rounded-lg shadow-lg min-w-[180px] z-50">
                <button
                  onClick={handleArchiveChat}
                  className="w-full text-left px-4 py-3 text-[#e9edef] hover:bg-[#2a3942] transition-colors duration-200 flex items-center gap-3 text-sm border-b border-[#2a3942]"
                >
                  <Archive size={16} />
                  Archive chat
                </button>
                <button
                  onClick={() => {
                    setShowFeedbackModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-[#e9edef] hover:bg-[#2a3942] transition-colors duration-200 flex items-center gap-3 text-sm border-b border-[#2a3942]"
                >
                  <Star size={16} />
                  Request Feedback
                </button>
                <button
                  onClick={handleDeleteChat}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-[#2a3942] transition-colors duration-200 flex items-center gap-3 text-sm"
                >
                  <Trash2 size={16} />
                  Delete chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto p-5 bg-[#0b141a] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2a3942] hover:scrollbar-thumb-[#3b4a54]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxnIG9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Im0tMSAxaDIiIHN0cm9rZT0iI2ZmZiIvPjxwYXRoIGQ9Im0tMSAzaDIiIHN0cm9rZT0iI2ZmZiIvPjwvZz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')",
        }}
      >
        {/* Emoji Reactions Bar */}
        {showEmojiReactions && (
          <div className="sticky top-0 bg-[#202c33] border-b border-[#2a3942] p-4 z-10">
            <div className="flex items-center justify-center gap-4">
              <span className="text-[#8696a0] text-sm mr-4">
                Quick Reactions:
              </span>
              {["😡", "😢", "😐", "😊", "😍"].map((emoji, idx) => (
                <button
                  key={idx}
                  className="text-2xl hover:scale-110 transition-transform duration-200 p-2 rounded-full hover:bg-[#2a3942]"
                  onClick={() => {
                    // Add reaction logic here
                    setShowEmojiReactions(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
              <button
                onClick={() => setShowEmojiReactions(false)}
                className="text-[#8696a0] hover:text-[#e9edef] ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[#8696a0] text-sm">
            Start a conversation with {currentChat.name}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-[#e91e63] to-[#f06292] p-8 rounded-2xl max-w-md w-full mx-4 text-white relative">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                ✕
              </button>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  WE WANT YOUR FEEDBACK!
                </h3>
                <h2 className="text-2xl font-bold mb-6">TAKE THE SURVEY</h2>
                <div className="flex justify-center gap-2 mb-6">
                  {["😡", "😢", "😐", "😊", "😍"].map((emoji, idx) => (
                    <button
                      key={idx}
                      className="text-3xl hover:scale-110 transition-transform duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <p className="text-sm mb-6 opacity-90">
                  How satisfied are you with our service today?
                </p>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="bg-white text-[#e91e63] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input Area */}
      <div className="bg-[#202c33] p-5 border-t border-[#2a3942]">
        <div className="bg-[#2a3942] rounded-lg flex items-center px-4 py-3 gap-3">
          <button
            className="bg-transparent border-none text-[#8696a0] cursor-pointer p-1 rounded-full transition-colors duration-200 hover:text-[#d1d7db]"
            title="Emoji"
            onClick={() => setShowEmojiReactions(!showEmojiReactions)}
          >
            <Smile size={24} />
          </button>
          <button
            className="bg-transparent border-none text-[#8696a0] cursor-pointer p-1 rounded-full transition-colors duration-200 hover:text-[#d1d7db]"
            title="Attach"
          >
            <Paperclip size={24} />
          </button>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="bg-transparent border-none text-[#e9edef] text-base flex-1 outline-none placeholder:text-[#8696a0]"
          />
          <button
            onClick={handleSend}
            disabled={!messageText.trim()}
            className={cn(
              "bg-transparent border-none cursor-pointer p-1 rounded-full transition-colors duration-200",
              messageText.trim()
                ? "text-[#00a884] hover:text-[#06c068]"
                : "text-[#8696a0] cursor-not-allowed",
            )}
            title="Send"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
