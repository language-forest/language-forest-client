import {
  CTAPosition,
  HStack,
  LFFillButton,
  LFHeader,
  LFHeaderClose,
  LFHeaderTitle,
  LFIcon,
  LFIconButton,
  LFPageWrapper,
  LFText,
  LFTimer,
  VStack,
} from "@/component/design-system";
import { LFHeaderETC } from "@/component/design-system/Header/LFHeaderETC.tsx";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import {
  createStudyPractice,
  LanguageEnum,
  updateStudyPractice,
  updateStudyPracticeRetry,
  useGetStudy,
} from "@repo/language-forest-api";
import { LFColor } from "@repo/shared/constant";
import { useUserStore } from "@/store/useUserStore.ts";
import { useVoiceRecognize } from "@/util/voiceRecognize";
import { useEffect } from "react";
import { useAsyncEffect } from "@/hook/useAsyncEffect.ts";

const StudyPracticeScreen = () => {
  const { getParamsFromPath, push } = useLFNavigate();

  const user = useUserStore((state) => state.user);
  const { onVoiceStart, voiceText, onVoiceDestroy } = useVoiceRecognize({
    locale: user?.language ?? LanguageEnum.EN,
  });
  const { studyPracticeId, studyId } = getParamsFromPath("study/practice");
  const { data, refetch } = useGetStudy(studyId);

  const targetStudyPractice = data?.studyPractices?.find(
    (item) => item.id === studyPracticeId,
  );

  const handleSubmitPractice = async () => {
    await onVoiceDestroy();
    if (!targetStudyPractice?.myAnswer) {
      await updateStudyPractice(studyId, studyPracticeId, {
        studyPractice: { myAnswer: voiceText },
      });
    } else {
      await updateStudyPracticeRetry(studyId, studyPracticeId, {
        studyPractice: { myAnswer: voiceText },
      });
    }
    await refetch();

    push({
      path: "study/practice/result",
      params: { studyPracticeId, studyId },
    });
  };

  useAsyncEffect(async () => {
    await onVoiceStart();
  }, []);

  const titleInfo = () => {
    const Default = { title: "", description: "" };
    if (!targetStudyPractice) {
      return Default;
    }
    const studyPractices = data?.studyPractices;
    if (!studyPractices || studyPractices.length === 0) {
      return Default;
    }

    switch (targetStudyPractice.problemNumber) {
      case 1:
        return {
          title: "문장 학습",
          description: `첫 번째 문장 (${targetStudyPractice.problemNumber}/${studyPractices.length})`,
        };
      case 2:
        return {
          title: "문장학습",
          description: `두 번째 문장 (${targetStudyPractice.problemNumber}/${studyPractices.length})`,
        };
      case 3:
        return {
          title: "문장 학습",
          description: `세 번째 문장 (${targetStudyPractice.problemNumber}/${studyPractices.length})`,
        };
      case 4:
        return {
          title: "문장학습",
          description: `네 번째 문장 (${targetStudyPractice.problemNumber}/${studyPractices.length})`,
        };
      case 5:
        return {
          title: "문장 학습",
          description: `다섯 번째 문장 (${targetStudyPractice.problemNumber}/${studyPractices.length})`,
        };
      default:
        return Default;
    }
  };

  if (!data) {
    return null;
  }

  return (
    <LFPageWrapper>
      <LFHeader
        left={<LFHeaderClose />}
        center={
          <LFHeaderTitle
            title={titleInfo().title}
            description={titleInfo().description}
          />
        }
        right={<LFHeaderETC onClick={() => {}} />}
      />

      <VStack
        style={{
          margin: "20px",
          borderRadius: 16,
          backgroundColor: LFColor.GrayLight20,
          padding: "20px 40px",
          border: `1px solid ${LFColor.OpacityB30}`,
        }}
        height={"60vh"}
      >
        <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
          <LFText
            variant={"callout"}
            weight={"B"}
            textAlign={"center"}
            color={"ContentSubC"}
          >
            영어로 말해보세요
          </LFText>

          <LFTimer size={60} duration={30} onComplete={handleSubmitPractice} />
        </VStack>

        <VStack flex={2} alignItems={"center"} justifyContent={"center"}>
          <LFText
            variant={"title1"}
            weight={"B"}
            textAlign={"center"}
            color={"ContentSubC"}
          >
            {targetStudyPractice?.problem}
          </LFText>
        </VStack>
        <VStack flex={1} />
      </VStack>

      <CTAPosition>
        <HStack justifyContent={"center"} alignItems={"center"}>
          <VStack justifyContent={"center"} alignItems={"center"} gap={8}>
            {voiceText ? (
              <LFText
                variant={"title2"}
                weight={"B"}
                color={"LFGreen"}
                textAlign={"center"}
              >
                {voiceText}
              </LFText>
            ) : (
              <VStack
                style={{
                  backgroundColor: LFColor.Green10,
                  borderRadius: 16,
                  marginBottom: 20,
                }}
                paddingHorizontal={20}
                paddingVertical={8}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <LFText variant={"subHeadline"} weight={"M"} color={"LFGreen"}>
                  {user?.nickname ?? "유저"}님의 말을 듣고있어요
                </LFText>
              </VStack>
            )}
            <VStack
              style={{
                backgroundColor: LFColor.LFGreen,
                borderRadius: 40,
                width: 80,
                height: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LFIconButton
                icon={{ variant: "check", color: "LightGreen", weight: "B" }}
                onClick={handleSubmitPractice}
              />
            </VStack>
            <LFText variant={"subHeadline"} weight={"R"} color={"ContentSubC"}>
              말하기 완료
            </LFText>
          </VStack>
        </HStack>
      </CTAPosition>
    </LFPageWrapper>
  );
};

export default StudyPracticeScreen;
