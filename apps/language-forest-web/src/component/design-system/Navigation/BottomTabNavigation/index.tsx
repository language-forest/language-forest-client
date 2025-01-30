import { HStack } from "../../Layout";
import styled from "@emotion/styled";
import {
  LFIcon,
  LFIconNonWeightedVariant,
  LFText,
} from "@/component/design-system";
import { useLocation } from "react-router-dom";
import { LFColor, LFColorKey } from "@repo/shared/constant";
import { pathInfo, PathKey } from "@/util/navigate/useLFNavigate.ts";

const height = "67px";

type BottomTabType = {
  iconKey: LFIconNonWeightedVariant;
  text: string;
  path: PathKey;
};

const BottomTabList: Array<BottomTabType> = [
  {
    iconKey: "bottomNav.home",
    text: "홈",
    path: "home",
  },
  {
    iconKey: "bottomNav.book",
    text: "다이어리",
    path: "diary",
  },
  {
    iconKey: "bottomNav.star",
    text: "나의 숲",
    path: "myForest",
  },
] as const;

export const LFBottomTabNavigation = () => {
  const { pathname } = useLocation();
  const getColor = (href: BottomTabType["path"]): LFColorKey => {
    const isSelected = pathInfo[href].path === pathname;
    return isSelected ? "LFGreen" : "OpacityB30";
  };

  return (
    <HStack style={{ height }}>
      <BottomTabContainer>
        {BottomTabList.map((bottomTab) => {
          return (
            <BottomTabItem
              key={bottomTab.text}
              href={pathInfo[bottomTab.path].path}
            >
              <LFIcon
                color={getColor(bottomTab.path)}
                variant={bottomTab.iconKey}
                size={26}
              />
              <LFText
                variant={"caption2"}
                weight={"B"}
                color={getColor(bottomTab.path)}
              >
                {bottomTab.text}
              </LFText>
            </BottomTabItem>
          );
        })}
      </BottomTabContainer>
    </HStack>
  );
};

const BottomTabContainer = styled(HStack)`
  background-color: ${LFColor.GrayLight10};
  max-width: 480px;
  height: ${height};
  position: fixed;

  bottom: 0;
  flex: ${BottomTabList.length};
  width: 100%;
  border-top: 1px solid ${LFColor.OpacityB18};
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
