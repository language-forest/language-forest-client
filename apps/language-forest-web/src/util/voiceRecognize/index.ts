import { useAndroidVoiceRecognize } from "./useAndroidVoiceRecognize.ts";
import { useIOSVoiceRecognize } from "./useiOSVoiceRecognize.ts";
import { useWebVoiceRecognize } from "./useWebVoiceRecognize.ts";
import { isAndroidApp, isiOSApp } from "@/util/webview.ts";

const useVoiceRecognize = (() => {
  if (isAndroidApp()) {
    return useAndroidVoiceRecognize;
  }
  if (isiOSApp()) {
    return useIOSVoiceRecognize;
  }
  return useWebVoiceRecognize;
})();

export {
  useAndroidVoiceRecognize,
  useIOSVoiceRecognize,
  useWebVoiceRecognize,
  useVoiceRecognize,
};
