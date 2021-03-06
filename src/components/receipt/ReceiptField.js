import { Avatar, Card, CardHeader } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

/**
 * Displays receipt fields with an avatar, title, subtitle and an action.
 */
export default function ReceiptField({ avatar, title, subtitle, action, ...props }) {
  return (
    <Card {...props}>
      <CardHeader
        sx={{ p: 1 }}
        avatar={avatar ? <Avatar alt={title} src={avatar} /> : undefined}
        title={title}
        subheader={subtitle}
        action={action}
      />
    </Card>
  );
}

ReceiptField.propTypes = {
  /**
   * A photo url to display on the receipt fields right side.
   */
  avatar: PropTypes.string,
  /**
   * Title of the  receipt field.
   */
  title: PropTypes.string.isRequired,
  /**
   * Subtitle of the receipt field.
   */
  subtitle: PropTypes.string,
  /**
   * An icon button that a user can click to do some actions.
   */
  action: PropTypes.node,
};
