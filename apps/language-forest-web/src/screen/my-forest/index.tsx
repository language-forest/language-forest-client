import {
  HStack,
  LFBottomTabNavigation,
  LFHeader,
  LFIconButton,
  LFPageWrapper,
  LFText,
} from "@/component/design-system";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { UserProfile } from "@/component/shared/UserProfile.tsx";
import { useUserStore } from "@/store/useUserStore.ts";
import withAuth from "@/hoc/AuthHoc.tsx";

const MyForestScreen = withAuth(
  () => {
    const { push } = useLFNavigate();
    const user = useUserStore((store) => store.user);

    return (
      <LFPageWrapper>
        <LFHeader
          left={
            <HStack paddingHorizontal={20}>
              <LFText variant={"title2"} weight={"B"} color={"ContentMainC"}>
                나의 숲
              </LFText>
            </HStack>
          }
          right={
            <LFIconButton
              onClick={() => {
                push({ path: "setting" });
              }}
              icon={{ variant: "Gear", color: "ContentMainC", size: 20 }}
            />
          }
        />

        <UserProfile
          user={user}
          onEditProfileClick={() => {
            push({ path: "account" });
          }}
        />

        <LFBottomTabNavigation />
      </LFPageWrapper>
    );
  },
  { behavior: "redirect" },
);

export default MyForestScreen;
