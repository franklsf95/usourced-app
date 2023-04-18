import { Send } from "@mui/icons-material";
import {
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
  ChatMessageListAtom,
  sendMessage,
} from "./ChatProvider.js";

function ChatMessageFromMe({ message }: { message: ChatMessage }): JSX.Element {
  const me = useCurrentUser();
  const displayName = me?.displayName || "";
  const photoURL = me?.photoURL || "";
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ display: "flex", justifyContent: "flex-end", textAlign: "right" }}
    >
      <ListItemText
        primary={
          <Typography variant="body2" color="text.primary">
            {message.text}
          </Typography>
        }
        secondary={
          <>
            <Typography
              variant="body2"
              color="#999999"
              sx={{ fontSize: 10, textAlign: "right" }}
            >
              {moment(message.createdAt).fromNow()}
            </Typography>
          </>
        }
      />
      <ListItemAvatar sx={{ ml: 2, mt: 0, mr: 0 }}>
        <Avatar alt={displayName} src={photoURL} />
      </ListItemAvatar>
    </ListItem>
  );
}

function ChatMessageFromAI({ message }: { message: ChatMessage }): JSX.Element {
  const displayName = message.from.displayName || "";
  const photoURL = message.from.photoURL || "";
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={displayName} src={photoURL} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2" color="text.primary">
            {message.text}
          </Typography>
        }
        secondary={
          <>
            <Typography
              variant="body2"
              color="#999999"
              sx={{ fontSize: 10, textAlign: "right" }}
            >
              {moment(message.createdAt).fromNow()}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}

function ChatMessageView({ message }: { message: ChatMessage }): JSX.Element {
  return message.from.uid === "__ME__" ? (
    <ChatMessageFromMe message={message} />
  ) : (
    <ChatMessageFromAI message={message} />
  );
}

function ChatMessageListView(): JSX.Element {
  const messages = useRecoilValue(ChatMessageListAtom);
  return (
    <List sx={{ height: "90%", overflowY: "auto" }}>
      {messages.map((message) => (
        <>
          <ChatMessageView key={message.id} message={message} />
          <Divider />
        </>
      ))}
    </List>
  );
}

function SendMessageInput(): JSX.Element {
  const [inputText, setInputText] = React.useState<string>("");
  const setChatMessageList = useSetRecoilState(ChatMessageListAtom);

  const submitMessage = () => {
    if (!inputText) {
      return;
    }
    sendMessage(setChatMessageList, inputText);
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

  return (
    <FormControl sx={{ my: 1, mx: "1%", width: "98%" }} variant="outlined">
      <InputLabel htmlFor="send-message-input">Send a Message</InputLabel>
      <OutlinedInput
        id="send-message-input"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Send />
            </IconButton>
          </InputAdornment>
        }
        label="Send a Message"
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
