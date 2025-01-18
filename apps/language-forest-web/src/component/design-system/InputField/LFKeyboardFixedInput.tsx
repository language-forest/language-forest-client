/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";

export const LFKeyboardFixedInput = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // 키보드가 올라왔을 때 window.innerHeight가 작아지는 것을 감지
      const visibleHeight = window.innerHeight;
      const fullHeight = document.documentElement.clientHeight;
      setKeyboardHeight(Math.max(0, fullHeight - visibleHeight));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 실행

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div css={containerStyle}>
      <div css={inputContainerStyle} style={{ bottom: keyboardHeight }}>
        <input
          type="text"
          placeholder="Type your message..."
          css={inputStyle}
        />
        <button css={buttonStyle}>Send</button>
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
`;

const inputContainerStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const inputStyle = css`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const buttonStyle = css`
  padding: 10px 15px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
