import {
  BottomSheet,
  LFFillButton,
  LFInputField,
  VStack,
} from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { BaseUserInfo } from "@repo/language-forest-api";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  close: () => void;
  userInfo: BaseUserInfo;
};

export const UpdateOccupationBottomSheet = ({
  isOpen,
  close,
  userInfo,
}: Props) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [occupation, setOccupation] = useState(userInfo.occupation);

  const handleSaveNickname = async () => {
    if (userInfo.occupation !== occupation) {
      await updateUser({ userInfo: { occupation: occupation ?? undefined } });
    }

    close();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        close();
      }}
      title={"직업"}
    >
      <VStack gap={20}>
        <LFInputField
          value={occupation ?? ""}
          onInputChange={(e) => setOccupation(e)}
        />

        <VStack paddingVertical={20}>
          <LFFillButton type={"Green"} onClick={handleSaveNickname}>
            확인
          </LFFillButton>
        </VStack>
      </VStack>
    </BottomSheet>
  );
};
