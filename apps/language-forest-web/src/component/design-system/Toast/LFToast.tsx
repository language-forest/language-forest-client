import { overlay } from "overlay-kit";
import { useAsyncEffect } from "@/hook/useAsyncEffect.ts";
import { waitTimeout } from "@/util/waitTimeout.ts";
import { AnimatePresence, motion } from "framer-motion";
import { LFColor } from "@repo/shared/constant";
import { LFText } from "@/component/design-system";

type LFToastProps = {
  text: string;
  position: "top" | "middle" | "bottom";
  duration?: number;
};

export const LFToast = ({ text, duration, position }: LFToastProps) => {
  overlay.open(({ close, isOpen }) => {
    return (
      <InnerLFToast
        text={text}
        position={position}
        duration={duration}
        close={close}
        isOpen={isOpen}
      />
    );
  });
};

const InnerLFToast = ({
  text,
  position = "top",
  duration = 2000,
  close,
  isOpen,
}: LFToastProps & { close: () => void; isOpen: boolean }) => {
  useAsyncEffect(async () => {
    await waitTimeout(duration);
    close();
  }, [duration]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 60,
            width: "100vw",
            maxWidth: "720px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: LFColor.LFBlack,
              padding: "12px 20px",
              borderRadius: "12px",
            }}
          >
            <LFText variant={"body"} weight={"R"} color={"White"}>
              {text}
            </LFText>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
