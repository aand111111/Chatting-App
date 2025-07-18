import { Chat, ChatData } from "@/types/chat";

export const initialChats: Chat[] = [
  {
    id: 1,
    name: "Abhishek Rawat",
    phone: "+919707722802",
    lastMessage: "Thank you for visiting our website 😊",
    time: "15:22",
    unread: 2,
    online: true,
    about: "Available",
  },
  {
    id: 2,
    name: "Nurat P",
    phone: "+919707474703",
    lastMessage: "Automation Online order automation...",
    time: "15:22",
    unread: 0,
    online: false,
    about: "Hey there! I am using Sup.",
  },
  {
    id: 3,
    name: "Chakri",
    phone: "+919707430261",
    lastMessage: "Sup interactive message has b...",
    time: "12:17",
    unread: 0,
    online: false,
    about: "Busy",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    phone: "+1234567890",
    lastMessage: "See you tomorrow!",
    time: "14:30",
    unread: 1,
    online: true,
    about: "Available",
  },
  {
    id: 5,
    name: "Mike Wilson",
    phone: "+1987654321",
    lastMessage: "That sounds great!",
    time: "13:45",
    unread: 0,
    online: false,
    about: "At work",
  },
];

export const initialMessages: ChatData = {
  1: [
    {
      id: 1,
      text: "Hello Abhishek, how are you?",
      sent: true,
      time: "15:20",
    },
    {
      id: 2,
      text: "Hi! I'm doing well, thank you for asking.",
      sent: false,
      time: "15:21",
    },
    {
      id: 3,
      text: "Thank you for visiting our website 😊",
      sent: false,
      time: "15:22",
    },
  ],
  2: [
    {
      id: 1,
      text: "How is the automation project going?",
      sent: true,
      time: "15:20",
    },
    {
      id: 2,
      text: "Automation Online order automation is progressing well.",
      sent: false,
      time: "15:22",
    },
  ],
  3: [
    {
      id: 1,
      text: "Can you send me the interactive message details?",
      sent: true,
      time: "12:15",
    },
    {
      id: 2,
      text: "Sup interactive message has been implemented successfully.",
      sent: false,
      time: "12:17",
    },
  ],
  4: [
    {
      id: 1,
      text: "Hey Sarah! Are we still on for the meeting tomorrow?",
      sent: true,
      time: "14:25",
    },
    {
      id: 2,
      text: "Yes absolutely! Looking forward to it.",
      sent: false,
      time: "14:28",
    },
    {
      id: 3,
      text: "See you tomorrow!",
      sent: false,
      time: "14:30",
    },
  ],
  5: [
    {
      id: 1,
      text: "Mike, what do you think about the new proposal?",
      sent: true,
      time: "13:40",
    },
    {
      id: 2,
      text: "That sounds great! I think we should move forward with it.",
      sent: false,
      time: "13:45",
    },
  ],
};
