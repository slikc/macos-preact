import { atom } from 'jotai';

export type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  read?: boolean;
  sentWithSiri?: boolean;
};

export type Conversation = {
  id: string;
  contact: {
    name: string;
    avatar?: string;
  };
  messages: Message[];
  lastMessageDate: Date;
};

// Sample data with placeholder content
const conversations: Conversation[] = [
  {
    id: '1',
    contact: {
      name: 'Alex Smith',
    },
    messages: [
      {
        id: '1-1',
        text: "Hey, how's it going?",
        sender: 'other',
        timestamp: new Date('2023-03-05T12:00:00'),
        read: true,
      },
      {
        id: '1-2',
        text: 'Pretty good! Just working on that new project.',
        sender: 'me',
        timestamp: new Date('2023-03-05T12:05:00'),
      },
      {
        id: '1-3',
        text: 'The one you mentioned last week?',
        sender: 'other',
        timestamp: new Date('2023-03-05T12:07:00'),
      },
      {
        id: '1-4',
        text: 'Yeah! Finally got all the features working properly.',
        sender: 'me',
        timestamp: new Date('2023-03-05T12:10:00'),
      },
      {
        id: '1-5',
        text: 'That sounds awesome! Can I see it?',
        sender: 'other',
        timestamp: new Date('2023-03-05T12:15:00'),
      },
      {
        id: '1-6',
        text: 'Sure! I just need to finish a few things first.',
        sender: 'me',
        timestamp: new Date('2023-03-05T12:18:00'),
      },
      {
        id: '1-7',
        text: 'Looking forward to it! Coffee this weekend?',
        sender: 'other',
        timestamp: new Date('2023-03-05T12:25:00'),
      },
      {
        id: '1-8',
        text: 'Saturday works for me. Downtown cafe?',
        sender: 'me',
        timestamp: new Date('2023-03-05T12:30:00'),
      },
      {
        id: '1-9',
        text: 'Perfect! How about 2pm?',
        sender: 'other',
        timestamp: new Date('2023-03-05T12:35:00'),
      },
      {
        id: '1-10',
        text: 'Sounds good. See you then!',
        sender: 'me',
        timestamp: new Date('2023-03-05T12:40:00'),
      },
      {
        id: '1-11',
        text: "Can't wait! 👍",
        sender: 'other',
        timestamp: new Date('2023-03-05T12:45:00'),
      },
    ],
    lastMessageDate: new Date('2023-03-05T12:45:00'),
  },
  {
    id: '2',
    contact: {
      name: 'user123@example.com',
    },
    messages: [
      {
        id: '2-1',
        text: 'Still having issues with that update',
        sender: 'other',
        timestamp: new Date('2023-03-01T15:00:00'),
        read: true,
      },
    ],
    lastMessageDate: new Date('2023-03-01T15:00:00'),
  },
  {
    id: '3',
    contact: {
      name: 'Nathan Dieppe',
    },
    messages: [
      {
        id: '3-1',
        text: 'your website is so much better than mine, i wish I knew how to make one without chatgpt',
        sender: 'other',
        timestamp: new Date('2023-03-03T10:00:00'),
        read: true,
      },
      {
        id: '3-2',
        text: 'yeah tbh yours was pretty horrid',
        sender: 'me',
        timestamp: new Date('2023-03-03T12:00:00'),
        read: true,
      },
    ],
    lastMessageDate: new Date('2023-03-03T10:00:00'),
  },
  {
    id: '4',
    contact: {
      name: 'Dude Person',
    },
    messages: [
      {
        id: '4-1',
        text: 'lol',
        sender: 'other',
        timestamp: new Date('2023-03-02T17:00:00'),
        read: true,
      },
    ],
    lastMessageDate: new Date('2023-03-02T17:00:00'),
  },
  {
    id: '5',
    contact: {
      name: 'GameStore',
    },
    messages: [
      {
        id: '5-1',
        text: 'GameStore: Your verification code is 123456',
        sender: 'other',
        timestamp: new Date('2023-03-01T09:00:00'),
        read: true,
      },
    ],
    lastMessageDate: new Date('2023-03-01T09:00:00'),
  },
  {
    id: '6',
    contact: {
      name: 'AirTravel',
    },
    messages: [
      {
        id: '6-1',
        text: "Hi there, Your flight is currently delayed but we'll update you soon with more information...",
        sender: 'other',
        timestamp: new Date('2023-02-20T11:00:00'),
        read: true,
      },
    ],
    lastMessageDate: new Date('2023-02-20T11:00:00'),
  },
  {
    id: '7',
    contact: {
      name: 'Service Updates',
    },
    messages: [
      {
        id: '7-1',
        text: 'Welcome to your destination! Our local services are...',
        sender: 'other',
        timestamp: new Date('2023-02-17T14:00:00'),
        read: true,
      },
    ],
    lastMessageDate: new Date('2023-02-17T14:00:00'),
  },
];

// Current active conversation
export const activeConversationIdAtom = atom<string | null>(null);

// All conversations
export const conversationsAtom = atom<Conversation[]>(conversations);

// Selected conversation
export const selectedConversationAtom = atom((get) => {
  const activeId = get(activeConversationIdAtom);
  const allConversations = get(conversationsAtom);

  return activeId ? allConversations.find((conv) => conv.id === activeId) || null : null;
});

// New message input
export const newMessageInputAtom = atom<string>('');
