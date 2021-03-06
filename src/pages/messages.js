import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLayout } from "../components/dashboard-layout";
import CheckAuth from "/src/components/auth/CheckAuth";
import AccountCheck from "/src/components/account/AccountCheck";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { App as SendBirdApp } from "sendbird-uikit";
import { LinearProgress } from "@mui/material";

function Messages() {
  const router = useRouter();
  // get currently logged in user
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  useEffect(() => {
    console.log({ user, userLoading, userError });
  }, [user, userLoading, userError]);

  if (!user || userLoading || userError) return <LinearProgress />;

  return (
    <CheckAuth>
      <MessagesPage user={user} />
    </CheckAuth>
  );
}

/**
 * Here the user can view their messages.
 */
export function MessagesPage({ user }) {
  return (
    <CheckAuth>
      <AccountCheck>
        <Head>
          <title>Messages | TaskME</title>
        </Head>

        <SendBirdApp
          appId={process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID} // Specify your Sendbird application ID.
          userId={user.uid} // Specify your user ID.
          config={{ logLevel: "all" }}
          nickname={user.fullname}
          profileUrl={user.photoURL}
          disableAutoSelect={true}
          replyType="QUOTE_REPLY"
        />
      </AccountCheck>
    </CheckAuth>
  );
}

Messages.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Messages;
