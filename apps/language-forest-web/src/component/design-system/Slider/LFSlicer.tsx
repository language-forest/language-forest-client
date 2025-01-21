/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { HStack, LFText } from "@/component/design-system";
import styled from "@emotion/styled";
import { LFColor } from "@repo/shared/constant";

// Props 정의
type LFSlicerProps = {
  minValue: number;
  maxValue: number;
  initialValue: number;
  onChange: (value: number) => void;
};

export const LFSlider = ({
  minValue,
  maxValue,
  initialValue,
  onChange,
}: LFSlicerProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

  return (
    <Container>
      <LFText variant={"title2"} weight={"B"} color={"LabelsSecondary"}>
        {minValue}
      </LFText>
      <div css={sliderWrapperStyle}>
        <div css={sliderBarStyle}>
          <motion.div
            css={sliderActiveStyle}
            animate={{
              width: `${percentage}%`,
            }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={1} // 정수 값만 허용
          value={value}
          onChange={handleSliderChange}
          css={hiddenSliderStyle}
        />
        <motion.div
          css={thumbStyle}
          animate={{
            left: `${percentage}%`,
          }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        />
      </div>
      <LFText variant={"title2"} weight={"B"} color={"LabelsSecondary"}>
        {maxValue}
      </LFText>
    </Container>
  );
};

const Container = styled(HStack)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const sliderWrapperStyle = css`
  width: 100%;
  max-width: 300px;
  position: relative;
  margin: 0 12px;
`;

const sliderBarStyle = css`
  width: 100%;
  height: 4px;
  background: ${LFColor.FillsSecondary};
  border-radius: 2px;
  position: relative;
`;

const sliderActiveStyle = css`
  height: 4px;
  background: ${LFColor.LFGreen};
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
`;

const thumbStyle = css`
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const hiddenSliderStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0; // 입력은 보이지 않도록 처리
  z-index: 2;
  cursor: pointer;
`;
