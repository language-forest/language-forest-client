import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface Props {
  flex?: number;
  paddingVertical?: string | number;
  paddingHorizontal?: string | number;
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
  position?: CSSProperties["position"];
  bottom?: CSSProperties["bottom"];
  gap?: CSSProperties["gap"];
  zIndex?: CSSProperties["zIndex"];
}

const Stack = styled.div<Props>((props: Props) => {
  return {
    paddingLeft: props.paddingHorizontal,
    paddingRight: props.paddingHorizontal,
    paddingTop: props.paddingVertical,
    paddingBottom: props.paddingVertical,
    flex: props.flex,
    display: "flex",
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    height: props.height,
    width: props.width,
    position: props.position,
    bottom: props.bottom,
    gap: props.gap,
    zIndex: props.zIndex,
  };
});

export const VStack = styled(Stack)<{ spacing?: number | string }>(
  ({ spacing }) => ({
    flexDirection: "column",
    rowGap: spacing,
  }),
);

export const HStack = styled(Stack)<{ spacing?: number | string }>(
  ({ spacing }) => ({
    flexDirection: "row",
    columnGap: spacing,
  }),
);
