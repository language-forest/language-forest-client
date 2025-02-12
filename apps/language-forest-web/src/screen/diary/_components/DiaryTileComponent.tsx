import { MonthlyStudyResponseStudiesItem } from "@repo/language-forest-api";
import { memo } from "react";
import { LFChip, LFIcon, LFText, VStack } from "@/component/design-system";
import { TileArgs } from "react-calendar";
import styled from "@emotion/styled";

type DiaryTileComponentProps = {
  studyItem?: MonthlyStudyResponseStudiesItem;
  tileArgs: TileArgs;
  isActive: boolean;
  isSelectedMonth: boolean;
};

export const DiaryTileComponent = memo(
  ({
    studyItem,
    tileArgs,
    isActive,
    isSelectedMonth,
  }: DiaryTileComponentProps) => {
    if (!studyItem) {
      return (
        <Container>
          <IconWrapper>
            {isSelectedMonth && (
              <LFIcon
                variant={"SooPooRyDiaryMarker"}
                size={30}
                color={isActive ? "LFGreen" : "GrayLight30"}
              />
            )}
            <TextOverlay>
              <LFText
                variant={"caption1"}
                weight={"B"}
                whiteSpace={"nowrap"}
                color={isActive ? "LightGreen" : "LFGreen"}
              >
                {new Date(tileArgs.date).getDate()}
              </LFText>
            </TextOverlay>
          </IconWrapper>
        </Container>
      );
    }

    return (
      <Container>
        <LFText>{studyItem.emoji}</LFText>
        <LFChip selected={isActive}>{studyItem.selectedTag}</LFChip>
      </Container>
    );
  },
);

const Container = styled(VStack)`
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 62px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextOverlay = styled(VStack)`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
