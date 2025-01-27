import { useBridge } from "@webview-bridge/react";
import { bridge } from "@/util/webview.ts";
import {
  UseVoiceRecognizeParams,
  UseVoiceRecognizeResponse,
} from "@/util/voiceRecognize/types.ts";
import { languageEnumToLocaleTransformer } from "@repo/shared/util";

export const useIOSVoiceRecognize = ({
  locale,
}: UseVoiceRecognizeParams): UseVoiceRecognizeResponse => {
  const {
    onVoiceStart: _onVoiceStart,
    onVoiceDestroy,
    onVoiceCancel,
    voiceText,
    voiceStatus,
  } = useBridge(bridge.store);

  const onVoiceStart = async () => {
    await _onVoiceStart({ locale: languageEnumToLocaleTransformer(locale) });
  };

  return {
    onVoiceStart,
    onVoiceCancel,
    onVoiceDestroy,
    voiceText,
    voiceStatus,
  };
};
