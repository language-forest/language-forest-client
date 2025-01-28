import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import { LFColor } from "@repo/shared/constant";
import { HStack } from "../Layout";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
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

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } },
  ) => {
    // 사용자가 일정 거리 이상 드래그하면 바텀시트를 닫음
    if (info.offset.y > 10) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Container>
            <BottomSheetWrapper
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sheetVariants}
              drag="y" // Y축 드래그 활성화
              dragConstraints={{ top: 0 }} // 위로는 드래그 불가
              onDragEnd={handleDragEnd} // 드래그 종료 이벤트
            >
              <BottomSheetClickableBar>
                <ClickableBar />
              </BottomSheetClickableBar>
              <SheetContent>
                {children}
                <CloseButton onClick={onClose}>Close</CloseButton>
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
  padding: 20px;
`;
const CloseButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const BottomSheetClickableBar = styled(HStack)`
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
  padding-top: 16px;
  cursor: grab; /* 드래그 가능 UI 표시 */
`;

const ClickableBar = styled.div`
  background-color: ${LFColor.GrayLight50};
  width: 72px;
  height: 6px;
  border-radius: 13px;
`;
