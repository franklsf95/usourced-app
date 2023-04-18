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
import { UserInfo } from "firebase/auth";
import moment from "moment";
import { useCurrentUser } from "../../core/auth.js";

type ChatMessage = {
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

function ChatMessage({ message }: { message: ChatMessage }): JSX.Element {
  return message.from.uid === "__ME__" ? (
    <ChatMessageFromMe message={message} />
  ) : (
    <ChatMessageFromAI message={message} />
  );
}

function ChatMessageList(): JSX.Element {
  return (
    <List sx={{ height: "90%", overflowY: "auto" }}>
      {messages.map((message) => (
        <>
          <ChatMessage key={message.id} message={message} />
          <Divider />
        </>
      ))}
    </List>
  );
}

function SendMessageInput(): JSX.Element {
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
      />
    </FormControl>
  );
}

export function Chat(): JSX.Element {
  return (
    <Grid container component={Paper} sx={{ width: "100%", height: "80vh" }}>
      <Grid item xs={12}>
        <ChatMessageList />
        <Divider />
        <SendMessageInput />
      </Grid>
    </Grid>
  );
}
