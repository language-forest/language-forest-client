import {
  HStack,
  LFHugButton,
  LFIcon,
  LFIconButton,
  LFText,
  VStack,
} from "@/component/design-system";
import { BaseUser } from "@repo/language-forest-api";
import styled from "@emotion/styled";
import { LFImage } from "@/component/design-system/Image/LFImage.tsx";
import { LFColor } from "@repo/shared/constant";
import React from "react";

type UserProfileAProps = {
  user: BaseUser | null;
  onEditProfileClick?: () => void;
  onEditNicknameClick?: () => void;
};

export const UserProfile = ({
  user,
  onEditProfileClick,
  onEditNicknameClick,
}: UserProfileAProps) => {
  if (!user) {
    return null;
  }

  return (
    <ProfileContainer>
      {user.profileImage ? (
        <LFImage
          src={user.profileImage}
          alt={user.nickname}
          width={72}
          height={72}
          borderRadius={36}
        />
      ) : (
        <ProfileImageContainer>
          <LFText variant={"title1"} weight={"B"} color={"ContentMainC"}>
            {user.nickname[0]}
          </LFText>
        </ProfileImageContainer>
      )}

      <NicknameContainer onClick={onEditNicknameClick}>
        <LFText variant={"title3"} weight={"B"} color={"ContentMainC"}>
          {user.nickname}
        </LFText>
        {onEditNicknameClick && (
          <LFIcon
            variant={"chevron.right"}
            color={"ContentMainC"}
            weight={"M"}
            size={20}
          />
        )}
      </NicknameContainer>

      {onEditProfileClick && (
        <LFHugButton
          type={"White"}
          border={"Pill"}
          onClick={onEditProfileClick}
        >
          프로필 수정
        </LFHugButton>
      )}
    </ProfileContainer>
  );
};

const ProfileImageContainer = styled(VStack)`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  justify-content: center;
  align-items: center;
  background-color: ${LFColor.GrayLight50};
`;

const ProfileContainer = styled(VStack)`
  justify-content: center;
  align-items: center;
  gap: 16px;
  //
  //
  //
`;

const NicknameContainer = styled(HStack)`
  justify-content: center;
  align-items: center;
  gap: 4px;
  //
  //
  //
`;
