import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { useGetStudy } from "../../../../../../packages/language-forest-api";
import {
  CTAPosition,
  HStack,
  LFChip,
  LFFillButton,
  LFHeader,
  LFIcon,
  LFIconButton,
  LFIconProps,
  LFPageWrapper,
  LFText,
  VStack,
} from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { LFColorKey } from "@repo/shared/constant";
import { PracticeSentence } from "@/component/shared";

const StudyResultScreen = () => {
  const { getParamsFromPath, push } = useLFNavigate();

  const { studyId } = getParamsFromPath("study/result");
  const userStudyInfo = useUserStore((state) => state.userStudyInfo);

  const { data } = useGetStudy(studyId);
  const getSummary = () => {
    return [
      {
        text: "평균 점수",
        textColor: "LFWhite",
        icon: { variant: "ResultScore", size: 52 },
        score: data?.study?.averageScore ?? 0,
      },
      {
        text: "모은 씨앗",
        textColor: "LFWhite",
        icon: { variant: "ResultSeed", size: 52 },
        score: data?.study?.point ?? 0,
      },
      {
        text: "연속 학습",
        textColor: "LFGreen",
        icon: { variant: "ResultStreakDays", size: 52 },
        score: `${userStudyInfo?.streakDays ?? 0}d`,
      },
    ];
  };

  return (
    <LFPageWrapper>
      <LFHeader />

      <VStack gap={40}>
        <LFText
          variant={"title1"}
          color={"ContentMainC"}
          textAlign={"center"}
          weight={"B"}
        >
          학습 완료!
        </LFText>

        <HStack justifyContent={"center"} alignItems={"center"} gap={20}>
          {getSummary().map((summary) => (
            <VStack gap={8}>
              <VStack position={"relative"}>
                <LFIcon {...(summary.icon as LFIconProps)} />
                <VStack
                  position={"absolute"}
                  style={{
                    top: "52%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <LFText
                    variant={"footnote"}
                    weight={"B"}
                    color={summary.textColor as LFColorKey}
                    whiteSpace={"nowrap"}
                  >
                    {summary.score}
                  </LFText>
                </VStack>
              </VStack>
              <LFText variant={"footnote"} weight={"B"} color={"ContentMainC"}>
                {summary.text}
              </LFText>
            </VStack>
          ))}
        </HStack>

        <VStack paddingHorizontal={20} paddingVertical={20}>
          <VStack
            paddingVertical={20}
            paddingHorizontal={20}
            backgroundColor={"LFWhite"}
            borderRadius={16}
            gap={28}
          >
            <LFText variant={"footnote"} weight={"B"} color={"ContentMainC"}>
              오늘의 표현
            </LFText>

            <VStack gap={2} backgroundColor="GrayLight20">
              {(data?.studyPractices ?? []).map((practice) => {
                return (
                  <PracticeSentence
                    practice={practice}
                    onBookmarkClick={() => console.log("book")}
                    key={practice.id}
                  />
                );
              })}
            </VStack>
          </VStack>
        </VStack>
      </VStack>

      <CTAPosition>
        <LFFillButton
          type={"Green"}
          onClick={() => {
            push({ path: "home" });
          }}
        >
          학습 완료
        </LFFillButton>
      </CTAPosition>
    </LFPageWrapper>
  );
};

export default StudyResultScreen;
