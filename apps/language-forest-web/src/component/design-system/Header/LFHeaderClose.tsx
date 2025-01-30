import { LFIcon } from "@/component/design-system";
import styled from "@emotion/styled";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";

type HeaderCloseProps = {
  onGoBack?: () => void;
};

export const LFHeaderClose = ({ onGoBack }: HeaderCloseProps) => {
  const { back } = useLFNavigate();
  return (
    <HeaderCloseContainer onClick={onGoBack ?? back}>
      <LFIcon color={"ContentMainC"} variant={"xMark"} weight={"B"} />
    </HeaderCloseContainer>
  );
};

const HeaderCloseContainer = styled.button`
  padding: 9px;
`;
