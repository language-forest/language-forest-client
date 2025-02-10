/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { LFColor } from "@repo/shared/constant";

type TimerProps = {
  duration: number; // 초 단위 타이머
  size?: number; // 사이즈 주입 가능
  onComplete?: () => void;
};

export const LFTimer = ({ duration, size = 80, onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  const progress = (timeLeft / duration) * 100;
  const circumference = 40 * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div css={containerStyle(size)}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ddd"
          strokeWidth="5"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={LFColor.LFGreen}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </svg>
      <span css={textStyle}>{timeLeft}</span>
    </div>
  );
};

const containerStyle = (size: number) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size}px;
  height: ${size}px;
`;

const textStyle = css`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color: ${LFColor.LFGreen};
`;
