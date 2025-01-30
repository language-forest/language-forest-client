import {
  LFFillButton,
  LFPageWrapper,
  LFHeader,
  LFHeaderGoBack,
  VStack,
  LFText,
  HStack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { useState } from "react";
import { SkipProgress } from "@/screen/login/onboarding/_component/shared/SkipProgress.tsx";
import { MBTIInfos, MBTIGroupKey } from "@repo/shared/util";

export const MBTI = () => {
  useDisableScroll();

  const [MBTIValues, setMBTIValues] = useState({
    IE: "",
    NS: "",
    FT: "",
    PJ: "",
  });
  const [isActive, setIsActive] = useState(false);
  const { onMoveNext, onMovePrev, updateUserInfo } = useOnboardingStore();

  const handleSelect = (key: MBTIGroupKey, value: string) => {
    const updatedValues = { ...MBTIValues, [key]: value };
    setMBTIValues(updatedValues);

    const mbti =
      updatedValues["IE"] +
      updatedValues["NS"] +
      updatedValues["FT"] +
      updatedValues["PJ"];

    updateUserInfo({ mbti });

    const allAnswered = Object.values(updatedValues).every((val) => val !== "");
    setIsActive(allAnswered);
  };

  const handleGoNext = () => {
    onMoveNext();
  };

  return (
    <LFPageWrapper>
      <LFHeader
        left={<LFHeaderGoBack onGoBack={onMovePrev} />}
        right={<SkipProgress />}
      />
      <TopQuestion title={"외에 더 배우고 싶은 언어가 있나요?"} />

      <MainContentContainer>
        <VStack style={{ gap: 12, width: "100%" }}>
          {MBTIInfos.map((MBTIInfo) => (
            <VStack key={MBTIInfo.key}>
              <LFText
                variant={"subHeadline"}
                color={"ContentMainC"}
                weight={"B"}
              >
                {MBTIInfo.title}
              </LFText>

              <HStack style={{ gap: 12 }}>
                {MBTIInfo.values.map((value) => {
                  const isSelected = MBTIValues[MBTIInfo.key] === value.value;
                  return (
                    <LFFillButton
                      key={value.value}
                      type={isSelected ? "LineSelected" : "Line"} // 선택 여부에 따라 스타일 변경
                      onClick={() => handleSelect(MBTIInfo.key, value.value)} // 선택 핸들러 호출
                    >
                      {value.text}
                    </LFFillButton>
                  );
                })}
              </HStack>
            </VStack>
          ))}
        </VStack>

        <LFFillButton
          disabled={!isActive}
          type={"Green"}
          onClick={handleGoNext}
        >
          다음
        </LFFillButton>
      </MainContentContainer>
    </LFPageWrapper>
  );
};
