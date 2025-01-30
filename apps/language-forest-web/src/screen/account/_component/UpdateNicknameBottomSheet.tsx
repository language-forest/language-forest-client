import {
  BottomSheet,
  LFFillButton,
  LFInputField,
  VStack,
} from "@/component/design-system";
import { BaseUser } from "@repo/language-forest-api";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore.ts";

type Props = {
  isOpen: boolean;
  close: () => void;
  user: BaseUser;
};

export const UpdateNicknameBottomSheet = ({ isOpen, close, user }: Props) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [nickname, setNickname] = useState(user.nickname);

  const handleSaveNickname = async () => {
    if (user.nickname !== nickname) {
      await updateUser({ user: { nickname } });
    }

    close();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        close();
      }}
      title={"닉네임"}
    >
      <VStack gap={20}>
        <LFInputField value={nickname} onInputChange={(e) => setNickname(e)} />

        <VStack paddingVertical={20}>
          <LFFillButton type={"Green"} onClick={handleSaveNickname}>
            확인
          </LFFillButton>
        </VStack>
      </VStack>
    </BottomSheet>
  );
};
