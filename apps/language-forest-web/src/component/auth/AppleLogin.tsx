import styled from "@emotion/styled";
import AppleLogo from "./AppleLogo.svg";
import { LFColor } from "@repo/shared/constant";
import { LFText } from "@/component/design-system";

type AppleLoginProps = {
  onLoginSuccess: () => Promise<void>;
};

export const AppleLogin = ({ onLoginSuccess }: AppleLoginProps) => {
  // const handleLogin = async (accessToken: string) => {
  //   const info = await googleLogin({
  //     token: { accessToken },
  //     language: navigator.language,
  //   });
  //
  //   cookieStore.set(authKey.accessToken, info.accessToken);
  //   cookieStore.set(authKey.refreshToken, info.refreshToken);
  // };
  //
  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     handleLogin(tokenResponse.access_token);
  //   },
  // });

  return (
    <AppleLoginButton onClick={() => console.log("cccccc")}>
      <AppleLogo />
      <LFText variant="callout" color={"White"} weight={"M"}>
        Apple로 시작하기
      </LFText>
    </AppleLoginButton>
  );
};

const AppleLoginButton = styled.button`
  background-color: ${LFColor.Black};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${LFColor.OpacityB18};
`;
