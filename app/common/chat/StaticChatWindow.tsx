import { Send } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { ChatMessageView } from "./ChatMessageView.js";
import { ChatWaitingForResponseStateAtom } from "./ChatProvider.js";
import { useScene } from "./playbooks/ai_designer_playbook.js";
import { messages } from "./playbooks/projects_dashboard_playbook.js";

function ChatMessageListView(): JSX.Element {
  return (
    <List dense sx={{ height: "calc(100vh - 200px)", overflowY: "auto" }}>
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          <ChatMessageView message={message} />
        </React.Fragment>
      ))}
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
        size="small"
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
        placeholder="This is a demo"
      />
    </FormControl>
  );
}

export function StaticChatWindow(): JSX.Element {
  return (
    <Box>
      <ChatMessageListView />
      <Divider />
      <SendMessageInput />
    </Box>
  );
}
