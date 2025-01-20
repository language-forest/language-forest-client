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

export const Occupation = () => {
  useDisableScroll();
  const { onMoveNext, onMovePrev, updateUserInfo, userInfo } =
    useOnboardingStore();

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion
        title={"어떤 일을 하시는지 궁금해요"}
        description={"비슷한 관심사 설정을 위해 필요해요"}
      />

      <MainContentContainer>
        <VStack style={{ width: "100%" }}>
          <LFInputField
            value={(userInfo?.occupation as string) ?? ""}
            placeholder={"어떤일을 하시나요?"}
            onInputChange={(e) => updateUserInfo({ occupation: e })}
          />
        </VStack>

        <LFFillButton
          disabled={!userInfo?.occupation}
          type={"Green"}
          onClick={onMoveNext}
        >
          다음
        </LFFillButton>
      </MainContentContainer>
    </GlobalContainer>
  );
};
