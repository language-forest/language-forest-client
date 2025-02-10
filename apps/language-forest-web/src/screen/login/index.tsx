import { GoogleLogin } from "../../component/auth/GoogleLogin";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import styled from "@emotion/styled";
import {
  CTAPosition,
  Divider,
  LFPageWrapper,
  LFLink,
  LFText,
  VStack,
} from "@/component/design-system";
import { LoginStatusEnum, useUserStore } from "@/store/useUserStore.ts";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { AppleLogin } from "@/component/auth/AppleLogin.tsx";
import { PRIVACY_POLICY_URL, TERMS_URL } from "@repo/shared/constant";

const LoginScreen = () => {
  useDisableScroll();
  const { init, checkLoginStatus } = useUserStore();
  const { replace } = useLFNavigate();

  const handleLoginSuccess = async () => {
    await init();
    const loginStatus = checkLoginStatus();
    if (loginStatus === LoginStatusEnum.loginWithOnboarding) {
      replace({ path: "loginOnboarding" });
      return;
    }

    replace({ path: "home" });
  };

  return (
    <LFPageWrapper>
      <CTAContainer>
        <CTAButtonContainer>
          <GoogleLogin onLoginSuccess={handleLoginSuccess} />
          <AppleLogin onLoginSuccess={handleLoginSuccess} />
        </CTAButtonContainer>
        <LFText
          textAlign={"center"}
          variant="subHeadline"
          color={"LFBlack"}
          weight={"R"}
        >
          시작할 경우 <LFLink href={TERMS_URL}>이용약관</LFLink>과{" "}
          <LFLink href={PRIVACY_POLICY_URL}>개인정보처리방침</LFLink>
          에
          <br />
          동의한 것으로 간주합니다
        </LFText>
      </CTAContainer>
    </LFPageWrapper>
  );
};

const CTAContainer = styled(CTAPosition)`
  gap: 24px;
`;

const CTAButtonContainer = styled(VStack)`
  padding: 0 20px;
  gap: 12px;
`;

export default LoginScreen;
