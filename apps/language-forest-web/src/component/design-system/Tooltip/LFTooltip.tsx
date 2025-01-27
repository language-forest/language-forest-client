/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { LFText } from "@/component/design-system";
import { LFColor } from "@repo/shared/constant";

type TooltipItemProps = {
  label: string;
  position:
    | "top-right"
    | "top"
    | "top-left"
    | "bottom-right"
    | "bottom"
    | "bottom-left";
};

const color = LFColor["GrayLight30"];

export const LFTooltip: React.FC<TooltipItemProps> = ({ label, position }) => {
  return (
    <div css={tooltipItem}>
      <div css={tooltipLabel(position)}>
        <LFText variant="subHeadline" weight={"M"} textAlign={"center"}>
          {label}
        </LFText>
        <span css={tooltipTail(position)} />
      </div>
    </div>
  );
};

// 스타일 정의
const tooltipItem = css`
  position: relative;
  margin: 20px;
`;

const tooltipLabel = (position: string) => css`
  position: relative;
  background-color: ${color};
  color: #000;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  display: inline-block;

  ${position === "top-right" &&
  `
    margin-left: auto;
    margin-right: 10px;
  `}
`;

const tooltipTail = (position: string) => css`
  position: absolute;
  display: inline-block;
  width: 13px;
  height: 13px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M 0 20 Q 10 -10 20 20 L 20 20 L 0 20 Z" fill="%23${color.replace(
      "#",
      "",
    )}"/></svg>')
    no-repeat;
  background-size: contain;

  ${position === "top-right" &&
  `
    top: -10px;
    right: 10px;
    transform: rotate(0deg);
  `}
  ${position === "top" &&
  `
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(0deg);
  `}
  ${position === "top-left" &&
  `
    top: -10px;
    left: 10px;
    transform: rotate(0deg);
  `}
  ${position === "bottom-right" &&
  `
    bottom: -10px;
    right: 10px;
    transform: rotate(180deg);
  `}
  ${position === "bottom" &&
  `
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(180
  `}
  ${position === "bottom-left" &&
  `
    bottom: -10px;
    left: 10px;
    transform: rotate(180deg);
  `}
`;
