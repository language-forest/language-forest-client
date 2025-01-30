import {
  CTAPosition,
  LFFillButton,
  LFPageWrapper,
  LFHeader,
  LFHeaderGoBack,
  LFPickerWheel,
  VStack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";

const startYear = 1900;
const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
const yearList = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i,
);
export const YearOfBirth = () => {
  useDisableScroll();
  const { onMoveNext, onMovePrev, updateUserInfo } = useOnboardingStore();

  return (
    <LFPageWrapper>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion
        title={"태어난 연도를 알려주세요"}
        description={"비슷한 관심사 설정을 위해 필요해요"}
      />
      <MainContentContainer>
        <VStack
          style={{
            padding: 30,
            width: "200px",
          }}
        >
          <LFPickerWheel
            list={yearList}
            getDisplayText={(item) => String(item)}
            getInitialIndex={(items) => items.indexOf(1996)}
            onSelectedChange={(e) => updateUserInfo({ yearOfBirth: e })}
          />
        </VStack>
      </MainContentContainer>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={() => onMoveNext()}>
          다음
        </LFFillButton>
      </CTAPosition>
    </LFPageWrapper>
  );
};
