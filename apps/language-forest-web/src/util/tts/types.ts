import { LanguageEnum, VoiceTypeEnum } from "@repo/language-forest-api";

export type PlayTTSParams = {
  text: string;
  voice: VoiceTypeEnum;
  language: LanguageEnum;
};
