import { UserInfo } from "firebase/auth";
import moment from "moment";
import { SetterOrUpdater, atom, selector } from "recoil";
import { chat } from "../../core/openai.js";

const USE_CHATGPT = false;

export type ChatMessage = {
  id: string;
  text: string;
  createdAt: Date;
  from: UserInfo;
  isTyping?: boolean;
  payload?: JSX.Element;
  error?: Error;
};

export const SYSTEM_AGENT = {
  uid: "__SYSTEM__",
  email: "",
  displayName: "USourced",
  photoURL: "/usourced-icon.png",
  phoneNumber: "",
  providerId: "",
};

export const AI_AGENT = {
  uid: "__AI__",
  email: "",
  displayName: "USourced",
  photoURL: "/usourced-icon.png",
  phoneNumber: "",
  providerId: "",
};

export const CURRENT_USER = {
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
  return messages
    .filter((m) => m.from.uid !== "__SYSTEM__")
    .map((m) => ({
      role:
        m.from.uid === "__AI__"
          ? "assistant"
          : ("user" as "assistant" | "user"),
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
          if (!USE_CHATGPT) {
            return;
          }
          try {
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
                },
              ],
              incomingMessage: null,
            }));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            setSelf(() => ({
              messages: [
                ...messages,
                {
                  id: Math.random().toString(),
                  text: "SYSTEM_ERROR",
                  createdAt: moment().toDate(),
                  from: SYSTEM_AGENT,
                  error,
                },
              ],
              incomingMessage: null,
            }));
          }
        }
      });
    },
  ],
});

export const ChatWaitingForResponseStateAtom = selector<boolean>({
  key: "ChatWaitingForResponseState",
  get: ({ get }) => {
    const { incomingMessage } = get(ChatStateAtom);
    return incomingMessage !== null && (incomingMessage.isTyping ?? false);
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
  };
  setChatState((old) => ({
    ...old,
    messages: [...old.messages, newMessage],
  }));
}
