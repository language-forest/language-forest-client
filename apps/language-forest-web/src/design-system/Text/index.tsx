import { FC, ElementType } from "react";
import { textRecipe } from "./fonts.css";

interface TextProps {
  tag?: ElementType; // h1, h2, p 등 DOM 태그
  name?: "Title2/A" | "Title2/B" | "Title2/C"; // 스타일 변형
  className?: string; // 추가 클래스
  children: string; // 텍스트
}

export const Text: FC<TextProps> = ({
  tag: Tag = "p",
  name,
  children,
  className,
}) => {
  const nameClass = textRecipe({ name });

  return <Tag className={`${nameClass} ${className ?? ""}`}>{children}</Tag>;
};
