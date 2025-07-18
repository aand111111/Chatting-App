export interface Chat {
  id: number;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  about: string;
}

export interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

export interface ChatData {
  [chatId: number]: Message[];
}

export type FilterType = "all" | "unread" | "groups";

export type NavItem = "chats" | "status" | "calls" | "archived" | "settings";
