import {
  BottomSheet,
  LFFillButton,
  LFInputField,
  LFList,
  LFText,
  VStack,
} from "@/component/design-system";
import { userMeDelete } from "@repo/language-forest-api";

type Props = {
  isOpen: boolean;
  close: () => void;
  socialLoginText: string;
  onLogout: () => void;
};

export const AccountManagementBottomSheet = ({
  isOpen,
  close,
  socialLoginText,
  onLogout,
}: Props) => {
  const handleDeleteUser = async () => {
    await userMeDelete();
    onLogout();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        close();
      }}
      title={"계정"}
      contentContainerStyle={{ padding: 0 }}
    >
      <VStack gap={8} paddingVertical={20}>
        <VStack paddingHorizontal={20}>
          <VStack paddingHorizontal={4} paddingVertical={8}>
            <LFText variant={"caption1"} color={"ContentSubC"} weight={"M"}>
              소셜 로그인
            </LFText>
          </VStack>

          <LFInputField value={socialLoginText} disabled={true} />
        </VStack>

        <LFList list={[{ title: "로그아웃", onClick: onLogout }]} />
        <LFList list={[{ title: "탈퇴하기", onClick: handleDeleteUser }]} />
      </VStack>

      <VStack paddingHorizontal={20} paddingVertical={20}>
        <LFFillButton type={"Green"} onClick={() => close()}>
          확인
        </LFFillButton>
      </VStack>
    </BottomSheet>
  );
};
