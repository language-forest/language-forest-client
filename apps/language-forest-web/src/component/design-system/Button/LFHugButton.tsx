/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, ReactNode } from "react";
import { LFColor, LFRadius } from "@repo/shared/constant";
import { LoadingIndicator } from "@/component/design-system/Layout";
import {
  LFIcon,
  LFIconProps,
  LFText,
  LFTextProps,
} from "@/component/design-system";

type ButtonType = "Green" | "LightGreen" | "Ghost" | "White";
type ButtonBorder = "Pill" | "Square";

type HugButtonProps = {
  // prefixIcon: {};
  type: ButtonType;
  border: ButtonBorder;
  children: ReactNode;
  onClick: () => Promise<void>;
  prefixIcon?: LFIconProps;
  suffixIcon?: LFIconProps;
};

const baseButtonStyles = {
  padding: "16px 20px",
  borderRadius: LFRadius.corner,
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const buttonStyles: Record<ButtonType, SerializedStyles> = {
  Green: css({
    ...baseButtonStyles,
    backgroundColor: LFColor.LFGreen,
  }),
  LightGreen: css({
    ...baseButtonStyles,
    backgroundColor: LFColor.OpacityG18,
  }),
  White: css({
    ...baseButtonStyles,
    backgroundColor: LFColor.LFWhite,
  }),
  Ghost: css({
    ...baseButtonStyles,
    backgroundColor: "transparent",
  }),
};

const fontStyles: Record<ButtonType, Omit<LFTextProps, "children">> = {
  Green: {
    variant: "body",
    color: "LightGreen",
    weight: "M",
  },
  LightGreen: {
    variant: "body",
    color: "LFGreen",
    weight: "M",
  },
  White: {
    variant: "body",
    color: "LFBlack",
    weight: "M",
  },
  Ghost: {
    variant: "body",
    color: "LFGreen",
    weight: "M",
  },
};

export const LFHugButton = ({
  type,
  border,
  children,
  onClick,
  prefixIcon,
  suffixIcon,
}: HugButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      css={{
        ...buttonStyles[type],
        borderRadius: border === "Pill" ? "8px" : "40px",
      }}
      onClick={handleClick}
      disabled={isLoading}
    >
      <motion.div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={false}
        animate={isLoading ? "loading" : "default"}
        variants={{
          default: { justifyContent: "center" },
          loading: { justifyContent: "center" },
        }}
        transition={{ duration: 0.3 }}
      >
        {/* 텍스트 애니메이션 */}
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 1, x: 0 }}
            animate={isLoading ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
            }}
          >
            {prefixIcon && <LFIcon {...prefixIcon} />}
            <LFText {...fontStyles[type]}>{children}</LFText>
            {suffixIcon && <LFIcon {...suffixIcon} />}
          </motion.span>
        </AnimatePresence>

        {/* 로딩 인디케이터 애니메이션 */}

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, position: "absolute" }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <LoadingIndicator size={20} color={fontStyles[type].color} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};
