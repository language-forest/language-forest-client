import { BottomSheet, LFFillButton, VStack } from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { useState } from "react";
import { BaseUserInfo, GenderEnum } from "@repo/language-forest-api";
import { GenderEnumTransformer } from "@repo/shared/util";

type Props = {
  isOpen: boolean;
  close: () => void;
  userInfo: BaseUserInfo;
};

export const UpdateGenderBottomSheet = ({ isOpen, close, userInfo }: Props) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [gender, setGender] = useState(userInfo.gender);

  const handleSaveGender = async () => {
    if (userInfo.gender !== gender) {
      await updateUser({ userInfo: { gender } });
    }

    close();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        close();
      }}
    >
      <VStack gap={20}>
        <VStack style={{ gap: 12, width: "100%" }}>
          {GenderInfos.map((genderInfo) => (
            <LFFillButton
              type={genderInfo.enum === gender ? "LineSelected" : "Line"}
              onClick={() => setGender(genderInfo.enum)}
            >
              {genderInfo.displayText}
            </LFFillButton>
          ))}
        </VStack>

        <VStack paddingVertical={20}>
          <LFFillButton type={"Green"} onClick={handleSaveGender}>
            확인
          </LFFillButton>
        </VStack>
      </VStack>
    </BottomSheet>
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
