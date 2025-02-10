import {
  CTAPosition,
  HStack,
  LFFillButton,
  LFHeader,
  LFIcon,
  LFPageWrapper,
  LFText,
  VStack,
} from "@/component/design-system";
import { LFHeaderETC } from "@/component/design-system/Header/LFHeaderETC.tsx";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { completeStudyPractice, useGetStudy } from "@repo/language-forest-api";
import { LFColor } from "@repo/shared/constant";
import { useUserStore } from "@/store/useUserStore.ts";

const StudyPracticeResultScreen = () => {
  const { getParamsFromPath, back, push } = useLFNavigate();

  const { studyPracticeId, studyId } = getParamsFromPath(
    "study/practice/result",
  );
  const { data } = useGetStudy(studyId);
  const refetchUser = useUserStore((state) => state.reFetch);

  const targetStudyPractice = data?.studyPractices?.find(
    (item) => item.id === studyPracticeId,
  );

  const seeds = () => {
    const getIsActive = (targetScore: number) => {
      if (!targetStudyPractice?.score) {
        return false;
      }
      return targetStudyPractice.score >= targetScore;
    };

    return [
      {
        score: 50,
        isActive: getIsActive(50),
      },
      {
        score: 70,
        isActive: getIsActive(70),
      },
      {
        score: 90,
        isActive: getIsActive(90),
      },
    ];
  };

  const getTexts = () => {
    const score = targetStudyPractice?.score;
    const problemNumber = targetStudyPractice?.problemNumber;
    const DEFAULT = { title: "", goNextText: "", retryText: "" };
    if (score === undefined) {
      return DEFAULT;
    }
    if (!problemNumber) {
      return DEFAULT;
    }
    const retryText = () => {
      if (score < 50) {
        return `${score}점 넘기고 씨앗 3개 더 받기`;
      } else if (score < 70) {
        return `${score}점 넘기고 씨앗 2개 더 받기`;
      } else if (score < 90) {
        return `${score}점 넘기고 씨앗 2개 더 받기`;
      }
      return null;
    };

    const geNextText = () => {
      if (data?.studyPractices?.length === targetStudyPractice.problemNumber) {
        return "학습 완료";
      }

      switch (problemNumber) {
        case 1:
          return "두 번쨰 문장 학습";
        case 2:
          return "세 번째 문장 학습";
        case 3:
          return "네 번째 문장 학습";
        case 4:
          return "다섯 번쨰 문장 학습";
        default:
          return "학습 완료";
      }
    };

    switch (targetStudyPractice.problemNumber) {
      case 1:
        return {
          title: "오늘의 첫 번째 문장",
          goNextText: geNextText(),
          retryText: retryText(),
        };
      case 2:
        return {
          title: "오늘의 두 번째 문장",
          goNextText: geNextText(),
          retryText: retryText(),
        };
      case 3:
        return {
          title: "오늘의 세 번째 문장",
          goNextText: geNextText(),
          retryText: retryText(),
        };
      case 4:
        return {
          title: "오늘의 네 번째 문장",
          goNextText: geNextText(),
          retryText: retryText(),
        };
      case 5:
        return {
          title: "오늘의 다섯 번째 문장",
          goNextText: geNextText(),
          retryText: retryText(),
        };
      default:
        return DEFAULT;
    }
  };

  const handleComplete = async () => {
    await completeStudyPractice(studyId);
    await refetchUser();
    push({ path: "study/result", params: { studyId } });
  };

  const handleGoNextPractice = async () => {
    const isLast =
      targetStudyPractice?.problemNumber ===
      (data?.studyPractices ?? []).length;

    if (isLast) {
      await handleComplete();
    } else {
      const currentStudyPracticeId = targetStudyPractice?.problemNumber ?? 1;
      const nextStudyPractice =
        data?.studyPractices?.find(
          (practice) => practice.problemNumber === currentStudyPracticeId + 1,
        ) ??
        data?.studyPractices?.find(
          (practice) => practice.problemNumber === data.studyPractices?.length,
        ) ??
        data?.studyPractices?.[0];

      if (!nextStudyPractice) {
        await handleComplete();
        return;
      }

      push({
        path: "study/practice",
        params: { studyId, studyPracticeId: nextStudyPractice?.id ?? "" },
      });
    }
  };

  const handleRetryPractice = () => {
    back();
  };

  if (!data) {
    return null;
  }

  return (
    <LFPageWrapper>
      <LFHeader
        left={
          <VStack paddingHorizontal={20}>
            <LFText variant={"title2"} weight={"B"} color={"ContentMainC"}>
              학습 결과
            </LFText>
          </VStack>
        }
        right={
          <VStack onClick={handleComplete}>
            <LFText variant={"callout"} weight={"M"} color={"ContentMainC"}>
              그만하기
            </LFText>
          </VStack>
        }
      />

      <VStack gap={20}>
        <LFText
          variant={"title1"}
          weight={"B"}
          color={"LFGreen"}
          textAlign={"center"}
        >
          {targetStudyPractice?.score}
        </LFText>

        <HStack justifyContent={"center"} alignItems={"center"}>
          {seeds().map((seed) => (
            <VStack justifyContent={"center"} alignItems={"center"}>
              <VStack style={{ opacity: seed.isActive ? 1 : 0.5 }}>
                <LFIcon
                  size={30}
                  variant={
                    seed.isActive ? "ResultSeedInActive" : "ResultSeedActive"
                  }
                />
              </VStack>

              <LFText
                variant={"headline"}
                textAlign={"center"}
                color={seed.isActive ? "LFGreen" : "OpacityG60"}
                weight={"B"}
              >
                {seed.score}
              </LFText>
            </VStack>
          ))}
        </HStack>
      </VStack>

      <VStack paddingVertical={20} paddingHorizontal={20}>
        <VStack paddingVertical={20} paddingHorizontal={20}>
          <LFText variant={"footnote"} weight={"B"} color={"ContentSubC"}>
            {getTexts().title}
          </LFText>

          <LFText variant={"callout"} weight={"M"} color={"ContentMainC"}>
            {targetStudyPractice?.problem ?? ""}
          </LFText>
        </VStack>
      </VStack>

      <VStack paddingHorizontal={20} gap={20}>
        <VStack
          paddingHorizontal={20}
          style={{ backgroundColor: LFColor.GrayLight20 }}
          gap={12}
        >
          <LFText variant={"footnote"} weight={"B"} color={"ContentMainC"}>
            나의 표현
          </LFText>

          <VStack
            paddingVertical={20}
            paddingHorizontal={20}
            style={{ backgroundColor: LFColor.Green10, borderRadius: 16 }}
          >
            <LFText variant={"callout"} weight={"M"} color={"ContentMainC"}>
              {targetStudyPractice?.myAnswer ?? ""}
            </LFText>
          </VStack>
        </VStack>

        <VStack
          paddingHorizontal={20}
          style={{ backgroundColor: LFColor.GrayLight20 }}
          gap={12}
        >
          <LFText variant={"footnote"} weight={"B"} color={"ContentMainC"}>
            나의 표현
          </LFText>

          <VStack
            paddingVertical={20}
            paddingHorizontal={20}
            style={{ backgroundColor: LFColor.Green10, borderRadius: 16 }}
          >
            <LFText variant={"callout"} weight={"M"} color={"ContentMainC"}>
              {targetStudyPractice?.correctAnswer ?? ""}
            </LFText>
          </VStack>
        </VStack>

        <VStack
          paddingHorizontal={20}
          style={{ backgroundColor: LFColor.GrayLight20 }}
          gap={12}
        >
          <LFText variant={"footnote"} weight={"B"} color={"ContentMainC"}>
            Tips
          </LFText>

          <LFText variant={"body"} weight={"R"} color={"ContentSubC"}>
            {targetStudyPractice?.tip ?? ""}
          </LFText>
        </VStack>
      </VStack>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={handleGoNextPractice}>
          {getTexts().goNextText}
        </LFFillButton>

        {getTexts().retryText ? (
          <LFFillButton type={"LightGreen"} onClick={handleRetryPractice}>
            {getTexts().retryText}
          </LFFillButton>
        ) : null}
      </CTAPosition>
    </LFPageWrapper>
  );
};

export default StudyPracticeResultScreen;
