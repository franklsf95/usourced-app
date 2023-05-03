import {
  Alert,
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCurrentUser } from "../../core/auth.js";
import { ChatMessage } from "./ChatProvider.js";

function MessageTimeView({
  message,
  textAlign,
}: {
  message: ChatMessage;
  textAlign: "left" | "right";
}): JSX.Element {
  return (
    <span style={{ color: "#999", fontSize: 10, textAlign: textAlign }}>
      {moment(message.createdAt).fromNow()}
    </span>
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
      {message.payload}
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
          <Alert severity="error">System Error: {message.error?.message}</Alert>
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
  const displayName = me?.displayName || message.from.displayName || "";
  const photoURL = me?.photoURL || message.from.photoURL || "";
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
        sx={{ my: 0 }}
      />
    </ListItem>
  );
}

export function ChatMessageView({
  message,
}: {
  message: ChatMessage;
}): JSX.Element {
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
