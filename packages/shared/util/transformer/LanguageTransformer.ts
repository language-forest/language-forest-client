import { LanguageEnum } from "@repo/language-forest-api";

export const languageEnumToLocaleTransformer = (
  locale: LanguageEnum,
): string => {
  switch (locale) {
    case LanguageEnum.KO:
      return "ko-KR";
    case LanguageEnum.ZH:
      return "zh-CN";
    case LanguageEnum.JA:
      return "ja-JP";
    case LanguageEnum.DE:
      return "de-DE";
    case LanguageEnum.EN:
      return "en-US";
    case LanguageEnum.ES:
      return "es-ES";
    case LanguageEnum.FR:
      return "fr-FR";
  }
};
