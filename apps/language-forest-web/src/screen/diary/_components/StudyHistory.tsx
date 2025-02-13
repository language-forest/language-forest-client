import { useGetStudy } from "@repo/language-forest-api";
import { HStack, LFChip, LFText, VStack } from "@/component/design-system";
import { format } from "date-fns";
import { PracticeSentence } from "@/component/shared";

type StudyHistoryProps = {
  studyId: string;
  studyDate: Date;
};

export const StudyHistory = ({ studyId, studyDate }: StudyHistoryProps) => {
  const { data } = useGetStudy(studyId);
  console.log(data);

  if (!data) {
    return null;
  }

  return (
    <VStack paddingVertical={20} paddingHorizontal={20} gap={20}>
      <LFText>{format(studyDate, "yyyy. MM. dd (E)")}</LFText>

      <HStack>
        {data.studySummary?.tags.map((item) => (
          <LFChip selected={item === data.studySummary?.selectedTag} key={item}>
            {item}
          </LFChip>
        ))}
      </HStack>

      <VStack gap={20}>
        <LFText variant={"title3"} color={"ContentSubC"} weight={"B"}>
          {data.studySummary?.summary}
        </LFText>
        <LFText variant={"callout"} weight={"R"} color={"ContentMainC"}>
          {data.studySummary?.message}
        </LFText>
      </VStack>

      <VStack gap={2}>
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
  );
};
