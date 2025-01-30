import { LFIcon } from "@/component/design-system";
import styled from "@emotion/styled";

type HeaderETCProps = {
  onClick: () => void;
};

export const LFHeaderETC = ({ onClick }: HeaderETCProps) => {
  return (
    <HeaderETCContainer onClick={onClick}>
      <LFIcon color={"Black"} variant={"ellipsis"} weight={"R"} />
    </HeaderETCContainer>
  );
};

const HeaderETCContainer = styled.button`
  padding: 10px;
`;
