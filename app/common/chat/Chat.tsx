import { Send } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { useCurrentUser } from "../../core/auth.js";
import {
  ChatMessage,
  ChatStateAtom,
  ChatWaitingForResponseStateAtom,
} from "./ChatProvider.js";
import { useScene } from "./playbook.js";

function MessageTimeView({
  message,
  textAlign,
}: {
  message: ChatMessage;
  textAlign: string;
}): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="#999999"
      sx={{ fontSize: 10, textAlign }}
    >
      {moment(message.createdAt).fromNow()}
    </Typography>
  );
}

function MessageView({ message }: { message: ChatMessage }): JSX.Element {
  return (
    <Typography variant="body2" color="text.primary">
      {message.text}
      {message.isTyping ? (
        <span className="blinking-cursor"> &#x258C;</span>
      ) : (
        ""
      )}
    </Typography>
  );
}

function RichMessageView({ message }: { message: ChatMessage }): JSX.Element {
  return (
    <Box>
      <MessageView message={message} />
      {message.payload?.attachments?.map((attachment: { url: string }) => (
        <Box key={attachment.url}>
          <img src={attachment.url} height={150} />
        </Box>
      )) ?? null}
    </Box>
  );
}

function SystemMessageView({ message }: { message: ChatMessage }): JSX.Element {
  const displayName = message.from.displayName || "";
  const photoURL = message.from.photoURL || "";
  return (
    <ListItem key={message.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={displayName} src={photoURL} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Alert severity="error">
            System Error: {message.payload?.error.message}
          </Alert>
        }
        secondary={<MessageTimeView message={message} textAlign="left" />}
      />
    </ListItem>
  );
}

function ChatMessageFromMeView({
  message,
}: {
  message: ChatMessage;
}): JSX.Element {
  const me = useCurrentUser();
  const displayName = me?.displayName || "";
  const photoURL = me?.photoURL || "";
  return (
    <ListItem
      key={message.id}
      alignItems="flex-start"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right",
      }}
    >
      <ListItemText
        primary={<RichMessageView message={message} />}
        secondary={<MessageTimeView message={message} textAlign="right" />}
        sx={{ ml: 8 }}
      />
      <ListItemAvatar sx={{ ml: 2 }}>
        <Avatar alt={displayName} src={photoURL} />
      </ListItemAvatar>
    </ListItem>
  );
}

function ChatMessageFromOtherUserView({
  message,
}: {
  message: ChatMessage;
}): JSX.Element {
  const displayName = message.from.displayName || "";
  const photoURL = message.from.photoURL || "";
  return (
    <ListItem key={message.id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={displayName} src={photoURL} />
      </ListItemAvatar>
      <ListItemText
        primary={<RichMessageView message={message} />}
        secondary={<MessageTimeView message={message} textAlign="left" />}
      />
    </ListItem>
  );
}

function ChatMessageView({ message }: { message: ChatMessage }): JSX.Element {
  switch (message.from.uid) {
    case "__SYSTEM__": {
      return <SystemMessageView message={message} />;
    }
    case "__ME__": {
      return <ChatMessageFromMeView message={message} />;
    }
    default: {
      return <ChatMessageFromOtherUserView message={message} />;
    }
  }
}

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
    <List sx={{ height: "calc(100vh - 300px)", overflowY: "auto" }}>
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          <ChatMessageView message={message} />
          <Divider variant="inset" />
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
      <InputLabel htmlFor="send-message-input">{placeholder}</InputLabel>
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
        placeholder="Simply press enter to watch the demo"
      />
    </FormControl>
  );
}

export function Chat(): JSX.Element {
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
