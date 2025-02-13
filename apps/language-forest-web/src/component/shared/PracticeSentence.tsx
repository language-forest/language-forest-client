import {
  HStack,
  LFChip,
  LFIconButton,
  LFText,
  VStack,
} from "@/component/design-system";
import { BaseStudyPractice } from "@repo/language-forest-api";

type PracticeSentenceProps = {
  practice: BaseStudyPractice;
  onBookmarkClick: () => void;
};

export const PracticeSentence = ({
  practice,
  onBookmarkClick,
}: PracticeSentenceProps) => {
  return (
    <HStack
      style={{ paddingTop: 16, paddingBottom: 20 }}
      justifyContent={"space-between"}
    >
      <VStack gap={16}>
        <VStack gap={4}>
          <LFText variant={"callout"} weight={"B"} color={"ContentMainC"}>
            {practice.problem}
          </LFText>
          <LFText variant={"subHeadline"} weight={"R"} color={"ContentSubC"}>
            {practice.problem}
          </LFText>
        </VStack>

        <HStack gap={8}>
          <LFChip>점수 {practice.score}</LFChip>
          <LFChip>
            씨앗 +
            {practice?.score
              ? practice.score < 50
                ? 0
                : practice.score < 70
                  ? 1
                  : practice.score < 90
                    ? 2
                    : 3
              : 0}
          </LFChip>
        </HStack>
      </VStack>
      <LFIconButton icon={{ variant: "bookmark" }} onClick={onBookmarkClick} />
    </HStack>
  );
};
