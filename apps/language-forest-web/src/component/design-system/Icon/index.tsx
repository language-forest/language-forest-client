import React from "react";

// SVG 파일 불러오기
const icons = import.meta.glob("./*.svg", { eager: true });

// 파일 경로에서 파일 이름만 추출 (e.g., './ArrowIcon.svg' -> 'ArrowIcon')
type IconVariants = keyof typeof icons extends `./${infer Name}.svg`
  ? Name
  : never;

interface LFIconProps {
  variant: IconVariants; // 강력한 타입 적용
  width?: number;
  color?: string;
}

const LFIcon: React.FC<LFIconProps> = ({
  variant,
  width = 20,
  color = "black",
}) => {
  // variant에 해당하는 SVG 파일 찾기
  const Icon = icons[`./${variant}.svg`];

  if (!Icon) {
    console.warn(`Icon "${variant}" not found.`);
    return null;
  }

  return (
    <div
      style={{
        width,
        height: width, // 정사각형으로 설정
        color, // currentColor로 적용 가능
        display: "inline-block",
      }}
      dangerouslySetInnerHTML={{ __html: Icon }}
    />
  );
};

export default LFIcon;
