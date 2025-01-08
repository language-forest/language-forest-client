/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

type InputFieldProps = {
  value?: string;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  maxLines?: number; // for textarea
  validate?: (value: string) => boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  value: externalValue = "",
  onInputChange,
  placeholder = "Type here...",
  maxLines,
  validate,
}) => {
  const [internalValue, setInternalValue] = useState<string>(externalValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const value = externalValue || internalValue;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const val = e.target.value;
    setInternalValue(val);
    onInputChange?.(val);
    if (validate) {
      setIsValid(validate(val));
    }
  };

  const handleClear = () => {
    setInternalValue("");
    onInputChange?.("");
    if (validate) {
      setIsValid(null);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const showClearButton = value.length > 0;

  return maxLines && maxLines > 1 ? (
    <div css={wrapperStyle}>
      <textarea
        css={TextAreaStyle(isValid, maxLines, isFocused)}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showClearButton && (
        <button css={clearButtonStyle} onClick={handleClear}>
          ✕
        </button>
      )}
    </div>
  ) : (
    <div css={wrapperStyle}>
      <input
        css={inputStyle(isValid, isFocused)}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showClearButton && (
        <button css={clearButtonStyle} onClick={handleClear}>
          ✕
        </button>
      )}
    </div>
  );
};

const wrapperStyle = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const inputStyle = (isValid: boolean | null, isFocused: boolean) => css`
  width: 100%;
  padding: 8px 36px 8px 12px;
  font-size: 16px;
  border: 2px solid;
  border-radius: 8px;
  border-color: ${isValid === null ? "#ccc" : isValid ? "green" : "red"};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${isValid === null
      ? isFocused
        ? "blue"
        : "#ccc"
      : isValid
        ? "green"
        : "red"};
  }
`;

const TextAreaStyle = (
  isValid: boolean | null,
  maxLines: number | undefined,
  isFocused: boolean,
) => css`
  ${inputStyle(isValid, isFocused)}
  resize: none;
  overflow-y: auto;
  line-height: 1.5;
  max-height: ${maxLines ? `${maxLines * 1.5}em` : "auto"};
`;

const clearButtonStyle = css`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #000;
  }
`;
