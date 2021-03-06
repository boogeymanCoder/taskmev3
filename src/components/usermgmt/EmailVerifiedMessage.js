import { logOutAccount } from "/src/services/user";
import RedirectPage from "../redirect-page";

/**
 * Displayed after a user verifies email.
 */
const EmailVerifiedMessage = () => (
  <RedirectPage
    title="Email Verified"
    mainText="Your email has been verified"
    secondaryText="You can now sign in with your new account"
    image="/static/images/undraw_subscriber_re_om92.svg"
    onContinue={(e) => logOutAccount()}
    buttonText="Go to Login"
    continueUrl="/login"
  />
);

export default EmailVerifiedMessage;
