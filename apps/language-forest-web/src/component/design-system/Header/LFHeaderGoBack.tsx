import { LFIcon } from "@/component/design-system";
import styled from "@emotion/styled";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";

type HeaderGoBackProps = {
  onGoBack?: () => void;
};

export const LFHeaderGoBack = ({ onGoBack }: HeaderGoBackProps) => {
  const { back } = useLFNavigate();
  return (
    <HeaderGoBackContainer onClick={onGoBack ?? back}>
      <LFIcon color={"Black"} variant={"chevron.left"} weight={"R"} />
    </HeaderGoBackContainer>
  );
};

const HeaderGoBackContainer = styled.button``;
