import { ReactNode } from "react";
import { LFColor } from "@repo/shared/constant";
import styled from "@emotion/styled";
import { HStack, LFText } from "@/component/design-system";

type SmallButtonProps = {
  children: ReactNode;
  onClick: () => Promise<void> | void;
};

export const LFSmallButton = ({ children, onClick }: SmallButtonProps) => {
  const handleClick = async () => {
    try {
      await onClick();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RawSmallButtonContainer>
      <RawSmallButton onClick={handleClick}>
        <LFText variant={"footnote"} weight={"M"}>
          {children}
        </LFText>
      </RawSmallButton>
    </RawSmallButtonContainer>
  );
};

const RawSmallButtonContainer = styled(HStack)`
  padding: 4px 10px;
  border-radius: 33px;
`;

const RawSmallButton = styled.button`
  background-color: ${LFColor.GrayLight30};
  border-radius: 33px;
  padding: 4px 10px;
`;
