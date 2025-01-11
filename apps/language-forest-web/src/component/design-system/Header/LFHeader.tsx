/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HStack } from "@/component/design-system/Layout";
import { CSSProperties } from "react";

interface HeaderProps {
  containerStyle?: CSSProperties;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const LFHeader = ({
  containerStyle,
  left,
  center,
  right,
}: HeaderProps) => {
  return (
    <HStack css={headerStyle} style={containerStyle}>
      <div>{left}</div>
      <div css={centerStyle}>{center}</div>
      <div>{right}</div>
    </HStack>
  );
};

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
`;

const centerStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
