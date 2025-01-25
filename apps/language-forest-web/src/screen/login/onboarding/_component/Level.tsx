import {
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  VStack,
  CTAPosition,
  LFSlider,
  LFIcon,
  LFText,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { LevelEnum } from "@repo/language-forest-api";
import styled from "@emotion/styled";
import { LFColor } from "@repo/shared/constant";
import { useState } from "react";

export const Level = () => {
  useDisableScroll();

  const { onMoveNext, onMovePrev, updateUserStudyInfo } = useOnboardingStore();

  const [selectedValue, setSelectedValue] = useState(3);

  const getLevelEnum = (): LevelEnum => {
    switch (true) {
      case selectedValue <= 1:
        return LevelEnum.A;
      case selectedValue === 2:
        return LevelEnum.B;
      case selectedValue === 3:
        return LevelEnum.C;
      case selectedValue === 4:
        return LevelEnum.D;
      case selectedValue >= 5:
        return LevelEnum.E;
      default:
        return LevelEnum.A; // 기본값 처리 (필요 시)
    }
  };

  const getLabelText: Record<LevelEnum, string> = {
    [LevelEnum.A]: "처음 배우는 거라\n아직은 서툴러요",
    [LevelEnum.B]: "단어 몇 개를 사용해서\n이야기할 수 있어요",
    [LevelEnum.C]: "간단한 문장을 만들어\n짧게 표현할 수 있어요",
    [LevelEnum.D]: "완벽한 문장을 만들어\n다양한 표현을 할 수 있어요",
    [LevelEnum.E]: "나에 대한 다양한 이야기를\n상세하게 말할 수 있어요",
  };

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion title={"{0}로 어느정도 말할 수 있으신가요?"} />

      <MainContentContainer>
        <CardContainer>
          <VStack style={{ padding: "32px" }}>
            <LFIcon variant={"SooPooRy"} size={140} />
          </VStack>
          <LFText
            variant={"headline"}
            weight={"B"}
            color={"LFGreen"}
            textAlign={"center"}
          >
            {getLabelText[getLevelEnum()]}
          </LFText>
        </CardContainer>
      </MainContentContainer>

      <VStack
        style={{
          padding: "48px",
        }}
      >
        <LFSlider
          minValue={1}
          maxValue={5}
          initialValue={3}
          onChange={(e) => {
            setSelectedValue(e);
          }}
        />
      </VStack>

      <CTAPosition>
        <LFFillButton
          type={"Green"}
          onClick={() => {
            updateUserStudyInfo({ level: getLevelEnum() });
            onMoveNext();
          }}
        >
          다음
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};

const CardContainer = styled(VStack)`
  background-color: ${LFColor.GrayLight20};
  border: 1px solid ${LFColor.OpacityG80};
  border-radius: 21px;
  width: 300px;
  justify-content: center;
  align-items: center;
  padding: 52px;
  gap: 16px;
`;
