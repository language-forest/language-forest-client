import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";
import { LFText } from "@/component/design-system";
import { HStack, VStack } from "@/component/design-system/Layout";
import { LFColor, LFRadius } from "@repo/shared/constant";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onBackdropClick?: () => void;
  bottomButtons: {
    type: "double";
    leftButton: {
      text: string;
      onClick: () => void;
    };
    rightButton: {
      text: string;
      onClick: () => void;
    };
  };
}

export const Alert = ({
  isOpen,
  title,
  description,
  onBackdropClick,
  bottomButtons,
}: ModalProps) => {
  const modalVariants = {
    hidden: {
      y: "20px",
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
      y: "20px",
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
        <Container>
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onBackdropClick}
          />
          <ModalWrapper
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <VStack style={{ flex: 1 }}>
              <ModalContent>
                <LFText variant={"headline"} weight={"B"}>
                  {title}
                </LFText>
                <LFText variant={"subHeadline"} weight={"R"}>
                  {description}
                </LFText>
              </ModalContent>
              {bottomButtons.type === "double" && (
                <VStack>
                  <HStack
                    style={{
                      flex: 1,
                    }}
                  >
                    <DoubleLeftButton
                      onClick={bottomButtons.leftButton.onClick}
                    >
                      <LFText variant="callout" color={"LFGreen"} weight={"R"}>
                        {bottomButtons.leftButton.text}
                      </LFText>
                    </DoubleLeftButton>

                    <DoubleRightButton
                      onClick={bottomButtons.rightButton.onClick}
                    >
                      <LFText variant="callout" color={"LFGreen"} weight={"M"}>
                        {bottomButtons.rightButton.text}
                      </LFText>
                    </DoubleRightButton>
                  </HStack>
                </VStack>
              )}
            </VStack>
          </ModalWrapper>
        </Container>
      )}
    </AnimatePresence>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110; /* 다른 요소 위로 보이게 */
`;

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 120;
`;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  transform: translate(-50%, -50%);
  background: white;
  padding-top: 20px;
  border-radius: ${LFRadius.corner}px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 130;
  min-width: 270px;
  max-width: 70vw;
`;

const ModalContent = styled(VStack)`
  gap: 8px;
  text-align: center;
  padding-bottom: 16px;
`;

const DoubleLeftButton = styled.button`
  padding: 16px 0;
  border-top: 1px solid ${LFColor.GrayLight30};
  background-color: ${LFColor.White};
  flex: 1;
  border-bottom-left-radius: ${LFRadius.corner}px;
  border-right: 0.5px solid ${LFColor.GrayLight30};
`;

const DoubleRightButton = styled.button`
  padding: 16px 0;
  border-top: 1px solid ${LFColor.GrayLight30};
  background-color: ${LFColor.White};
  flex: 1;
  border-bottom-right-radius: ${LFRadius.corner}px;
  border-left: 0.5px solid ${LFColor.GrayLight30};
`;
