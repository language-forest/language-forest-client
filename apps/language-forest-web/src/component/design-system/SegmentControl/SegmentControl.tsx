/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { LFColor } from "@repo/shared/constant";
import { LFText } from "@/component/design-system";

type Segment = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  name: string;
  segments: Segment[];
  callback: (value: string, index: number) => void;
  defaultIndex?: number;
};

export const SegmentControl: React.FC<SegmentedControlProps> = ({
  name,
  segments,
  callback,
  defaultIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

  useEffect(() => {
    const handleResize = () => {
      const controlElement = document.querySelector(
        `[data-segment="${name}"]`,
      ) as HTMLDivElement;
      const activeElement = controlElement?.querySelector(
        `.segment:nth-child(${activeIndex + 1})`,
      ) as HTMLDivElement;

      if (controlElement && activeElement) {
        const { width, left } = activeElement.getBoundingClientRect();
        const parentLeft = controlElement.getBoundingClientRect().left;
        controlElement.style.setProperty("--highlight-width", `${width}px`);
        controlElement.style.setProperty(
          "--highlight-x-pos",
          `${left - parentLeft}px`,
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [name, activeIndex]);

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index);
    callback(value, index);
  };

  return (
    <div css={controlsStyle} data-segment={name}>
      {segments.map((segment, i) => (
        <label
          key={segment.value}
          css={segmentStyle}
          className={`segment ${i === activeIndex ? "active" : ""}`}
          onClick={() => onInputChange(segment.value, i)}
        >
          <input
            type="radio"
            id={`${name}-${segment.value}`}
            name={name}
            value={segment.value}
            checked={i === activeIndex}
            onChange={() => onInputChange(segment.value, i)}
          />
          <LFText
            variant={"subHeadline"}
            weight={"M"}
            color={activeIndex === i ? "LFWhite" : "LFGreen"}
          >
            {segment.label}
          </LFText>
        </label>
      ))}
    </div>
  );
};

const controlsStyle = css`
  display: inline-flex;
  justify-content: space-between;
  background-color: ${LFColor.OpacityG18};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  padding: 4px;
  position: relative;
  overflow: hidden;
  border-radius: 36px;

  --highlight-width: 0px;
  --highlight-x-pos: 0px;

  &::before {
    content: "";
    background: ${LFColor.LFGreen};
    border-radius: 25px;
    width: var(--highlight-width);
    height: calc(100% - 8px); /* 패딩 영향을 고려하여 높이 계산 */
    transform: translateX(var(--highlight-x-pos));
    position: absolute;
    top: 4px; /* 세그먼트의 상단 간격 */
    left: 0;
    z-index: 0;
    transition:
      transform 0.3s ease,
      width 0.3s ease;
  }
`;

const segmentStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;
  border-radius: 25px;
  cursor: pointer;
  padding: 12px;
  box-sizing: border-box; /* 패딩 포함 계산 */

  transition: color 5s ease;
  color: ${LFColor.LFGreen};

  input {
    display: none; /* 숨기지만 클릭 가능 */
  }
`;
