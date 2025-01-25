import { GoogleLogin } from "../../component/auth/GoogleLogin";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import styled from "@emotion/styled";
import {
  CTAPosition,
  Divider,
  GlobalContainer,
  LFLink,
  LFText,
  VStack,
} from "@/component/design-system";
import { AppleLogin } from "@/component/auth/AppleLogin.tsx";
import { LoginStatusEnum, useUserStore } from "@/store/useUserStore.ts";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";

const LoginScreen = () => {
  useDisableScroll();
  const { init, checkLoginStatus } = useUserStore();
  const { replace } = useLFNavigate();

  const handleLoginSuccess = async () => {
    await init();
    const loginStatus = checkLoginStatus();
    if (loginStatus === LoginStatusEnum.loginWithOnboarding) {
      replace("/login/onboarding");
      return;
    }

    replace("/");
  };

  return (
    <GlobalContainer>
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
          시작할 경우{" "}
          <LFLink
            href={
              "https://exclusive-unicorn-65b.notion.site/_V-0-0-7ea1d3ed94dd4e1dbb4a7e70cd223ac4"
            }
          >
            이용약관
          </LFLink>
          과{" "}
          <LFLink
            href={
              "https://exclusive-unicorn-65b.notion.site/_V-0-0-f88c6eee1b7e4ac69aac9ae90c170738"
            }
          >
            개인정보처리방침
          </LFLink>
          에
          <br />
          <Divider height={4} backgroundColor={"White"} />
          동의한 것으로 간주합니다
        </LFText>
      </CTAContainer>
    </GlobalContainer>
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
