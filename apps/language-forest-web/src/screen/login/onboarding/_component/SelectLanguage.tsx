import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import {
  CTAPosition,
  LFFillButton,
  LFPageWrapper,
  LFHeader,
  LFText,
  LFIcon,
  HStack,
} from "@/component/design-system";
import { LFHeaderGoBack } from "@/component/design-system/Header/LFHeaderGoBack.tsx";
import { LFSmallButton } from "@/component/design-system/Button/LFSmallButton.tsx";
import { LanguageEnum, LevelEnum, updateUser } from "@repo/language-forest-api";
import {
  MainContentContainer,
  TextContainer,
} from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { languageEnumToText, levelEnumTransformer } from "@repo/shared/util";
import { useUserStore } from "@/store/useUserStore.ts";
import {
  LFMenu,
  LFMenuItem,
  LFMenuItems,
} from "@/component/design-system/Select/LFMenu.tsx";
import { useState } from "react";

export const SelectLanguage = () => {
  const onMoveNext = useOnboardingStore((state) => state.onMoveNext);
  const onMovePrev = useOnboardingStore((state) => state.onMovePrev);
  const updateUserStudyInfo = useOnboardingStore(
    (state) => state.updateUserStudyInfo,
  );
  const { user, reFetch } = useUserStore();
  const [showSetting, setShowSetting] = useState(false);
  const [motherTongue, setMotherTongue] = useState(user?.language);

  const settingItems: LFMenuItems = [
    {
      title: "모국어 선택",
      items: [
        {
          label: languageEnumToText(LanguageEnum.KO),
          value: LanguageEnum.KO,
          key: "language",
        },
        {
          label: languageEnumToText(LanguageEnum.EN),
          value: LanguageEnum.EN,
          key: "language",
        },
      ],
      selectedItem: user?.language
        ? {
            label: languageEnumToText(user.language),
            value: user.language,
            key: "language",
          }
        : undefined,
    },
  ];

  const handleItemChange = (e: LFMenuItem) => {
    if (e.key === "language") {
      setMotherTongue(e.value as LanguageEnum);
    }
  };

  const handleUpdateLanguage = async () => {
    await updateUser({ user: { language: motherTongue } });
    await reFetch();
    setShowSetting((prev) => !prev);
  };

  const MotherTongueLanguage = languageEnumToText(user?.language);

  const handleLanguageClick = (language: LanguageEnum) => {
    updateUserStudyInfo({ language });
    onMoveNext();
  };

  return (
    <LFPageWrapper>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />

      <MainContentContainer>
        <TextContainer>
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
        </TextContainer>

        <LFSmallButton onClick={() => setShowSetting((prev) => !prev)}>
          <HStack
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <LFText variant={"footnote"}>모국어: {MotherTongueLanguage}</LFText>
            <LFIcon
              color={"ContentSubC"}
              variant={"chevron.right"}
              weight={"M"}
              size={12}
            />
          </HStack>
        </LFSmallButton>
        <LFMenu
          show={showSetting}
          title={"모국어 선택"}
          items={settingItems}
          onChange={handleItemChange}
          onClose={handleUpdateLanguage}
          containerStyle={{
            top: 60,
            right: 0,
            width: "120px",
          }}
        />
      </MainContentContainer>

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
    </LFPageWrapper>
  );
};
