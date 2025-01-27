import { LanguageEnum } from "@repo/language-forest-api";
import { VoiceStatus } from "@repo/shared/webview";

export type UseVoiceRecognizeParams = {
  locale: LanguageEnum;
};

export type UseVoiceRecognizeResponse = {
  onVoiceDestroy: () => Promise<void>;
  voiceStatus: VoiceStatus;
  onVoiceStart: () => Promise<void>;
  onVoiceCancel: () => Promise<void>;
  voiceText: string;
};
