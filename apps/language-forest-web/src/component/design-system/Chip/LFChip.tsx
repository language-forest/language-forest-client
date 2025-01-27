import { ReactNode } from "react";
import { LFColor } from "@repo/shared/constant";
import styled from "@emotion/styled";
import { HStack, LFIcon, LFIconProps, LFText } from "@/component/design-system";

type LFChipProps = {
  prefixIcon?: LFIconProps;
  children: ReactNode;
  selected?: boolean;
  onClick: () => Promise<void> | void;
  suffixIcon?: LFIconProps;
};

export const LFChip = ({
  children,
  selected = false,
  onClick,
  prefixIcon,
  suffixIcon,
}: LFChipProps) => {
  const handleClick = async () => {
    try {
      await onClick();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RawLFChipContainer>
      <RawLFChip selected={selected} onClick={handleClick}>
        {prefixIcon && <LFIcon {...prefixIcon} />}
        <LFText
          variant={"callout"}
          color={"ContentMainC"}
          weight={"B"}
          textAlign={"center"}
        >
          {children}
        </LFText>
        {suffixIcon && <LFIcon {...suffixIcon} />}
      </RawLFChip>
    </RawLFChipContainer>
  );
};

const RawLFChipContainer = styled(HStack)`
  border-radius: 33px;
`;

const RawLFChip = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  align-items: center;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.selected ? LFColor.Green10 : LFColor.GrayLight30};
  border-radius: 33px;
  border: 1px solid
    ${(props) => (props.selected ? LFColor.LFGreen : "transparent")};
  padding: 6px 12px;
`;
