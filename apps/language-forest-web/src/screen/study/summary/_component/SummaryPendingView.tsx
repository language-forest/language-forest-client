import {
  CTAPosition,
  LFText,
  LFTooltip,
  VStack,
} from "@/component/design-system";

export const SummaryPendingView = () => {
  return (
    <VStack>
      <LFText
        variant={"title2"}
        color={"ContentMainC"}
        textAlign={"center"}
        weight={"B"}
      >
        수푸리가 오늘 이야기를
        <br />
        정리하고 있어요
      </LFText>

      <LFTooltip label={"꺠알 영어 상식 공유드립니다."} position={"bottom"} />

      <CTAPosition>
        <LFText
          variant={"body"}
          textAlign={"center"}
          weight={"M"}
          color={"RawGray80"}
        >
          수푸리가 알려주는 꺠알 영어 상식
        </LFText>
      </CTAPosition>
    </VStack>
  );
};
