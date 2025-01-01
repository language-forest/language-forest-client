"use client";

import { useGetUserInfoMe } from "@repo/language-forest-api";

export default async function UserInfoPage() {
  const { data } = useGetUserInfoMe();

  console.log("data", data);
  return (
    <div>
      <h1>Error</h1>
      <p>Failed to fetch user information.</p>
    </div>
  );
}
