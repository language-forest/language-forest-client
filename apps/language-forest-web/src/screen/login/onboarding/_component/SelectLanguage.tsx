import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import {
  CTAPosition,
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFText,
  VStack,
  LFIcon,
  HStack,
} from "@/component/design-system";
import { LFHeaderGoBack } from "@/component/design-system/Header/LFHeaderGoBack.tsx";
import { LFSmallButton } from "@/component/design-system/Button/LFSmallButton.tsx";
import styled from "@emotion/styled";
import { LanguageEnum } from "@repo/language-forest-api";

export const SelectLanguage = () => {
  const onMoveNext = useOnboardingStore((state) => state.onMoveNext);
  const onMovePrev = useOnboardingStore((state) => state.onMovePrev);
  const updateUser = useOnboardingStore((state) => state.updateUser);

  const handleLanguageClick = (language: LanguageEnum) => {
    updateUser({ language });
    onMoveNext();
  };

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />

      <ContentContainer>
        <LFText
          variant={"title3"}
          color={"LFBlack"}
          weight={"B"}
          textAlign={"center"}
        >
          저도 만나서 반가워요!
        </LFText>
        <LFText
          variant={"title3"}
          color={"LFBlack"}
          weight={"B"}
          textAlign={"center"}
        >
          어느 숲에 들어갈까요?
        </LFText>

        <LFSmallButton onClick={() => console.log("cc")}>
          <HStack>
            모국어: 한국어{" "}
            <LFIcon
              color={"ContentSubC"}
              variant={"chevron.right"}
              weight={"M"}
              size={13}
            />
          </HStack>
        </LFSmallButton>
      </ContentContainer>

      <CTAPosition>
        <LFFillButton
          type={"Green"}
          onClick={() => handleLanguageClick(LanguageEnum.EN)}
        >
          영어의 숲
        </LFFillButton>

        <LFFillButton
          type={"LightGreen"}
          onClick={() => handleLanguageClick(LanguageEnum.KO)}
        >
          한국의 숲
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};

const ContentContainer = styled(VStack)`
  justify-content: center;
  align-items: center;
`;
