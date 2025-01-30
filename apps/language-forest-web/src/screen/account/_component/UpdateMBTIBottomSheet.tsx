import {
  BottomSheet,
  HStack,
  LFFillButton,
  LFText,
  VStack,
} from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { BaseUserInfo } from "@repo/language-forest-api";
import { useState } from "react";
import { MBTIGroupKey, MBTIInfos } from "@repo/shared/util";

type Props = {
  isOpen: boolean;
  close: () => void;
  userInfo: BaseUserInfo;
};

export const UpdateMBTIBottomSheet = ({ isOpen, close, userInfo }: Props) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [IE = "", NS = "", FT = "", PJ = ""] = userInfo.mbti?.split("") ?? [];
  const [isActive, setIsActive] = useState(Boolean(userInfo.mbti));

  const [MBTIValues, setMBTIValues] = useState({
    IE,
    NS,
    FT,
    PJ,
  });

  const handleSelect = async (key: MBTIGroupKey, value: string) => {
    const updatedValues = { ...MBTIValues, [key]: value };
    setMBTIValues(updatedValues);

    const allAnswered = Object.values(updatedValues).every((val) => val !== "");
    setIsActive(allAnswered);
  };

  const handleSaveMBTI = async () => {
    const mbti =
      MBTIValues["IE"] + MBTIValues["NS"] + MBTIValues["FT"] + MBTIValues["PJ"];
    if (userInfo.mbti !== mbti) {
      await updateUser({ userInfo: { mbti } });
    }

    close();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        close();
      }}
      title={"사용 목적"}
    >
      <VStack gap={20}>
        {MBTIInfos.map((MBTIInfo) => (
          <VStack key={MBTIInfo.key}>
            <LFText variant={"subHeadline"} color={"ContentMainC"} weight={"B"}>
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

        <VStack paddingVertical={20}>
          <LFFillButton
            disabled={!isActive}
            type={"Green"}
            onClick={handleSaveMBTI}
          >
            확인
          </LFFillButton>
        </VStack>
      </VStack>
    </BottomSheet>
  );
};
