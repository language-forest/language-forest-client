import {
  HStack,
  LFBottomTabNavigation,
  LFHeader,
  LFHeaderClose,
  LFList,
  LFPageWrapper,
  LFText,
  VStack,
} from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { UserProfile } from "@/component/shared/UserProfile.tsx";
import { overlay } from "overlay-kit";
import { UpdateNicknameBottomSheet } from "@/screen/account/_component/UpdateNicknameBottomSheet.tsx";
import { UpdateYearOfBirthBottomSheet } from "@/screen/account/_component/UpdateYearOfBirthBottomSheet.tsx";
import {
  GenderEnumTransformer,
  MBTIKey,
  MBTITransformer,
} from "@repo/shared/util";
import { UpdateGenderBottomSheet } from "@/screen/account/_component/UpdateGenderBottomSheet.tsx";
import { UpdateOccupationBottomSheet } from "@/screen/account/_component/UpdateOccupationBottomSheet.tsx";
import { UpdatePurposeBottomSheet } from "@/screen/account/_component/UpdatePurposeBottomSheet.tsx";
import { UpdateMBTIBottomSheet } from "@/screen/account/_component/UpdateMBTIBottomSheet.tsx";

const AccountScreen = () => {
  const user = useUserStore((store) => store.user);
  const userInfo = useUserStore((store) => store.userInfo);

  const mbti = (() => {
    if (!userInfo?.mbti) {
      return "";
    }

    const [IE = "", NS = "", FT = "", PJ = ""] = userInfo.mbti.split("");
    return `${MBTITransformer(IE as MBTIKey)}, ${MBTITransformer(NS as MBTIKey)}, ${MBTITransformer(FT as MBTIKey)}, ${MBTITransformer(PJ as MBTIKey)}`;
  })();

  const handleUpdateNicknameClick = () => {
    if (!user) {
      return;
    }
    overlay.open(({ isOpen, close }) => {
      return (
        <UpdateNicknameBottomSheet isOpen={isOpen} close={close} user={user} />
      );
    });
  };

  const handleUpdateBirtOfYearClick = () => {
    if (!userInfo) {
      return;
    }
    overlay.open(({ isOpen, close }) => {
      return (
        <UpdateYearOfBirthBottomSheet
          isOpen={isOpen}
          close={close}
          userInfo={userInfo}
        />
      );
    });
  };

  const handleUpdateGenderClick = () => {
    if (!userInfo) {
      return;
    }
    overlay.open(({ isOpen, close }) => {
      return (
        <UpdateGenderBottomSheet
          isOpen={isOpen}
          close={close}
          userInfo={userInfo}
        />
      );
    });
  };

  const handleUpdateOccupationClick = () => {
    if (!userInfo) {
      return;
    }
    overlay.open(({ isOpen, close }) => {
      return (
        <UpdateOccupationBottomSheet
          isOpen={isOpen}
          close={close}
          userInfo={userInfo}
        />
      );
    });
  };

  const handleUpdatePurposeClick = () => {
    if (!userInfo) {
      return;
    }
    overlay.open(({ isOpen, close }) => {
      return (
        <UpdatePurposeBottomSheet
          isOpen={isOpen}
          close={close}
          userInfo={userInfo}
        />
      );
    });
  };

  const handleUpdateMBTIClick = () => {
    if (!userInfo) {
      return;
    }
    overlay.open(({ isOpen, close }) => {
      return (
        <UpdateMBTIBottomSheet
          isOpen={isOpen}
          close={close}
          userInfo={userInfo}
        />
      );
    });
  };

  return (
    <LFPageWrapper>
      <LFHeader
        left={
          <HStack paddingHorizontal={20}>
            <LFText variant={"title2"} weight={"B"} color={"ContentMainC"}>
              프로필 수정
            </LFText>
          </HStack>
        }
        right={<LFHeaderClose />}
      />

      <UserProfile
        user={user}
        onEditNicknameClick={handleUpdateNicknameClick}
      />

      <VStack paddingHorizontal={20} gap={16} paddingVertical={28}>
        <LFList
          list={[
            {
              title: "태어난 해",
              description: userInfo?.yearOfBirth
                ? `${userInfo?.yearOfBirth}년`
                : undefined,
              onClick: handleUpdateBirtOfYearClick,
            },
            {
              title: "성별",
              description: userInfo?.gender
                ? GenderEnumTransformer(userInfo.gender)
                : undefined,
              onClick: handleUpdateGenderClick,
            },
            {
              title: "직업",
              description: userInfo?.occupation
                ? userInfo.occupation
                : undefined,
              onClick: handleUpdateOccupationClick,
            },

            {
              title: "사용 목적",
              description: userInfo?.purpose ? userInfo.purpose : undefined,
              onClick: handleUpdatePurposeClick,
            },

            {
              title: "성향",
              description: mbti,
              onClick: handleUpdateMBTIClick,
            },
          ]}
        />
      </VStack>

      <LFBottomTabNavigation />
    </LFPageWrapper>
  );
};

export default AccountScreen;
