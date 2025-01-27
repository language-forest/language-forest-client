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

  // 이 부분이 최종 완성 문자열을 만드는 핵심!
  const voiceText = mergeAllPartials(voiceTextList);

  const {
    onVoiceStart: _onVoiceStart,
    onVoiceDestroy,
    onVoiceCancel: _onVoiceCancel,
    voicePartialResults,
    voiceStatus: _voiceStatus,
  } = useBridge(bridge.store);

  /**
   * 마이크 시작
   */
  const onVoiceStart = async () => {
    setVoiceStatus("start");
    await _onVoiceStart({ locale: languageEnumToLocaleTransformer(locale) });
  };

  /**
   * 마이크 취소
   */
  const onVoiceCancel = async () => {
    setVoiceStatus("finish");
    await _onVoiceCancel();
  };

  /**
   * voicePartialResults[0]이 새로 들어올 때마다,
   * `voiceTextList`의 마지막 요소와 합쳐서 갱신한다.
   *
   * - 마지막 요소에 겹쳐지는 부분이 있다면 중복 없이 merge.
   * - 예: 마지막 요소가 "가나다"이고 새 partial이 "가나다라"라면 → "가나다라"
   */
  useEffect(() => {
    if (voiceStatus === "notStarted") {
      return;
    }
    const target = voicePartialResults[0];
    if (!target) {
      return;
    }

    setVoiceListText((prev) => {
      // 이미 누적된 문자열 중 "마지막" 부분만 새 partial과 합치면 됨
      const lastIndex = prev.length - 1;
      const merged = mergeTwoPartials(prev[lastIndex], target);
      return [...prev.slice(0, lastIndex), merged];
    });
  }, [voicePartialResults, voiceStatus]);

  /**
   * voiceStatus(혹은 _voiceStatus)가 "finish"가 되면,
   * 마지막 partial을 확정짓고 다음 인식 결과를 받기 위해
   * 새로운 공백 문자열을 push
   */
  useEffect(() => {
    if (_voiceStatus === "finish") {
      setVoiceListText((prev) => [...prev, ""]);
    }
  }, [_voiceStatus]);

  /**
   * 컴포넌트 unmount 시에
   * - 마이크 리소스 정리
   * - voiceStatus, voiceTextList 초기화
   */
  useEffect(() => {
    return () => {
      onVoiceDestroy();
      setVoiceStatus("notStarted");
      setVoiceListText([""]);
    };
  }, [onVoiceDestroy]);

  return {
    onVoiceStart,
    onVoiceDestroy,
    onVoiceCancel,
    voiceText,
    voiceStatus,
  };
};

/**
 * [1] 두 문자열을 **접두사/접미사 최대 겹침**으로 합치는 함수
 *    - 예: "가나다" + "가나다라" → "가나다라"
 *    - 예: "안녕하세요" + "하세요 반갑습니다" → "안녕하세요하세요 반갑습니다"
 *        (접두사/접미사가 일치하면 겹침, 중간 문자열 겹침은 처리하지 않음)
 */
function mergeTwoPartials(accumulated: string, newStr: string): string {
  let overlapSize = 0;
  const maxPossible = Math.min(accumulated.length, newStr.length);

  // accumulated의 끝부분(tail)과 newStr의 앞부분(head)이 일치하는 가장 긴 길이를 찾는다.
  for (let i = 1; i <= maxPossible; i++) {
    const tail = accumulated.slice(-i);
    const head = newStr.slice(0, i);
    if (tail === head) {
      overlapSize = i;
    }
  }
  // 겹치는 부분(overlapSize)은 이미 포함되어 있으므로, 그 뒤부터 이어붙인다.
  return accumulated + newStr.slice(overlapSize);
}

/**
 * [2] partial 문자열들이 여러 개 들어왔을 때,
 *     순서대로 mergeTwoPartials를 적용해서 최종 문자열을 만든다.
 */
function mergeAllPartials(partials: string[]): string {
  return partials.reduce((acc, cur) => mergeTwoPartials(acc, cur), "");
}
