// styles/fonts.fonts.css.ts
import { recipe } from "@vanilla-extract/recipes";

export const textRecipe = recipe({
  base: {
    fontFamily: "Pretendard, sans-serif", // 기본 폰트
  },
  variants: {
    name: {
      "Title2/A": {
        fontSize: "1.75rem",
        fontWeight: "700",
        lineHeight: "1.3",
        color: "#333",
      },
      "Title2/B": {
        fontSize: "1.5rem",
        fontWeight: "600",
        lineHeight: "1.4",
        color: "#555",
      },
      "Title2/C": {
        fontSize: "1.25rem",
        fontWeight: "500",
        lineHeight: "1.5",
        color: "#777",
      },
    },
  },
  defaultVariants: {
    name: "Title2/A",
  },
});
