import { useEffect, useState } from "react";
import { useBridge } from "@webview-bridge/react";
import { bridge } from "@/util/webview.ts";
import {
  UseVoiceRecognizeParams,
  UseVoiceRecognizeResponse,
} from "@/util/voiceRecognize/types.ts";
import { VoiceStatus } from "@repo/shared/webview";
import { languageEnumToLocaleTransformer } from "@repo/shared/util";

export const useAndroidVoiceRecognize = ({
  locale,
}: UseVoiceRecognizeParams): UseVoiceRecognizeResponse => {
  const [voiceTextList, setVoiceListText] = useState<Array<string>>([""]);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("notStarted");

  const voiceText = mergeAllPartials(voiceTextList);
  console.log("voiceTextList", voiceTextList);
  console.log("voiceText", voiceText);

  const {
    onVoiceStart: _onVoiceStart,
    onVoiceDestroy,
    onVoiceCancel: _onVoiceCancel,
    voicePartialResults,
    voiceStatus: _voiceStatus,
  } = useBridge(bridge.store);

  const onVoiceStart = async () => {
    setVoiceStatus("start");
    await _onVoiceStart({ locale: languageEnumToLocaleTransformer(locale) });
  };

  const onVoiceCancel = async () => {
    setVoiceStatus("finish");
    await _onVoiceCancel();
  };

  useEffect(() => {
    if (voiceStatus === "notStarted") {
      return;
    }
    const target = voicePartialResults[0];
    console.log(target);
    if (!target) {
      return;
    }
    setVoiceListText((prev) => {
      const lastIndex = prev.length - 1;

      return [...prev.slice(0, lastIndex), target];
    });
  }, [voicePartialResults, voiceStatus]);
  useEffect(() => {
    if (_voiceStatus === "finish") {
      setVoiceListText((prev) => [...prev, ""]);
    }
  }, [_voiceStatus]);
  console.log(voiceTextList);

  useEffect(() => {
    return () => {
      onVoiceDestroy();
      setVoiceStatus("notStarted");
      setVoiceListText([""]);
    };
  }, []);

  return {
    onVoiceStart,
    onVoiceDestroy,
    onVoiceCancel,
    voiceText,
    voiceStatus,
  };
};

/**
 * 두 string 배열이 완전히 동일한지 비교하는 헬퍼 함수
 */
function arrayEquals(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * (누적된 단어 배열) + (새 partial 문자열)을 합쳐
 * 뒤/앞 겹치는 단어를 제거한 뒤 새로운 단어 배열로 리턴
 */
function mergeTwoPartials(
  accumulatedTokens: string[],
  newPartial: string,
): string[] {
  // 새 partial 분할
  const newTokens = newPartial.trim().split(/\s+/).filter(Boolean);
  if (accumulatedTokens.length === 0) {
    return newTokens;
  }
  if (newTokens.length === 0) {
    return accumulatedTokens;
  }

  const maxCheckSize = Math.min(accumulatedTokens.length, newTokens.length);
  let overlapSize = 0;

  // 뒤 i개와 앞 i개가 동일한지 확인
  for (let i = 1; i <= maxCheckSize; i++) {
    const tail = accumulatedTokens.slice(-i);
    const head = newTokens.slice(0, i);
    if (arrayEquals(tail, head)) {
      overlapSize = i;
    }
  }

  // 겹치는 부분 제외
  return [...accumulatedTokens, ...newTokens.slice(overlapSize)];
}

/**
 * partial 문자열 배열을 한 번에 합쳐서
 * 최종 문자열을 만드는 함수
 */
export function mergeAllPartials(partials: string[]): string {
  let accumulatedTokens: string[] = [];

  for (const partial of partials) {
    accumulatedTokens = mergeTwoPartials(accumulatedTokens, partial);
  }

  return accumulatedTokens.join(" ");
}
