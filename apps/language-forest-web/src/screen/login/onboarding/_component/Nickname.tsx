import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import {
  CTAPosition,
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFInputField,
  LFText,
  LFIcon,
} from "@/component/design-system";
import { LFHeaderGoBack } from "@/component/design-system/Header/LFHeaderGoBack.tsx";
import { LFSmallButton } from "@/component/design-system/Button/LFSmallButton.tsx";
import {
  MainContentContainer,
  TextContainer,
} from "@/screen/login/onboarding/_component/shared/Layout.tsx";

export const Nickname = () => {
  const onMoveNext = useOnboardingStore((state) => state.onMoveNext);
  const onMovePrev = useOnboardingStore((state) => state.onMovePrev);
  const updateNickname = useOnboardingStore((state) => state.updateUser);
  const nickname =
    (useOnboardingStore((state) => state.user?.nickname) as string) ?? "";

  const handleNicknameChange = (e: string) => {
    updateNickname({ nickname: e });
  };

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={() => onMovePrev()} />} />

      <MainContentContainer>
        <TextContainer>
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
        </TextContainer>

        <LFIcon variant={"SooPooRy"} size={140} />

        <LFSmallButton onClick={() => console.info("cc")}>
          이름 추천 받기
        </LFSmallButton>

        <LFInputField
          maxLength={10}
          value={nickname}
          onInputChange={handleNicknameChange}
        />
      </MainContentContainer>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={() => onMoveNext()}>
          만나서 반가워!
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};
