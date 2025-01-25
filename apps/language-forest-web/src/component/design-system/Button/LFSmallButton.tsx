import { ReactNode } from "react";
import { LFColor } from "@repo/shared/constant";
import styled from "@emotion/styled";
import { HStack, LFText } from "@/component/design-system";

type SmallButtonProps = {
  children: ReactNode;
  selected?: boolean;
  onClick: () => Promise<void> | void;
};

export const LFSmallButton = ({
  children,
  selected = false,
  onClick,
}: SmallButtonProps) => {
  const handleClick = async () => {
    try {
      await onClick();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RawSmallButtonContainer>
      <RawSmallButton selected={selected} onClick={handleClick}>
        <LFText variant={"footnote"} weight={"M"}>
          {children}
        </LFText>
      </RawSmallButton>
    </RawSmallButtonContainer>
  );
};

const RawSmallButtonContainer = styled(HStack)`
  border-radius: 33px;
`;

const RawSmallButton = styled.button<{ selected: boolean }>`
  box-sizing: border-box;
  background-color: ${(props) =>
    props.selected ? LFColor.Green10 : LFColor.GrayLight30};
  border-radius: 33px;
  border: 1px solid
    ${(props) => (props.selected ? LFColor.LFGreen : "transparent")};
  padding: 6px 12px;
`;
