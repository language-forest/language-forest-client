// app/user-info/page.tsx

import { getUserInfoMe, useGetUserInfoMe } from "@repo/language-forest-api";

export const metadata = {
  title: "User Info",
};

export default async function UserInfoPage() {
  const { data } = useGetUserInfoMe();

  console.log(data);
  return (
    <div>
      <h1>Error</h1>
      <p>Failed to fetch user information.</p>
    </div>
  );
}
