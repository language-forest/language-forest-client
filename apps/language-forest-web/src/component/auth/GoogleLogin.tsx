import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@repo/language-forest-api";

export const GoogleLogin = () => {
  const handleLogin = async (accessToken: string) => {
    const info = await googleLogin({ accessToken });
    console.log("info", info);
    return info;
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleLogin(tokenResponse.access_token);
    },
  });

  return (
    <button
      onClick={() => login()}
      style={{
        padding: 20,
        background: "blue",
      }}
    >
      구글 로그인 하기
    </button>
  );
};
