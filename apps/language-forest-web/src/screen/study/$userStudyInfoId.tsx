import {
  CTAPosition,
  LFFillButton,
  LFHugButton,
  LFIcon,
  LFPageWrapper,
  LFText,
  LFToast,
  VStack,
} from "@/component/design-system";
import { StudyHeader } from "@/screen/study/_component/StudyHeader.tsx";
import { useEffect, useState } from "react";
import { useVoiceRecognize } from "@/util/voiceRecognize";
import { useUserStore } from "@/store/useUserStore.ts";
import { createStudySummary, LanguageEnum } from "@repo/language-forest-api";
import { useStudyStore } from "@/screen/study/userStudyStore.ts";
import { useLocation } from "react-router-dom";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";

const QuestionList = [
  "오늘 어떤 하루를 보내셨나요1?",
  "오늘 어떤 하루를 보내셨나요2?",
  "오늘 어떤 하루를 보내셨나요3?",
  "오늘 어떤 하루를 보내셨나요4?",
  "오늘 어떤 하루를 보내셨나요5?",
  "오늘 어떤 하루를 보내셨나요6?",
  "오늘 어떤 하루를 보내셨나요7?",
  "오늘 어떤 하루를 보내셨나요8?",
  "오늘 어떤 하루를 보내셨나요9?",
];

const StudyScreen = () => {
  const userLanguage = useUserStore((state) => state.user?.language);
  const userStudyInfo = useUserStore((state) => state.userStudyInfo);
  const setUserStartVoiceText = useStudyStore(
    (state) => state.updateCreateStudyPartial,
  );
  const generateSummary = useStudyStore((state) => state.generateSummary);
  const { onVoiceStart, voiceText } = useVoiceRecognize({
    locale: userLanguage ?? LanguageEnum.KO,
  });

  const { push } = useLFNavigate();

  const [startRecord, setStartRecord] = useState(false);

  const [question, setQuestion] = useState(
    QuestionList[Math.floor(Math.random() * QuestionList.length)],
  );

  const handleQuestionRandomChange = () => {
    setQuestion(QuestionList[Math.floor(Math.random() * QuestionList.length)]);
  };

  const startVoiceRecognize = async () => {
    setStartRecord(true);
    await onVoiceStart();
  };

  const handleGenerateSummary = async () => {
    const { studyId } = await generateSummary();
    await createStudySummary(studyId);
    push({ path: "study/summary", params: { studyId } });
  };

  useEffect(() => {
    if (!userStudyInfo) {
      LFToast({ text: "학습을 시작할 수 없습니다.", position: "top" });
      return;
    }

    setUserStartVoiceText({
      startQuestion: question,
      inputType: "SPEAKING",
      story: voiceText,
      userStudyInfoId: userStudyInfo.id,
    });
  }, [voiceText]);

  return (
    <LFPageWrapper>
      <StudyHeader />

      <VStack justifyContent={"center"} alignItems={"center"} gap={16}>
        <LFText
          variant={"title2"}
          color={"ContentMainC"}
          textAlign={"center"}
          weight={"B"}
        >
          {question}
        </LFText>

        {!startRecord && (
          <LFHugButton
            prefixIcon={{ variant: "Reload", size: 18, color: "ContentSubC" }}
            type={"LightGreen"}
            border={"Pill"}
            onClick={handleQuestionRandomChange}
          >
            질문
          </LFHugButton>
        )}
        <LFIcon variant={"SooPooRy"} size={180} />

        <LFText
          variant={"title2"}
          color={"ContentMainC"}
          textAlign={"center"}
          weight={"B"}
        >
          {voiceText}
        </LFText>
      </VStack>

      <CTAPosition>
        {startRecord ? (
          <LFFillButton
            prefixIcon={{
              variant: "mic",
              weight: "M",
              color: "LightGreen",
              size: 22,
            }}
            type={"Green"}
            onClick={handleGenerateSummary}
          >
            정리하기
          </LFFillButton>
        ) : (
          <LFFillButton
            prefixIcon={{
              variant: "mic",
              weight: "M",
              color: "LightGreen",
              size: 22,
            }}
            type={"Green"}
            onClick={startVoiceRecognize}
          >
            한국말로 대답하기
          </LFFillButton>
        )}
      </CTAPosition>
    </LFPageWrapper>
  );
};

export default StudyScreen;
