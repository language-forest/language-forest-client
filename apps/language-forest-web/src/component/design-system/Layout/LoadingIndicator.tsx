/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { LFColor, LFColorType } from "@repo/shared/constant";

type LoadingIndicatorProps = {
  size?: number;
  color?: LFColorType;
};

export const LoadingIndicator = ({
  size = 16,
  color = "LFWhite",
}: LoadingIndicatorProps) => {
  const loadingIndicatorStyles = css({
    width: `${size}px`,
    height: `${size}px`,
    border: `${size / 5}px solid ${LFColor[color]}`, // 테두리 두께는 크기에 비례
    borderTop: `${size / 5}px solid transparent`, // 투명한 부분
    borderRadius: "50%",
  });

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
      css={loadingIndicatorStyles}
    />
  );
};
