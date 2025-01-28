/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, ReactNode } from "react";
import { LFColor, LFRadius } from "@repo/shared/constant";
import { LoadingIndicator } from "@/component/design-system/Layout";
import { LFText, LFTextProps } from "@/component/design-system";

type ButtonType = "Green" | "LightGreen" | "Line" | "LineSelected";

type ButtonProps = {
  type: ButtonType;
  children: ReactNode;
  disabled?: boolean;
  onClick: () => Promise<void> | void;
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
  width: "100%",
  overflow: "hidden",
};

const buttonStyles: Record<ButtonType, SerializedStyles> = {
  Green: css({
    ...baseButtonStyles,
    backgroundColor: LFColor.LFGreen,
    border: `1px solid ${LFColor.OpacityG18}`,
  }),
  LightGreen: css({
    ...baseButtonStyles,
    backgroundColor: LFColor.Green10,
  }),
  Line: css({
    ...baseButtonStyles,
    backgroundColor: LFColor.LFWhite,
    border: `1px solid ${LFColor.OpacityB18}`,
  }),
  LineSelected: css({
    ...baseButtonStyles,
    backgroundColor: LFColor.GrayLight20,
    border: `1px solid ${LFColor.OpacityG80}`,
  }),
};

const fontStyles: Record<ButtonType, Omit<LFTextProps, "children">> = {
  Green: {
    variant: "subHeadline",
    color: "LightGreen",
    weight: "M",
  },
  LightGreen: {
    variant: "callout",
    color: "LFGreen",
    weight: "M",
  },
  Line: {
    variant: "subHeadline",
    color: "LFBlack",
    weight: "M",
  },
  LineSelected: {
    variant: "subHeadline",
    color: "LFBlack",
    weight: "M",
  },
};

export const LFFillButton = ({
  type,
  children,
  disabled = false,
  onClick,
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled) {
      return;
    }
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
      css={{ ...buttonStyles[type] }}
      style={{
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      <motion.div whileTap={{ scale: 0.95, opacity: 0.9 }}>
        <motion.div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
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
              animate={
                isLoading ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
              }
              transition={{ duration: 0.3 }}
              style={{
                whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
              }}
            >
              <LFText {...fontStyles[type]}>{children}</LFText>
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
      </motion.div>
    </button>
  );
};
