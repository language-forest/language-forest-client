import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const TempModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalVariants = {
    hidden: {
      y: "50px",
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
      y: "50px",
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
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <ModalWrapper
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <ModalContent>{children}</ModalContent>
          </ModalWrapper>
        </>
      )}
    </AnimatePresence>
  );
};

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 120;
`;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 130;
`;

const ModalContent = styled.div`
  padding: 10px;
  text-align: center;
`;
