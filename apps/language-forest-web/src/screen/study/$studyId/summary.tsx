import {
  CTAPosition,
  HStack,
  LFChip,
  LFFillButton,
  LFHeader,
  LFHeaderClose,
  LFIcon,
  LFPageWrapper,
  LFText,
  LFToast,
  VStack,
} from "@/component/design-system";
import { LFHeaderETC } from "@/component/design-system/Header/LFHeaderETC.tsx";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import {
  createStudyPractice,
  useGetStudy,
} from "../../../../../../packages/language-forest-api";
import { LFColor } from "@repo/shared/constant";
import { useEffect, useState } from "react";

const StudyScreen = () => {
  const { getParamsFromPath, push, back } = useLFNavigate();

  const { studyId } = getParamsFromPath("study/summary");
  const { data } = useGetStudy(studyId);

  const tags = data?.studySummary?.tags ?? [];
  const [selectedTag, setSelectedTag] = useState(tags[0]);

  const handleStartPractice = async () => {
    if (!data?.studySummary?.id) {
      LFToast({ text: "학습을 시작할 수 없습니다.", position: "top" });

      return;
    }
    const { studyPractices } = await createStudyPractice(studyId, {
      studySummaryId: data.studySummary.id,
      selectedTag,
    });

    const studyPracticeId = studyPractices?.find(
      (item) => item.problemNumber === 1,
    )?.studyPracticeId;

    if (!studyPracticeId) {
      LFToast({ text: "학습을 시작할 수 없습니다.", position: "top" });

      return;
    }

    push({
      path: "study/practice",
      params: { studyPracticeId, studyId },
    });
  };

  useEffect(() => {
    if (tags.length === 0) {
      return;
    }

    setSelectedTag(tags[0]);
  }, [tags]);

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

      <HStack justifyContent={"center"} alignItems={"center"} gap={12}>
        {tags.map((item) => (
          <LFChip
            selected={item === selectedTag}
            key={item}
            onClick={() => setSelectedTag(item)}
          >
            {item}
          </LFChip>
        ))}
      </HStack>

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

        <LFFillButton type={"Green"} onClick={handleStartPractice}>
          학습 시작하기
        </LFFillButton>

        <LFFillButton type={"LightGreen"} onClick={back}>
          다시 기록하기
        </LFFillButton>
      </CTAPosition>
    </LFPageWrapper>
  );
};

export default StudyScreen;
