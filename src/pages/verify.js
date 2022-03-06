import Head from "next/head";
import NextLink from "next/link";
import { Alert, Box, Button, Container, Link, Snackbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { logOutAccount } from "/src/services/user";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import RedirectPage from "/src/components/redirect-page";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";

const Verify = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

  useEffect(() => {
    if ((!user && !userLoading) || userError) router.push("/login");
  }, [user, userLoading, userError]);

  useEffect(() => {
    console.log(user);
    if (user) {
      if (user.providerData[0].providerId !== "password" || user.emailVerified)
        return router.push("/");
    }
  }, [user]);

  if (userLoading || !user) return null;

  return (
    <>
      <RedirectPage
        title="Verify Email"
        mainText="Verify Your Email"
        secondaryTypography={
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Before being able to use your account you need to verify that this is your email address
            by clicking the link we sent, click{" "}
            <Link
              variant="subtitle2"
              underline={sending ? "none" : "hover"}
              sx={{
                cursor: "pointer",
              }}
              disabled={sending}
              color={sending ? "text" : "primary"}
              onClick={async (e) => await sendEmailVerification()}
            >
              here
            </Link>{" "}
            to resend.
          </Typography>
        }
        image="/static/images/undraw_mailbox_re_dvds.svg"
        buttonText="Go to Login"
        onContinue={(e) => logOutAccount()}
        continueUrl="/login"
      />

      <SnackbarErrorMessage error={userError} />
      <SnackbarErrorMessage error={error} />
    </>
  );
};

export default Verify;
