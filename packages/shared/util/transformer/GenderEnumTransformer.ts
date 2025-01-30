import { GenderEnum } from "@repo/language-forest-api";

export const GenderEnumTransformer = (level: GenderEnum): string => {
  switch (level) {
    case GenderEnum.FEMALE:
      return "여성 (she)";
    case GenderEnum.MALE:
      return "남성 (He)";
    case GenderEnum.OTHER:
      return "기타";
  }
};
