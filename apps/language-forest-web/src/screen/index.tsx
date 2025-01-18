import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore.ts";

const IndexScreen = () => {
  const { checkLoginStatus } = useUserStore();
  console.log(checkLoginStatus());
  useEffect(() => {}, []);

  return <div>button</div>;
};

export default IndexScreen;
