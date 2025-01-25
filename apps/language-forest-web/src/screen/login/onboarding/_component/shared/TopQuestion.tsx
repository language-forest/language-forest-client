import { LFIcon, LFText, VStack } from "@/component/design-system";
import styled from "@emotion/styled";
import { LFColor, LFRadius } from "@repo/shared/constant";

type TopQuestionProps = {
  title: string;
  description?: string;
};

export const TopQuestion = ({ title, description }: TopQuestionProps) => {
  return (
    <Container>
      <IconContainer>
        <LFIcon variant={"SooPooRy"} />
      </IconContainer>
      <InnerContainer>
        <LFText variant={"callout"} weight={"B"} color={"ContentMainC"}>
          {title}
        </LFText>
        {description && (
          <LFText variant={"callout"} weight={"R"} color={"ContentMainC"}>
            {description}
          </LFText>
        )}
      </InnerContainer>
    </Container>
  );
};

const Container = styled(VStack)`
  position: relative;
  padding: 0 20px;
  padding-top: 12px;
  padding-bottom: 8px;
`;

const InnerContainer = styled(VStack)`
  padding: 20px;
  gap: 4px;
  background-color: ${LFColor.GrayLight20};
  border-radius: ${LFRadius.corner}px;
`;

const IconContainer = styled(VStack)`
  position: absolute;
  right: 12px;
  top: 0;
  transform: rotate(13deg);
`;
