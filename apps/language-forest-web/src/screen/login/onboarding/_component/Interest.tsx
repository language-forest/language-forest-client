import {
  LFFillButton,
  GlobalContainer,
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
  const { onMoveNext, onMovePrev, updateUserInfo, userInfo } =
    useOnboardingStore();

  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const handleItemSelect = (newItem: string) => {
    setSelectedItem((prevItem) => {
      if (prevItem.includes(newItem)) {
        return prevItem.filter((item) => item !== newItem);
      }
      return [...prevItem, newItem];
    });
  };

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
            value={(userInfo?.interest as string) ?? ""}
            placeholder={"어떤일을 하시나요?"}
            onInputChange={(e) => updateUserInfo({ interest: e })}
          />
        </VStack>

        <LFFillButton
          disabled={!userInfo?.interest}
          type={"Green"}
          onClick={onMoveNext}
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
    </GlobalContainer>
  );
};
