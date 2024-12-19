import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // 새로운 필드 추가
    refreshToken?: string; // 새로운 필드 추가
  }
}
