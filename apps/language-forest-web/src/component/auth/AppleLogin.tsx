import styled from "@emotion/styled";
import AppleLogo from "./AppleLogo.svg";
import { LFColor } from "@repo/shared/constant";
import { LFText, LFToast } from "@/component/design-system";
import { bridge } from "@/util/webview.ts";
import { appleLogin } from "@repo/language-forest-api";
import { AuthKey, cookieStore } from "@repo/shared/storage";

type AppleLoginProps = {
  onLoginSuccess: () => Promise<void>;
};

export const AppleLogin = ({ onLoginSuccess }: AppleLoginProps) => {
  const handleAppleLogin = async () => {
    const appleLoginInfo = await bridge.onAppleLogin();
    if (!appleLoginInfo.isSuccess) {
      LFToast({
        text: "로그인에 실패했습니다.\n계속 반복되면 다른 로그인 방식을 선택해주세요.",
        position: "top",
        duration: 2000,
      });
      return;
    }
    try {
      const { accessToken, refreshToken } = await appleLogin({
        language: navigator.language,
        appleId: appleLoginInfo.response.user,
        email: appleLoginInfo.response.email ?? undefined,
        familyName: appleLoginInfo.response.fullName?.familyName ?? undefined,
        givenName: appleLoginInfo.response.fullName?.givenName ?? undefined,
        middleName: appleLoginInfo.response.fullName?.middleName ?? undefined,
        namePrefix: appleLoginInfo.response.fullName?.namePrefix ?? undefined,
        nameSuffix: appleLoginInfo.response.fullName?.nameSuffix ?? undefined,
        nickname: appleLoginInfo.response.fullName?.nickname ?? undefined,
        nonce: appleLoginInfo.response?.nonce ?? undefined,
        realUserStatus: appleLoginInfo.response?.realUserStatus ?? undefined,
        state: appleLoginInfo.response?.state ?? undefined,
      });

      cookieStore.set(AuthKey.accessToken, accessToken, {
        maxAge: AuthKey.accessTokenMaxAge,
      });
      cookieStore.set(AuthKey.refreshToken, refreshToken, {
        maxAge: AuthKey.refreshTokenMaxAge,
      });

      await onLoginSuccess();
    } catch (e) {
      LFToast({
        text: "로그인에 실패했습니다. 계속 반복되면 다른 로그인 방식을 선택해주세요.",
        position: "top",
        duration: 2000,
      });
      console.error(e);
    }
  };

  return (
    <AppleLoginButton onClick={handleAppleLogin}>
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
