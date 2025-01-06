import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const TempBottomSheet: React.FC<BottomSheetProps> = ({
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <BottomSheetWrapper
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sheetVariants}
          >
            <SheetContent>
              {children}
              <CloseButton onClick={onClose}>Close</CloseButton>
            </SheetContent>
          </BottomSheetWrapper>

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

const BottomSheetWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px 12px 0 0;
  z-index: 100;
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

export default TempBottomSheet;
