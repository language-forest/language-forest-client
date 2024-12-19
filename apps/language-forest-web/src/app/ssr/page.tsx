// app/user-info/page.tsx

import { getUserInfo } from "@repo/language-forest-api";

export const metadata = {
  title: "User Info",
};

export default async function UserInfoPage() {
  try {
    const userInfo = await getUserInfo();

    return (
      <div>
        <h1>User Information</h1>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user info:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to fetch user information.</p>
      </div>
    );
  }
}
