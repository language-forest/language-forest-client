import { useState } from "react";
import { OpenAI } from "openai";
import { PlayTTSParams } from "@/util/tts/types.ts";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Vite의 환경 변수 사용 방식
  dangerouslyAllowBrowser: true, // 브라우저에서 직접 호출 시 필요
});

export const useOpenAITTS = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playTTS = async (params: PlayTTSParams) => {
    const { text, voice: _voice } = params;
    const voice = (() => {
      switch (_voice) {
        case "A":
          return "alloy";
        case "B":
          return "echo";
        case "C":
          return "shimmer";
      }
    })();

    if (!text.trim()) return;

    setIsPlaying(true);

    try {
      const response = await openai.audio.speech.create({
        model: "tts-1",
        input: text,
        voice,
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => setIsPlaying(false); // 재생 완료 시 상태 업데이트
    } catch (error) {
      console.error("TTS Error:", error);
      setIsPlaying(false);
    }
  };

  return { playTTS, isPlaying };
};
