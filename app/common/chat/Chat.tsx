import { Send } from "@mui/icons-material";
import {
  Alert,
  Avatar,
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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCurrentUser } from "../../core/auth.js";
import {
  ChatMessage,
  ChatStateAtom,
  ChatWaitingForResponseStateAtom,
  sendMessage,
} from "./ChatProvider.js";

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
        secondary={
          <Typography
            variant="body2"
            color="#999999"
            sx={{ fontSize: 10, textAlign: "right" }}
          >
            {moment(message.createdAt).fromNow()}
          </Typography>
        }
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
      sx={{ display: "flex", justifyContent: "flex-end", textAlign: "right" }}
    >
      <ListItemText
        primary={<MessageView message={message} />}
        secondary={
          <Typography
            variant="body2"
            color="#999999"
            sx={{ fontSize: 10, textAlign: "right" }}
          >
            {moment(message.createdAt).fromNow()}
          </Typography>
        }
      />
      <ListItemAvatar sx={{ ml: 2, mt: 0, mr: 0 }}>
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
        primary={<MessageView message={message} />}
        secondary={
          <Typography
            variant="body2"
            color="#999999"
            sx={{ fontSize: 10, textAlign: "right" }}
          >
            {moment(message.createdAt).fromNow()}
          </Typography>
        }
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
  return (
    <List sx={{ height: "90%", overflowY: "auto" }}>
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          <ChatMessageView message={message} />
          <Divider variant="inset" />
        </React.Fragment>
      ))}
    </List>
  );
}

function SendMessageInput(): JSX.Element {
  const [inputText, setInputText] = React.useState<string>("");
  const isWaitingForResponse = useRecoilValue(ChatWaitingForResponseStateAtom);
  const setChatState = useSetRecoilState(ChatStateAtom);

  const submitMessage = () => {
    if (isWaitingForResponse) {
      return;
    }
    if (!inputText) {
      return;
    }
    sendMessage(setChatState, inputText);
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
    : "Send a Message";

  return (
    <FormControl sx={{ my: 1, mx: "1%", width: "98%" }} variant="outlined">
      <InputLabel htmlFor="send-message-input">{placeholder}</InputLabel>
      <OutlinedInput
        id="send-message-input"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Send />
            </IconButton>
          </InputAdornment>
        }
        disabled={isWaitingForResponse}
        label={placeholder}
        value={inputText}
        onChange={onInputChange}
        onKeyUp={onKeyUp}
      />
    </FormControl>
  );
}

export function Chat(): JSX.Element {
  return (
    <Grid container component={Paper} sx={{ width: "100%", height: "80vh" }}>
      <Grid item xs={12}>
        <ChatMessageListView />
        <Divider />
        <SendMessageInput />
      </Grid>
    </Grid>
  );
}
