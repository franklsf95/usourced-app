import { Chat } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "notistack";
import * as React from "react";
import { StaticChatWindow } from "../../../common/chat/StaticChatWindow.js";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AIChatDialog() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setOpen(true), 10000);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          border: "2px solid #183439",
          borderRadius: "50%",
          backgroundColor: "#fff",
        }}
        className="animate__animated animate__bounce"
      >
        <IconButton onClick={handleOpen} sx={{ p: 2 }}>
          <Chat sx={{ width: 48, height: 48, color: "#183439" }} />
        </IconButton>
      </Box>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 0,
            right: 0,
            maxWidth: "md",
            height: "100vh",
          },
        }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle component="div">
          <Typography variant="h2">USourced AI Chat</Typography>
        </DialogTitle>
        <DialogContent>
          <StaticChatWindow />
        </DialogContent>
      </Dialog>
    </>
  );
}
