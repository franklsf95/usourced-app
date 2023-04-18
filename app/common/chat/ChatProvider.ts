import { UserInfo } from "firebase/auth";
import moment from "moment";
import { SetterOrUpdater, atom } from "recoil";

export type ChatMessage = {
  id: string;
  text: string;
  createdAt: Date;
  from: UserInfo;
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

const messages: ChatMessage[] = [
  {
    id: "1",
    text: "Hey man what's up",
    createdAt: moment().subtract(3, "minutes").toDate(),
    from: CURRENT_USER,
  },
  {
    id: "2",
    text: "Hey, I'm Good! What about you? lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: moment().subtract(1, "minutes").toDate(),
    from: AI_AGENT,
  },
  {
    id: "3",
    text: "Cool. i am good, let's catch up!",
    createdAt: moment().toDate(),
    from: CURRENT_USER,
  },
];

export const ChatMessageListAtom = atom<ChatMessage[]>({
  key: "ChatMessageList",
  default: messages,
});

export function sendMessage(
  setChatMessageList: SetterOrUpdater<ChatMessage[]>,
  messageText: string,
) {
  const newMessage: ChatMessage = {
    id: Math.random().toString(),
    text: messageText,
    createdAt: moment().toDate(),
    from: CURRENT_USER,
  };
  setChatMessageList((old) => [...old, newMessage]);
}
