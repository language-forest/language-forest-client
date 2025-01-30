import { LevelEnum } from "@repo/language-forest-api";

export const levelEnumTransformer = (level: LevelEnum): string => {
  switch (level) {
    case LevelEnum.A:
      return "매우 쉬움";
    case LevelEnum.B:
      return "쉬움";
    case LevelEnum.C:
      return "보통";
    case LevelEnum.D:
      return "어려움";
    case LevelEnum.E:
      return "매우 어려움";
  }
};
