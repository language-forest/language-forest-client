import { HapticFeedbackTypes } from "./HapticType";
import { AppleRequestResponse } from "./AppleLoginType";

type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

export type VoiceStatus = "error" | "start" | "notStarted" | "finish";

interface PostMessageBridgeRaw {
  changeSafeAreaColor: (params: { color: string }) => void;

  onAppleLogin: () =>
    | { isSuccess: true; response: AppleRequestResponse }
    | { isSuccess: false };

  haptic: (params: { type: HapticFeedbackTypes }) => void;

  voiceText: string;
  voicePartialResults: Array<string>;
  voiceStatus: VoiceStatus;
  onVoiceStart: (params: { locale: string }) => void;
  onVoiceCancel: () => void;
  onVoiceDestroy: () => void;

  openExternalBrowser: (params: { url: string }) => { success: boolean };
  openAppSetting: () => void;
  openNotificationSetting: () => void;
}

// 모든 웹뷰의 통신은 Promise 인데 이를 코드에서 보장하기 위해 아래와 같이 처리합니다.
export interface PostMessageBridge extends Promisify<PostMessageBridgeRaw> {}
