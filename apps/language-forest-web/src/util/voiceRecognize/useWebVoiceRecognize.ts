import { useState, useRef } from "react";
import { VoiceStatus } from "@repo/shared/webview";
import {
  UseVoiceRecognizeParams,
  UseVoiceRecognizeResponse,
} from "@/util/voiceRecognize/types.ts";
import { languageEnumToLocaleTransformer } from "@repo/shared/util";

export const useWebVoiceRecognize = ({
  locale,
}: UseVoiceRecognizeParams): UseVoiceRecognizeResponse => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [voiceText, setVoiceText] = useState<string>("");
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("notStarted");

  if (!recognitionRef.current) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      throw new Error(
        "SpeechRecognition API is not supported in this browser.",
      );
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = languageEnumToLocaleTransformer(locale);
    recognitionRef.current.interimResults = true;
    recognitionRef.current.continuous = true;

    recognitionRef.current.onstart = () => {
      setVoiceStatus("start");
    };

    recognitionRef.current.onresult = (event) => {
      const resultsArray = Array.from(event.results);
      setVoiceText(resultsArray.map((item) => item[0].transcript).join(" "));
    };

    recognitionRef.current.onerror = () => {
      setVoiceStatus("error");
    };

    recognitionRef.current.onend = () => {
      if (voiceStatus !== "error") {
        setVoiceStatus("finish");
      }
    };
  }

  const onVoiceStart = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const onVoiceCancel = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setVoiceStatus("finish");
    }
  };

  const onVoiceDestroy = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setVoiceStatus("finish");
      recognitionRef.current = null;
    }
  };

  return {
    onVoiceStart,
    onVoiceCancel,
    onVoiceDestroy,
    voiceText,
    voiceStatus,
  };
};
