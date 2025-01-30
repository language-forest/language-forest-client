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

export const UpdatePurposeBottomSheet = ({
  isOpen,
  close,
  userInfo,
}: Props) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [purpose, setPurpose] = useState(userInfo.purpose);

  const handleSaveNickname = async () => {
    if (userInfo.purpose !== purpose) {
      await updateUser({ userInfo: { purpose: purpose ?? undefined } });
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
        <LFInputField
          value={purpose ?? ""}
          onInputChange={(e) => setPurpose(e)}
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
