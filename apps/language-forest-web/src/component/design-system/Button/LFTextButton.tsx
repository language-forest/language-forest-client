import styled from "@emotion/styled";
import { LFText } from "@/component/design-system";
import { ReactNode } from "react";

type LFTextButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const LFTextButton = ({ children, onClick }: LFTextButtonProps) => {
  return (
    <Button onClick={onClick}>
      <LFText variant={"subHeadline"} weight={"M"} color={"ContentSubC"}>
        {children}
      </LFText>
    </Button>
  );
};

const Button = styled.button`
  padding: 9px 8px;
`;
