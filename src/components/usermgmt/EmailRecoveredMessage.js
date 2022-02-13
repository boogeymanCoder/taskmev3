import React from "react";
import RedirectPage from "../redirect-page";

export default function EmailRecoveredMessage() {
  return (
    <RedirectPage
      title="Email Recovered"
      mainText="Your email has been recovered"
      secondaryText="You can now sign in with this email"
      image="/static/images/undraw_mailbox_re_dvds.svg"
      buttonMessage="Login"
      continueUrl="/login"
    />
  );
}
