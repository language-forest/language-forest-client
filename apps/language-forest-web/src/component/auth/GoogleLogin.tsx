import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@repo/language-forest-api";
import { AuthKey, cookieStore } from "@repo/shared/storage";
import styled from "@emotion/styled";
import GoogleLogo from "./GoogleLogo.svg";
import { LFColor } from "@repo/shared/constant";
import { LFText } from "@/component/design-system";

type GoogleLoginProps = {
  onLoginSuccess: () => Promise<void>;
};

export const GoogleLogin = ({ onLoginSuccess }: GoogleLoginProps) => {
  const clientId =
    "534905735410-e72i9oi4k8sqe2fpcn55q4m2645fbgnr.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <InnerGoogleLogin onLoginSuccess={onLoginSuccess} />
    </GoogleOAuthProvider>
  );
};

const InnerGoogleLogin = ({ onLoginSuccess }: GoogleLoginProps) => {
  const handleLogin = async (accessToken: string) => {
    const info = await googleLogin({
      token: { accessToken },
      language: navigator.language,
    });

    cookieStore.set(AuthKey.accessToken, info.accessToken, {
      maxAge: AuthKey.accessTokenMaxAge,
    });
    cookieStore.set(AuthKey.refreshToken, info.refreshToken, {
      maxAge: AuthKey.refreshTokenMaxAge,
    });
    await onLoginSuccess();
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleLogin(tokenResponse.access_token);
    },
  });

  return (
    <GoogleLoginButton onClick={() => login()}>
      <GoogleLogo />
      <LFText variant="callout" color={"LFBlack"} weight={"M"}>
        Google로 시작하기
      </LFText>
    </GoogleLoginButton>
  );
};

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${LFColor.OpacityB18};
`;
