"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { cookieStore } from "@repo/shared/storage";
import { authInfo, TIME_MS } from "@repo/shared/constant";
import { getUserInfo } from "@repo/language-forest-api";

export default function AuthButtons() {
  const { data: session } = useSession();

  const handleHello = async () => {
    try {
      const aa = await getUserInfo();
    } catch (e) {
      console.error("error", e);
    }
  };

  useEffect(() => {
    cookieStore.set(authInfo.accessToken, session?.accessToken, {
      maxAge: authInfo.accessTokenMaxAge,
    });
    cookieStore.set(authInfo.refreshToken, session?.refreshToken, {
      maxAge: authInfo.refreshTokenMaxAge,
    });

    cookieStore.set(
      authInfo.accessTokenLastCheckExpiresAt,
      String(Date.now() + authInfo.accessTokenLastCheckExpiresAtTriggerTime),
      {
        maxAge: authInfo.refreshTokenMaxAge,
      },
    );
  }, [session?.accessToken, session?.refreshToken]);

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>로그아웃</button>
        <button onClick={handleHello}>hello</button>
      </div>
    );
  } else {
    return (
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        로그인 test
      </button>
    );
  }
}
