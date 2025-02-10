import { LanguageEnum } from "@repo/language-forest-api";

export const languageEnumToLocaleTransformer = (
  language: LanguageEnum,
): string => {
  switch (language) {
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

export const languageEnumToForestName = (language?: LanguageEnum): string => {
  switch (language) {
    case "JA":
      return "일본어의 숲";
    case "ZH":
      return "중국어의 숲";
    case "FR":
      return "프랑스어의 숲";
    case "ES":
      return "스페인어의 숲";
    case "DE":
      return "독일어의 숲";
    case "EN":
      return "영어의 숲";
    case "KO":
      return "한글의 숲";
    default:
      return "언어의 숲";
  }
};

export const languageEnumToText = (language?: LanguageEnum): string => {
  switch (language) {
    case "JA":
      return "일본어";
    case "ZH":
      return "중국어";
    case "FR":
      return "프랑스어";
    case "ES":
      return "스페인어";
    case "DE":
      return "독일어";
    case "EN":
      return "영어";
    case "KO":
      return "한국어";
    default:
      return "영어";
  }
};
