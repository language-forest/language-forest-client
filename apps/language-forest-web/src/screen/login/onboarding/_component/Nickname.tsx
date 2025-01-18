import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import {
  CTAPosition,
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFInputField,
  LFText,
  VStack,
} from "@/component/design-system";
import { LFHeaderGoBack } from "@/component/design-system/Header/LFHeaderGoBack.tsx";
import { LFSmallButton } from "@/component/design-system/Button/LFSmallButton.tsx";
import styled from "@emotion/styled";
import { useState } from "react";

export const Nickname = () => {
  const onMoveNext = useOnboardingStore((state) => state.onMoveNext);
  const onMovePrev = useOnboardingStore((state) => state.onMovePrev);
  const updateNickname = useOnboardingStore((state) => state.updateNickname);
  const [nickname, setNickname] = useState("");

  const handleNicknameChange = (e: string) => {
    setNickname(e);
    updateNickname(e);
  };

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={() => onMovePrev()} />} />

      <ContentContainer>
        <LFText
          variant={"title3"}
          color={"LFBlack"}
          weight={"B"}
          textAlign={"center"}
        >
          제가 앞으로 뭐라고
        </LFText>
        <LFText
          variant={"title3"}
          color={"LFBlack"}
          weight={"B"}
          textAlign={"center"}
        >
          불러드리면 될까요?
        </LFText>

        <LFSmallButton onClick={() => console.log("cc")}>
          이름 추천 받기
        </LFSmallButton>

        <LFInputField
          maxLength={10}
          value={nickname}
          onInputChange={handleNicknameChange}
        />
      </ContentContainer>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={() => onMoveNext()}>
          만나서 반가워!
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};

const ContentContainer = styled(VStack)`
  justify-content: center;
  align-items: center;
`;
