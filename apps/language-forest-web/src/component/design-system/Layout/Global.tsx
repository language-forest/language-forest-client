import styled from "@emotion/styled";
import { VStack } from "@/component/design-system";

export const GlobalContainer = styled(VStack)`
  height: 100vh;
`;

// GlobalContainer의 자식 컴포넌트로 사용
export const CTAPosition = styled(VStack)`
  padding: 20px;
  margin-top: auto; // Flex 컨테이너 내부에서 맨 아래로 배치
  gap: 12px;
`;
