import styled from "@emotion/styled";
import { HStack, LFIcon } from "@/component/design-system";

export const LFHeaderNotification = () => {
  return (
    <HeaderNotificationContainer>
      <LFIcon variant={"topNav.bell"} size={30} color={"ContentSubC"} />
    </HeaderNotificationContainer>
  );
};

const HeaderNotificationContainer = styled(HStack)`
  padding: 7px;
`;
