import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  LFColorKey,
  LFFontSizeType,
  LFFontSize,
  LFFontWeight,
  LFFontWeightType,
  LFColor,
} from "@repo/shared/constant";
import { CSSProperties, ReactNode } from "react";

export interface LFTextProps {
  variant?: LFFontSizeType;
  weight?: LFFontWeightType;
  color?: LFColorKey;
  children: ReactNode;
  textAlign?: CSSProperties["textAlign"];
  whiteSpace?: CSSProperties["whiteSpace"];
}

// Text 컴포넌트
export const LFText = ({
  variant = "body",
  weight = "R",
  color = "LFBlack",
  children,
  textAlign = "start",
  whiteSpace = "pre-wrap",
}: LFTextProps) => {
  return (
    <TextStyled
      variant={variant}
      weight={weight}
      color={color}
      textAlign={textAlign}
      whiteSpace={whiteSpace}
    >
      {children}
    </TextStyled>
  );
};

const TextStyled = styled.p<Required<LFTextProps>>(
  ({ variant, weight, color, textAlign, whiteSpace }) => {
    const fontSizeValue = LFFontSize[variant];
    const fontWeightValue = LFFontWeight[weight];

    return css`
      color: ${LFColor[color]};
      font-family: "NanumSquareRound", sans-serif;
      font-size: ${fontSizeValue.size / 16}rem;
      font-weight: ${fontWeightValue};
      line-height: ${fontSizeValue.lienHeight / 16}rem;
      letter-spacing: ${fontSizeValue?.letterSpacing}px;
      text-align: ${textAlign};
      white-space: ${whiteSpace};
    `;
  },
);
