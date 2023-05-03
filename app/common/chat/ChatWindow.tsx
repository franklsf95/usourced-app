import { Send } from "@mui/icons-material";
import {
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  OutlinedInput,
  Paper,
} from "@mui/material";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { ChatMessageView } from "./ChatMessageView.js";
import {
  ChatStateAtom,
  ChatWaitingForResponseStateAtom,
} from "./ChatProvider.js";
import { useScene } from "./playbooks/ai_designer_playbook.js";

function ChatMessageListView(): JSX.Element {
  const chatState = useRecoilValue(ChatStateAtom);
  let messages = chatState.messages;
  if (chatState.incomingMessage) {
    messages = [...messages, chatState.incomingMessage];
  }
  const endOfListRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    endOfListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages]);
  return (
    <List dense sx={{ height: "calc(100vh - 280px)", overflowY: "auto" }}>
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          <ChatMessageView message={message} />
        </React.Fragment>
      ))}
      <div key="endOfList" ref={endOfListRef} />
    </List>
  );
}

function SendMessageInput(): JSX.Element {
  const [inputText, setInputText] = React.useState<string>("");
  const isWaitingForResponse = useRecoilValue(ChatWaitingForResponseStateAtom);
  const { advanceSceneWithSimulatedAIResponse } = useScene();

  const submitMessage = () => {
    if (isWaitingForResponse) {
      return;
    }
    advanceSceneWithSimulatedAIResponse();
    setInputText("");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitMessage();
    }
  };

  const placeholder = isWaitingForResponse
    ? "Please wait..."
    : "Send a message";

  return (
    <FormControl sx={{ mx: "2%", width: "96%", mt: 1 }} variant="outlined">
      <InputLabel htmlFor="send-message-input" size="small">
        {placeholder}
      </InputLabel>
      <OutlinedInput
        id="send-message-input"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={submitMessage}>
              <Send />
            </IconButton>
          </InputAdornment>
        }
        disabled={isWaitingForResponse}
        label={placeholder}
        value={inputText}
        onChange={onInputChange}
        onKeyUp={onKeyUp}
        size="small"
        placeholder="Simply press enter to watch the demo"
      />
    </FormControl>
  );
}

export function ChatWindow(): JSX.Element {
  return (
    <Grid
      container
      component={Paper}
      sx={{ width: "100%", height: "calc(100vh - 220px)" }}
    >
      <Grid item xs={12}>
        <ChatMessageListView />
        <Divider />
        <SendMessageInput />
      </Grid>
    </Grid>
  );
}
