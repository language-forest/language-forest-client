"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { cookieStore } from "@repo/shared/storage";
import { authInfo } from "@repo/shared/constant";
import { getHello, getUserInfo } from "@repo/language-forest-api";

export default function AuthButtons() {
  const { data: session } = useSession();
  console.log("--------------");
  console.log("session", session);
  console.log("--------------");

  const handleHello = async () => {
    try {
      const aa = await getUserInfo();
      console.log(aa);
    } catch (e) {
      console.error("error", e);
    }
  };

  useEffect(() => {
    console.log("$$", session);
    cookieStore.set(authInfo.accessToken, session?.accessToken);
  }, [session?.accessToken]);

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>로그아웃</button>
        <button onClick={handleHello}>hello</button>
      </div>
    );
  } else {
    return <button onClick={() => signIn("google")}>로그인</button>;
  }
}
