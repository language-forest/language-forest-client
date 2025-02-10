import { isApp } from "@/util/webview.ts";
import { useOpenAITTS } from "@/util/tts/useOpenAITTS.ts";
import { useWebTTS } from "@/util/tts/useWebTTS.ts";

const useTTS = (() => {
  if (isApp()) {
    return useOpenAITTS;
  }
  return useWebTTS;
})();

export { useTTS, useOpenAITTS, useWebTTS };
