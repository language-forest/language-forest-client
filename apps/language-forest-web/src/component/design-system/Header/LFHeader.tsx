/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HStack, VStack } from "@/component/design-system/Layout";
import { CSSProperties } from "react";

interface HeaderProps {
  containerStyle?: CSSProperties;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const height = "56px";

export const LFHeader = ({
  containerStyle,
  left,
  center,
  right,
}: HeaderProps) => {
  return (
    <VStack height={height}>
      <HStack css={headerStyle} style={containerStyle}>
        <div>{left}</div>
        <div css={centerStyle}>{center}</div>
        <div>{right}</div>
      </HStack>
    </VStack>
  );
};

const headerStyle = css`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${height};
  padding: 0 4px;
`;

const centerStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
