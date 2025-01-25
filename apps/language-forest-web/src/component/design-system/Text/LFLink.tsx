/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const LFLink = styled.a`
  text-decoration: underline;
  color: inherit; /* 텍스트 색상은 부모 요소의 색상과 일치 */
  text-decoration-color: inherit; /* 밑줄 색상도 텍스트 색상과 일치 */
  text-decoration-thickness: 1px; /* 밑줄 두께 설정 */
  text-underline-offset: 2px; /* 텍스트와 밑줄 간격 설정 */
  &:hover {
    text-decoration-color: currentColor; /* hover 시 색상 변화 추가 가능 */
  }
`;
