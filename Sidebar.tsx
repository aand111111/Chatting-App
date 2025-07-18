import React from "react";
import { MessageCircle, Clock, Phone, Archive, Settings } from "lucide-react";
import { NavItem } from "@/types/chat";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeNavItem: NavItem;
  onNavItemChange: (item: NavItem) => void;
}

const navItems = [
  { id: "chats" as NavItem, icon: MessageCircle, label: "Chats" },
  { id: "status" as NavItem, icon: Clock, label: "Status" },
  { id: "calls" as NavItem, icon: Phone, label: "Calls" },
  { id: "archived" as NavItem, icon: Archive, label: "Archived" },
  { id: "settings" as NavItem, icon: Settings, label: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeNavItem,
  onNavItemChange,
}) => {
  return (
    <div className="w-[60px] bg-[#202c33] transition-all duration-300 ease-in-out overflow-hidden z-[1000] border-r border-[#2a3942] hover:w-[200px] group">
      {/* Header */}
      <div className="h-[60px] flex items-center px-5 border-b border-[#2a3942]">
        <div className="text-[#00a884] text-2xl">
          <MessageCircle size={24} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNavItem === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center px-5 py-[15px] cursor-pointer transition-all duration-200 ease-in-out relative",
                "text-[#8696a0] hover:bg-[#2a3942] hover:text-[#d1d7db]",
                isActive && "bg-[#2a3942] text-[#00a884]",
              )}
              onClick={() => onNavItemChange(item.id)}
            >
              <Icon size={20} className="mr-[15px] flex-shrink-0" />
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.label}
              </span>

              {/* Tooltip for collapsed state */}
              <div className="absolute left-[70px] bg-[#2a3942] text-[#d1d7db] px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 invisible transition-opacity duration-200 z-[1000] group-hover:hidden group-[&:not(:hover)]:hover:opacity-100 group-[&:not(:hover)]:hover:visible">
                {item.label}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
