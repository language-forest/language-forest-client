import { HStack } from "../../Layout";
import styled from "@emotion/styled";
import {
  LFIcon,
  LFIconNonWeightedVariant,
  LFText,
} from "@/component/design-system";
import { useLocation } from "react-router-dom";
import { LFColorKey } from "@repo/shared/constant";

type BottomTabType = {
  iconKey: LFIconNonWeightedVariant;
  text: string;
  pathNames: Array<string>;
  href: string;
};

const BottomTabList: Array<BottomTabType> = [
  {
    iconKey: "bottomNav.home",
    text: "홈",
    pathNames: ["/", "/home"],
    href: "/",
  },
  {
    iconKey: "bottomNav.book",
    text: "다이어리",
    pathNames: ["/diary"],
    href: "/diary",
  },
  {
    iconKey: "bottomNav.star",
    text: "나의 숲",
    pathNames: ["/forest"],
    href: "/forest",
  },
  {
    iconKey: "bottomNav.star",
    text: "보이스 테스트",
    pathNames: ["/voice"],
    href: "/voice",
  },
] as const;

export const LFBottomTabNavigation = () => {
  const { pathname } = useLocation();
  const getColor = (pathNames: BottomTabType["pathNames"]): LFColorKey => {
    const isSelected = pathNames.includes(pathname);
    return isSelected ? "LFGreen" : "OpacityB30";
  };

  return (
    <HStack>
      <BottomTabContainer>
        {BottomTabList.map((bottomTab) => {
          return (
            <BottomTabItem key={bottomTab.text} href={bottomTab.href}>
              <LFIcon
                color={getColor(bottomTab.pathNames)}
                variant={bottomTab.iconKey}
                size={26}
              />
              <LFText
                variant={"caption2"}
                weight={"B"}
                color={getColor(bottomTab.pathNames)}
              >
                {bottomTab.text}
              </LFText>
            </BottomTabItem>
          );
        })}
      </BottomTabContainer>
      <BottomTabSpacer />
    </HStack>
  );
};

const height = "67px";

const BottomTabContainer = styled(HStack)`
  max-width: 480px;
  height: ${height};
  position: fixed;

  bottom: 0;
  flex: ${BottomTabList.length};
  width: 100%;
`;

const BottomTabItem = styled.a`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4px;
`;

const BottomTabSpacer = styled(HStack)`
  height: ${height};
`;
