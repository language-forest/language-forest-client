import {
  BottomSheet,
  LFFillButton,
  LFPickerWheel,
  VStack,
} from "@/component/design-system";
import { BaseUserInfo } from "@repo/language-forest-api";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore.ts";

type Props = {
  isOpen: boolean;
  close: () => void;
  userInfo: BaseUserInfo;
};

export const UpdateYearOfBirthBottomSheet = ({
  isOpen,
  close,
  userInfo,
}: Props) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [yearOfBirth, setYearOfBirth] = useState(userInfo.yearOfBirth);

  const handleSaveYearOfBirth = async () => {
    if (userInfo.yearOfBirth !== yearOfBirth) {
      await updateUser({ userInfo: { yearOfBirth: yearOfBirth ?? undefined } });
    }

    close();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        close();
      }}
      title={"태어난 해"}
    >
      <VStack gap={20}>
        <LFPickerWheel
          list={yearList}
          getDisplayText={(item) => String(item)}
          getInitialIndex={(items) =>
            items.indexOf(yearOfBirth ?? DEFAULT_YEAR)
          }
          onSelectedChange={(e) => setYearOfBirth(e)}
        />

        <VStack paddingVertical={20}>
          <LFFillButton type={"Green"} onClick={handleSaveYearOfBirth}>
            확인
          </LFFillButton>
        </VStack>
      </VStack>
    </BottomSheet>
  );
};

const startYear = 1900;
const DEFAULT_YEAR = 1996;
const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
const yearList = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i,
);
