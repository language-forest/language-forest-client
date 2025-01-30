import styled from "@emotion/styled";
import { VStack } from "@/component/design-system";
import { motion } from "framer-motion";

export const LFPageWrapper = styled(VStack)`
  height: 100vh;
`;

// GlobalContainer의 자식 컴포넌트로 사용
export const CTAPosition = styled(VStack)`
  padding: 20px;
  margin-top: auto; // Flex 컨테이너 내부에서 맨 아래로 배치
  gap: 12px;
`;

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;
