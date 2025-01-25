import {
  LFFillButton,
  GlobalContainer,
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

const MBTIInfos = [
  {
    title: "⚡️ 에너지를 어디서 얻나요?",
    key: "IE", // 상태 업데이트에 사용될 key
    values: [
      { text: "주변 사람들", value: "E" },
      { text: "혼자만의 시간", value: "I" },
    ],
  },
  {
    title: "📍 나에게 더 중요한 것은?",
    key: "NS",
    values: [
      { text: "현실적인 실용성", value: "S" },
      { text: "전체적인 아이디어", value: "N" },
    ],
  },
  {
    title: "🗝️ 문제를 해결하고자 할 때",
    key: "FT",
    values: [
      { text: "사람의 감정을 고려", value: "F" },
      { text: "논리를 고려", value: "T" },
    ],
  },
  {
    title: "🗓️ 평소 어느 쪽에 더 가까우신가요?",
    key: "PJ",
    values: [
      { text: "계획적인 편", value: "J" },
      { text: "즉흥적인 편", value: "P" },
    ],
  },
] as const;

type MBTIKey = (typeof MBTIInfos)[number]["key"];

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

  const handleSelect = (key: MBTIKey, value: string) => {
    const updatedValues = { ...MBTIValues, [key]: value };
    setMBTIValues(updatedValues);

    // 모든 질문이 답변되었는지 확인
    const allAnswered = Object.values(updatedValues).every((val) => val !== "");
    setIsActive(allAnswered);

    // 사용자의 선택을 업데이트 (예시)
    const mbti =
      MBTIValues["IE"] + MBTIValues["NS"] + MBTIValues["FT"] + MBTIValues["PJ"];

    updateUserInfo({ mbti });
  };

  const handleGoNext = () => {
    onMoveNext();
  };

  return (
    <GlobalContainer>
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
    </GlobalContainer>
  );
};
