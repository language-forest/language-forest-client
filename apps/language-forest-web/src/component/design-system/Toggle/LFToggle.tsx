/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { LFColor } from "@repo/shared/constant";

interface LFToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const LFToggle = ({ value, onChange }: LFToggleProps) => {
  return (
    <div
      css={toggleContainer}
      onClick={() => onChange(!value)}
      role="button"
      aria-pressed={value}
    >
      <motion.div
        css={toggleBackground(value)}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <motion.div
        css={toggleCircle}
        animate={{ x: value ? 21 : 0 }} // 이동 거리 조정
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

// 스타일 정의
const toggleContainer = css`
  width: 52px; // 가로 길이 조정
  height: 31px; // 세로 길이 조정
  border-radius: 15.5px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const toggleBackground = (isOn: boolean) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${isOn ? LFColor.ToggleActiveGreen : LFColor.FillsSecondary};
  border-radius: 15.5px;
  transition: background 0.3s ease-in-out;
`;

const toggleCircle = css`
  width: 27px; // 크기 조정
  height: 27px;
  border-radius: 50%;
  background: ${LFColor.RawGray0};
  position: absolute;
  left: 2px; // 왼쪽 여백 조정
`;
