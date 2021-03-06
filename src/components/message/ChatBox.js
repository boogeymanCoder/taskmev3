import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Drawer, Grid, useMediaQuery } from "@mui/material";
import ConversationViewer from "./ConversationViewer";
import ChatBar from "./ChatBar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Box } from "@material-ui/core";

export default function ChatBox({
  conversationViewerProps,
  chatBarProps,
  messageListProps,
  messageInputProps,
}) {
  const min600 = useMediaQuery("(min-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box sx={{ height: "90vh", overflow: "hidden" }}>
      <Drawer open={openDrawer} onClose={(e) => setOpenDrawer(false)} anchor="left">
        <ConversationViewer
          {...conversationViewerProps}
          drawer={!min600}
          onClose={() => setOpenDrawer(false)}
        />
      </Drawer>
      <Grid container sx={{ height: "100vh", m: 0, p: 0 }}>
        <Grid
          item
          xs={5}
          sx={{
            maxHeight: "95vh",
            overflow: "auto",
            display: min600 ? null : "none",
            m: 0,
            p: 0,
          }}
        >
          <ConversationViewer {...conversationViewerProps} />
        </Grid>
        <Grid item xs={min600 ? 7 : 12} sx={{ maxHeight: "95vh", m: 0, p: 0 }}>
          <Grid container sx={{ height: "90vh", overflow: "auto", overflowX: "hidden" }}>
            <Grid item xs={12} sx={{ mb: 1 }} position="sticky" top={0}>
              <ChatBar {...chatBarProps} drawer={!min600} onDrawer={() => setOpenDrawer(true)} />
            </Grid>
            <Grid item xs={12} zIndex="message_list">
              <MessageList {...messageListProps} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }} position="sticky" bottom={0}>
              <MessageInput {...messageInputProps} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

ChatBox.propTypes = {
  /**
   * The props to pass for the underlying ConversationViewer component.
   */
  conversationViewerProps: PropTypes.object.isRequired,
  /**
   * The props to pass for the underlying ChatBar component.
   */
  chatBarProps: PropTypes.object.isRequired,
  /**
   * The props to pass for the underlying MessageList component.
   */
  messageListProps: PropTypes.object.isRequired,
  /**
   * The props to pass for the underlying MessageInput component.
   */
  messageInputProps: PropTypes.object.isRequired,
};
