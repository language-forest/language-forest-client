import styled from "@emotion/styled";
import { LFColor, LFColorType } from "@repo/shared/constant";

type DividerType = 1 | 4 | 8;

type DividerProps =
  | {
      width: DividerType; // 가로 Divider
      height?: never; // 높이는 사용 불가
      backgroundColor?: LFColorType; // 배경색
    }
  | {
      width?: never; // 너비는 사용 불가
      height: DividerType; // 세로 Divider
      backgroundColor?: LFColorType; // 배경색
    };

export const Divider = styled.div<DividerProps>`
  display: flex;
  width: ${({ width }) =>
    width ? `${width}px` : "100%"}; /* 명시적으로 주어진 경우 픽셀 단위 */
  height: ${({ height }) =>
    height ? `${height}px` : "100%"}; /* 명시적으로 주어진 경우 픽셀 단위 */
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? LFColor[backgroundColor] : "#e0e0e0"}; /* 기본 배경색 */
`;
