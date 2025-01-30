import {
  LFFillButton,
  LFPageWrapper,
  LFHeader,
  LFHeaderGoBack,
  LFInputField,
  VStack,
  HStack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { LFSmallButton } from "@/component/design-system/Button/LFSmallButton.tsx";
import { useState } from "react";

const interestItemList = [
  { name: "여행", emoji: "😆" },
  { name: "test", emoji: "😆" },
  { name: "test1", emoji: "😆" },
  { name: "test2", emoji: "😆" },
  { name: "test4", emoji: "😆" },
  { name: "test6", emoji: "😆" },
  { name: "test7", emoji: "😆" },
  { name: "test8", emoji: "😆" },
  { name: "test9", emoji: "😆" },
  { name: "test11", emoji: "😆" },
];

export const Interest = () => {
  useDisableScroll();

  const { onMoveNext, onMovePrev, updateUserInfo } = useOnboardingStore();

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleMOveNext = () => {
    updateUserInfo({ interest: [inputValue, ...selectedItem] });
    onMoveNext();
  };

  const handleItemSelect = (newItem: string) => {
    setSelectedItem((prevItem) => {
      if (prevItem.includes(newItem)) {
        return prevItem.filter((item) => item !== newItem);
      }
      return [...prevItem, newItem];
    });
  };

  return (
    <LFPageWrapper>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion
        title={"관심 있는 분야에 대해 알려주세요"}
        description={"자세히 적을수록 좋아요!"}
      />

      <MainContentContainer>
        <VStack style={{ width: "100%" }}>
          <LFInputField
            value={inputValue}
            placeholder={"관심 있는 분야를 알려주세요!"}
            onInputChange={(e) => setInputValue(e)}
          />
        </VStack>

        <LFFillButton
          disabled={!inputValue}
          type={"Green"}
          onClick={handleMOveNext}
        >
          다음
        </LFFillButton>

        <HStack style={{ gap: 12, flexWrap: "wrap" }}>
          {interestItemList.map((item) => {
            return (
              <LFSmallButton
                key={item.name}
                onClick={() => handleItemSelect(item.name)}
                selected={selectedItem.includes(item.name)}
              >
                {item.emoji} {item.name}
              </LFSmallButton>
            );
          })}
        </HStack>
      </MainContentContainer>
    </LFPageWrapper>
  );
};
