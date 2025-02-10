import { motion, AnimatePresence, useDragControls } from "framer-motion";
import styled from "@emotion/styled";
import { LFColor } from "@repo/shared/constant";
import { Backdrop, HStack } from "../Layout";
import { LFText } from "@/component/design-system";
import { overlay } from "overlay-kit";
import { CSSProperties, useRef } from "react";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";

interface BottomSheetProps {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
  contentContainerStyle?: CSSProperties;
}

export const LFBottomSheet = ({
  title,
  children,
  onClose,
  contentContainerStyle,
}: BottomSheetProps) => {
  overlay.open(({ close, isOpen }) => {
    const handleClose = () => {
      onClose?.();
      close();
    };
    return (
      <BottomSheet
        title={title}
        isOpen={isOpen}
        onClose={handleClose}
        contentContainerStyle={contentContainerStyle}
      >
        {children}
      </BottomSheet>
    );
  });
};

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  title,
  contentContainerStyle,
}: BottomSheetProps & { isOpen: boolean; onClose: () => void }) => {
  useDisableScroll();

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } },
  ) => {
    // 사용자가 일정 거리 이상 드래그하면 바텀시트를 닫음
    if (info.offset.y > 20) {
      onClose();
    }
  };

  const dragControls = useDragControls();
  const bottomSheetRef = useRef<HTMLDivElement>(null); // 바텀시트 DOM 참조

  const handleDragStart = (e: React.PointerEvent) => {
    if (bottomSheetRef.current) {
      const sheet = bottomSheetRef.current;

      // 🌟 드래그 애니메이션 즉시 실행하도록 보장
      sheet.style.pointerEvents = "none"; // 드래그 중 내부 요소가 이벤트를 받지 않도록 함
      dragControls.start(e);

      setTimeout(() => {
        sheet.style.pointerEvents = ""; // 드래그 종료 후 다시 이벤트 활성화
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Container>
            <BottomSheetWrapper
              ref={bottomSheetRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sheetVariants}
              dragControls={dragControls} // dragControls 연결
              dragConstraints={{ top: 0 }}
              onDragEnd={handleDragEnd}
            >
              {/* 드래그 가능한 영역 */}
              <BottomSheetClickableBar
                onPointerDown={handleDragStart} // 자연스럽게 드래그 시작
              >
                <ClickableBar />
              </BottomSheetClickableBar>

              <HStack paddingVertical={8} paddingHorizontal={20}>
                {title && (
                  <LFText
                    variant={"title2"}
                    color={"ContentMainC"}
                    weight={"B"}
                  >
                    {title}
                  </LFText>
                )}
              </HStack>
              <SheetContent
                style={contentContainerStyle}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }} // 내부에서 드래그 방지
              >
                {children}
              </SheetContent>
            </BottomSheetWrapper>
          </Container>
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  min-width: 270px;
  max-width: 480px;
`;
const BottomSheetWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px 12px 0 0;
  z-index: 200;
  width: 100%;
  min-width: 270px;
  max-width: 480px;
`;
const SheetContent = styled.div`
  overflow: auto;
  padding: 20px;
`;

const BottomSheetClickableBar = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
  padding-top: 16px;
`;

const ClickableBar = styled.div`
  background-color: ${LFColor.GrayLight50};
  width: 72px;
  height: 6px;
  border-radius: 13px;
`;

const sheetVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
};
