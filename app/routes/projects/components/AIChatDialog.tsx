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
          border: "2px solid #F5CCB6",
          borderRadius: "50%",
        }}
      >
        <IconButton color="secondary" size="large" onClick={handleOpen}>
          <Chat fontSize="large" />
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
