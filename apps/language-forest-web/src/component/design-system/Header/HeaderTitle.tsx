import { HStack, LFText } from "@/component/design-system";
import styled from "@emotion/styled";

type HeaderTitleProps = {
  title: string;
  description?: string;
};

export const HeaderTitle = ({ title, description }: HeaderTitleProps) => {
  return (
    <HeaderTitleContainer>
      <LFText variant={"headline"} weight={"B"} color={"LFBlack"}>
        {title}
      </LFText>

      {description && (
        <LFText variant={"subHeadline"} weight={"R"}>
          {description}
        </LFText>
      )}
    </HeaderTitleContainer>
  );
};

const HeaderTitleContainer = styled(HStack)``;
