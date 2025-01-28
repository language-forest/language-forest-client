import {
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  LFInputField,
  VStack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";

export const Purpose = () => {
  useDisableScroll();
  const { onMoveNext, onMovePrev, updateUserInfo, userInfo } =
    useOnboardingStore();

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion title={"언어의숲을 사용하시려는 목적이 궁금해요"} />

      <MainContentContainer>
        <VStack style={{ width: "100%" }}>
          <LFInputField
            value={(userInfo?.purpose as string) ?? ""}
            onInputChange={(e) => updateUserInfo({ purpose: e })}
          />
        </VStack>

        <LFFillButton
          disabled={!userInfo?.purpose}
          type={"Green"}
          onClick={onMoveNext}
        >
          다음
        </LFFillButton>
      </MainContentContainer>
    </GlobalContainer>
  );
};
