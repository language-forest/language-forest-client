import { useState } from "react";
import { PlayTTSParams } from "@/util/tts/types.ts";
import { languageEnumToLocaleTransformer } from "@repo/shared/util";

export const useWebTTS = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playTTS = (params: PlayTTSParams) => {
    const { text, voice, language: _language } = params;
    const rate = 1;

    const language = languageEnumToLocaleTransformer(_language);

    if (!text.trim()) return;
    if (!window.speechSynthesis) {
      console.error("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // 음성 속도 조절 (기본값: 1)

    // 사용 가능한 음성 목록 가져오기
    const voices = window.speechSynthesis.getVoices();
    if (voice) {
      const selectedVoice = voices.find((v) => v.lang === language);
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return { playTTS, isPlaying };
};
