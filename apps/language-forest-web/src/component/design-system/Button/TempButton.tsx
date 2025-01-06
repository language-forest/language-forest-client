import React from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  isPrimary?: boolean;
  onClick?: () => void;
  text: string;
}

const RawButton = styled.button<Omit<ButtonProps, "text">>`
  display: inline-block;
  padding: 15px 25px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ isPrimary }) => (isPrimary ? "white" : "#2e7d32")};
  background: ${({ isPrimary }) => (isPrimary ? "#2e7d32" : "#e8f5e9")};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background: ${({ isPrimary }) => (isPrimary ? "#1b5e20" : "#c8e6c9")};
  }
`;

export const TempButton: React.FC<ButtonProps> = ({
  isPrimary,
  onClick,
  text,
}) => {
  return (
    <RawButton isPrimary={isPrimary} onClick={onClick}>
      {text}
    </RawButton>
  );
};
