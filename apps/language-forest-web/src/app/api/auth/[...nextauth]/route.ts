import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";
import { googleLogin } from "@repo/language-forest-api";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, session }) {
      if (account) {
        if (
          account?.provider === "google" ||
          account?.provider === "googleapis"
        ) {
          const serverToken = await googleLogin({
            accessToken: account.access_token ?? "",
          });
          token.accessToken = serverToken.accessToken;
          token.refreshToken = serverToken.refreshToken;
        }
      }
      return token;
    },
    async session({ token, session }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
