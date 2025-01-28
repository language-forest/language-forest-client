import {
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  VStack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { LanguageEnum } from "@repo/language-forest-api";
import { useState } from "react";
import { SkipProgress } from "@/screen/login/onboarding/_component/shared/SkipProgress.tsx";

const languageInfos = [
  { displayText: "🇯🇵 일본어", enum: LanguageEnum.JA },
  { displayText: "🇨🇳 중국어", enum: LanguageEnum.ZH },
  { displayText: "🇫🇷 프랑스어", enum: LanguageEnum.FR },
  { displayText: "🇪🇸 스페인어", enum: LanguageEnum.ES },
  { displayText: "🇩🇪 독일어", enum: LanguageEnum.DE },
  { displayText: "🙅‍♀️ 아직 없어요", enum: undefined },
];

export const AnotherLanguage = () => {
  useDisableScroll();

  const [isActive, setIsActive] = useState(false);
  const { onMoveNext, onMovePrev, updateUserInfo, userInfo } =
    useOnboardingStore();

  return (
    <GlobalContainer>
      <LFHeader
        left={<LFHeaderGoBack onGoBack={onMovePrev} />}
        right={<SkipProgress />}
      />
      <TopQuestion title={"외에 더 배우고 싶은 언어가 있나요?"} />

      <MainContentContainer>
        <VStack style={{ gap: 12, width: "100%" }}>
          {languageInfos.map((genderInfo) => (
            <LFFillButton
              type={
                isActive && userInfo?.languageSecond === genderInfo.enum
                  ? "LineSelected"
                  : "Line"
              }
              onClick={() => {
                setIsActive(true);
                updateUserInfo({ languageSecond: genderInfo.enum });
              }}
            >
              {genderInfo.displayText}
            </LFFillButton>
          ))}
        </VStack>

        <LFFillButton disabled={!isActive} type={"Green"} onClick={onMoveNext}>
          다음
        </LFFillButton>
      </MainContentContainer>
    </GlobalContainer>
  );
};
