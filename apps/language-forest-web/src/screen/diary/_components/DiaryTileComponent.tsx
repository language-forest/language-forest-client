import { MonthlyStudyResponseStudiesItem } from "@repo/language-forest-api";
import { memo } from "react";
import { LFChip, LFText, VStack } from "@/component/design-system";
import { TileArgs } from "react-calendar";
import styled from "@emotion/styled";

type DiaryTileComponentProps = {
  studyItem?: MonthlyStudyResponseStudiesItem;
  tileArgs: TileArgs;
};

export const DiaryTileComponent = memo(
  ({ studyItem, tileArgs }: DiaryTileComponentProps) => {
    if (!studyItem) {
      return (
        <Container>
          <LFText>{new Date(tileArgs.date).getDate()}</LFText>
        </Container>
      );
    }

    return (
      <Container>
        <LFText>{studyItem.emoji}</LFText>
        <LFChip>{studyItem.selectedTag}</LFChip>
      </Container>
    );
  },
);

const Container = styled(VStack)`
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 62px;
`;

// const Tag = styled(VStack)``;
