import {
  LFFillButton,
  LFPageWrapper,
  LFHeader,
  LFHeaderGoBack,
  VStack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { GenderEnum } from "@repo/language-forest-api";
import { GenderEnumTransformer } from "@repo/shared/util";

export const Gender = () => {
  useDisableScroll();
  const { onMoveNext, onMovePrev, updateUserInfo, userInfo } =
    useOnboardingStore();

  return (
    <LFPageWrapper>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion
        title={"성별을 알려주세요"}
        description={"님을 언급할 대명사를 정하기 위해 필요해요"}
      />

      <MainContentContainer>
        <VStack style={{ gap: 12, width: "100%" }}>
          {GenderInfos.map((genderInfo) => (
            <LFFillButton
              type={
                userInfo?.gender === genderInfo.enum ? "LineSelected" : "Line"
              }
              onClick={() => updateUserInfo({ gender: genderInfo.enum })}
            >
              {genderInfo.displayText}
            </LFFillButton>
          ))}
        </VStack>

        <LFFillButton
          disabled={!userInfo?.gender}
          type={"Green"}
          onClick={onMoveNext}
        >
          다음
        </LFFillButton>
      </MainContentContainer>
    </LFPageWrapper>
  );
};

const GenderInfos = [
  {
    displayText: GenderEnumTransformer(GenderEnum.MALE),
    enum: GenderEnum.MALE,
  },
  {
    displayText: GenderEnumTransformer(GenderEnum.FEMALE),
    enum: GenderEnum.FEMALE,
  },
  {
    displayText: GenderEnumTransformer(GenderEnum.OTHER),
    enum: GenderEnum.OTHER,
  },
];
