import { UserInfo } from "firebase/auth";
import moment from "moment";
import { SetterOrUpdater, atom, selector } from "recoil";
import { chat } from "../../core/openai.js";

export type ChatMessage = {
  id: string;
  text: string;
  createdAt: Date;
  from: UserInfo;
  isTyping: boolean;
};

const AI_AGENT = {
  uid: "AI",
  email: "AI",
  displayName: "USourced",
  photoURL: "/usourced-icon.png",
  phoneNumber: "",
  providerId: "",
};

const CURRENT_USER = {
  uid: "__ME__",
  email: "",
  displayName: "",
  photoURL: "",
  phoneNumber: "",
  providerId: "",
};

type ChatState = {
  messages: ChatMessage[];
  incomingMessage: ChatMessage | null;
};

function getOpenAIMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.from.uid === "AI" ? "assistant" : ("user" as "assistant" | "user"),
    content: m.text,
    name: m.from.uid,
  }));
}

export const ChatStateAtom = atom<ChatState>({
  key: "ChatState",
  default: {
    messages: [
      {
        id: Math.random().toString(),
        text: "Welcome to USourced! What is your product sourcing request?",
        createdAt: moment().toDate(),
        from: AI_AGENT,
        isTyping: false,
      },
    ],
    incomingMessage: null,
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet(async (newChatState) => {
        const { messages } = newChatState;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.from.uid !== AI_AGENT.uid) {
          setSelf(() => ({
            messages,
            incomingMessage: {
              id: Math.random().toString(),
              text: "",
              createdAt: moment().toDate(),
              from: AI_AGENT,
              isTyping: true,
            },
          }));
          const response = await chat(getOpenAIMessages(messages));
          const reply = response.data.choices[0].message?.content;
          setSelf(() => ({
            messages: [
              ...messages,
              {
                id: Math.random().toString(),
                text: reply || "",
                createdAt: moment().toDate(),
                from: AI_AGENT,
                isTyping: false,
              },
            ],
            incomingMessage: null,
          }));
        }
      });
    },
  ],
});

export const ChatWaitingForResponseStateAtom = selector<boolean>({
  key: "ChatWaitingForResponseState",
  get: ({ get }) => {
    const { incomingMessage } = get(ChatStateAtom);
    return incomingMessage !== null && incomingMessage.isTyping;
  },
});

export function sendMessage(
  setChatState: SetterOrUpdater<ChatState>,
  messageText: string,
) {
  const newMessage: ChatMessage = {
    id: Math.random().toString(),
    text: messageText,
    createdAt: moment().toDate(),
    from: CURRENT_USER,
    isTyping: false,
  };
  setChatState((old) => ({
    ...old,
    messages: [...old.messages, newMessage],
  }));
}
