/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { LFText } from "@/component/design-system";
import { LFColor } from "@repo/shared/constant";

type InputFieldProps = {
  value?: string;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  maxLines?: number; // for textarea
  validate?: (value: string) => boolean;
  maxLength?: number;
};

export const LFInputField: React.FC<InputFieldProps> = ({
  value: externalValue = "",
  onInputChange,
  placeholder = "",
  maxLines,
  validate,
  maxLength,
}) => {
  const [internalValue, setInternalValue] = useState<string>(externalValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const value = externalValue || internalValue;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const _val = e.target.value;
    const val = maxLength ? _val.slice(0, maxLength) : _val;

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
        css={TextAreaStyle(isValid, maxLines, isFocused, Boolean(maxLength))}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {maxLength ? (
        <div css={maxLengthStyle}>
          <LFText variant={"subHeadline"} weight={"M"} color={"GrayLight50"}>
            {value.length}/{maxLength}
          </LFText>
        </div>
      ) : (
        showClearButton && (
          <button css={clearButtonStyle} onClick={handleClear}>
            ✕
          </button>
        )
      )}
    </div>
  ) : (
    <div css={wrapperStyle}>
      <input
        css={inputStyle(isValid, isFocused, Boolean(maxLength))}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {maxLength ? (
        <div css={maxLengthStyle}>
          <LFText variant={"subHeadline"} weight={"M"} color={"GrayLight50"}>
            {value.length}/{maxLength}
          </LFText>
        </div>
      ) : (
        showClearButton && (
          <button css={clearButtonStyle} onClick={handleClear}>
            ✕
          </button>
        )
      )}
    </div>
  );
};

const wrapperStyle = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const inputStyle = (
  isValid: boolean | null,
  isFocused: boolean,
  hasMaxLength: boolean,
) => css`
  width: 100%;
  background-color: ${LFColor.LFWhite};
  padding: 8px ${hasMaxLength ? "60px" : "36px"} 8px 12px; /* maxLength 있을 경우 오른쪽 여유 공간 추가 */
  font-family: "NanumSquareRound", sans-serif;
  font-size: 1rem;
  border: 2px solid;
  border-radius: 8px;
  border-color: ${isValid === null
    ? LFColor.OpacityG18
    : isValid
      ? LFColor.LFGreen
      : LFColor.Red};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${isValid === null
      ? isFocused
        ? LFColor.LFGreen
        : LFColor.LFWhite
      : isValid
        ? LFColor.LFGreen
        : LFColor.Red};
  }
`;

const TextAreaStyle = (
  isValid: boolean | null,
  maxLines: number | undefined,
  isFocused: boolean,
  hasMaxLength: boolean,
) => css`
  ${inputStyle(isValid, isFocused, hasMaxLength)}
  resize: none;
  overflow-y: auto;
  line-height: 1.5;
  max-height: ${maxLines ? `${maxLines * 1.5}em` : "auto"};
`;

const maxLengthStyle = css`
  z-index: 1;
  background-color: ${LFColor.LFWhite};
  position: absolute;
  right: 10px;
  border: none;
  font-size: 16px;
`;

const clearButtonStyle = css`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;
