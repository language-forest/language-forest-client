import {
  CTAPosition,
  LFFillButton,
  LFHeader,
  LFHeaderClose,
  LFHeaderTitle,
  LFIcon,
  LFPageWrapper,
  LFText,
  VStack,
} from "@/component/design-system";
import { LFHeaderETC } from "@/component/design-system/Header/LFHeaderETC.tsx";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { useGetStudy } from "@repo/language-forest-api";
import { LFColor } from "@repo/shared/constant";

const StudyScreen = () => {
  const { getParamsFromPath } = useLFNavigate();

  const { studyId } = getParamsFromPath("study/summary");
  const { data } = useGetStudy(studyId);


  const handleStartPractice = () => {}

  if (!data) {
    return null;
  }

  return (
    <LFPageWrapper>
      <LFHeader
        left={<LFHeaderClose />}
        right={<LFHeaderETC onClick={() => {}} />}
      />

      <LFText
        variant={"title2"}
        textAlign={"center"}
        weight={"B"}
        color={"ContentMainC"}
      >
        {data.studySummary?.summary}
      </LFText>

      <LFText
        variant={"subHeadline"}
        textAlign={"center"}
        weight={"M"}
        color={"ContentSubC"}
      >
        오늘의 주요 키워드 하나를
        <br />
        선택해보세요
      </LFText>

      <CTAPosition>
        <VStack
          style={{
            backgroundColor: LFColor.GrayLight20,
            padding: 20,
            borderRadius: 16,
            position: "relative",
          }}
        >
          <VStack
            style={{
              position: "absolute",
              right: 0,
              top: -80,
              transform: "rotate(10deg)",
            }}
          >
            <LFIcon variant={"SooPooRy"} size={100} />
          </VStack>
          <LFText
            variant={"callout"}
            weight={"R"}
            textAlign={"center"}
            color={"ContentMainC"}
          >
            {data.studySummary?.message}
          </LFText>
        </VStack>
        <LFText
          variant={"footnote"}
          color={"OpacityB80"}
          textAlign={"center"}
          weight={"R"}
        >
          오늘 있었던 일을 영어로 말해볼까요?
        </LFText>

        <LFFillButton type={"Green"} onClick={() => console.log("start study")}>
          학습 시작하기
        </LFFillButton>

        <LFFillButton
          type={"LightGreen"}
          onClick={() => console.log("start study")}
        >
          다시 기록하기
        </LFFillButton>
      </CTAPosition>
    </LFPageWrapper>
  );
};

export default StudyScreen;
