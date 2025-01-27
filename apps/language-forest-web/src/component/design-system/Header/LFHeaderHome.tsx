import styled from "@emotion/styled";
import {
  HStack,
  LFChip,
  LFIcon,
  LFTooltip,
  VStack,
} from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { useState } from "react";
import { BaseUserPoint, BaseUserStudyInfo } from "@repo/language-forest-api";

export const LFHeaderHome = () => {
  const getUser = useUserStore((store) => store.getUser);
  const { userPoint, userStudyInfo } = getUser();
  const { push } = useLFNavigate();

  return (
    <HeaderHomeContainer>
      <LFIcon
        size={44}
        variant={"Shop"}
        color={"ContentSubC"}
        onClick={() => {
          push({ path: "shop" });
        }}
      />

      <SeedHeader userPoint={userPoint} />

      <StreakDaysHeader userStudyInfo={userStudyInfo} />
    </HeaderHomeContainer>
  );
};

const SeedHeader = (props: { userPoint: BaseUserPoint | null }) => {
  const { userPoint } = props;
  const [showPointAmount, setShowPointAmount] = useState(false);

  if (!userPoint) {
    return null;
  }

  return (
    <VStack
      style={{ position: "relative", alignSelf: "center" }}
      onClick={() => setShowPointAmount((prev) => !prev)}
    >
      <LFChip
        prefixIcon={{ color: "ContentMainC", variant: "Seed" }}
        onClick={() => {}}
      >
        {userPoint.amount}
      </LFChip>

      <Tooltip show={showPointAmount}>
        <LFTooltip
          label={"오늘의 표현을 학습하고\n씨앗을 얻어보세요!"}
          position={"top"}
        />
      </Tooltip>
    </VStack>
  );
};

const StreakDaysHeader = (props: {
  userStudyInfo: BaseUserStudyInfo | null;
}) => {
  const { userStudyInfo } = props;
  const [showStreakDays, setShowStreakDays] = useState(false);

  if (!userStudyInfo) {
    return null;
  }

  return (
    <VStack
      style={{ position: "relative", alignSelf: "center" }}
      onClick={() => setShowStreakDays((prev) => !prev)}
    >
      <LFChip onClick={() => {}}>D+{userStudyInfo.streakDays}</LFChip>

      <Tooltip show={showStreakDays}>
        <LFTooltip
          label={"오늘의 표현을 학습하고\n씨앗을 얻어보세요!"}
          position={"top"}
        />
      </Tooltip>
    </VStack>
  );
};

const Tooltip = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <TooltipContainer className={show ? "show" : "hide"}>
      {children}
    </TooltipContainer>
  );
};

const HeaderHomeContainer = styled(HStack)`
  padding: 9px;
  gap: 8px;
`;

const TooltipContainer = styled.div`
  width: 240px;
  position: absolute;
  top: 50%; /* 부모의 아래쪽 */
  left: 50%; /* 수평 중앙 */
  transform: translateX(-50%);
  z-index: 10;
  padding: 12px;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;

  &.show {
    opacity: 1;
    transform: translate(-50%, 0);
    pointer-events: auto;
  }

  &.hide {
    opacity: 0;
    transform: translate(-50%, -10px);
    pointer-events: none;
  }
`;
