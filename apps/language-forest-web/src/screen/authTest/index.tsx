import withAuth from "@/hoc/AuthHoc.tsx";

const AuthTestScreen = withAuth(
  () => {
    return <>aaaaaaaaaaaaa</>;
  },
  {
    behavior: "modal",
  },
);

export default AuthTestScreen;
