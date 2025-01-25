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
import { useState } from "react";
import { SkipProgress } from "@/screen/login/onboarding/_component/shared/SkipProgress.tsx";

const LocationInfos = [
  { displayText: "🚌 대중교통 이용 시", value: "publicTransportation" },
  { displayText: "🏫 학교/사무실", value: "schoolOrOffice" },
  { displayText: "☕ 카페", value: "cafe" },
  { displayText: "🏡 집", value: "house" },
];

export const StudyPlace = () => {
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
          {LocationInfos.map((genderInfo) => (
            <LFFillButton
              type={
                userInfo?.studyPlace === genderInfo.value
                  ? "LineSelected"
                  : "Line"
              }
              onClick={() => {
                setIsActive(true);
                updateUserInfo({ studyPlace: genderInfo.value });
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
