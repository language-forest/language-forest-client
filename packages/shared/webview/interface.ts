import { HapticFeedbackTypes } from "./HapticType";

type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

export type safeAreaColors = "blue" | "green" | "transparent";

export type VoiceStatus = "error" | "start" | "notStarted" | "finish";

interface PostMessageBridgeRaw {
  voiceText: string;
  voiceTextList: Array<string>;
  voiceStatus: VoiceStatus;
  postMessageHealthCheck: (params: { input: string }) => string;
  changeSafeAreaColor: (params: { color: safeAreaColors }) => void;
  haptic: (params: { type: HapticFeedbackTypes }) => void;
  onVoiceStart: (params: { locale: string }) => void;
  onVoiceCancel: () => void;
  onVoiceDestroy: () => void;
  openExternalBrowser: (params: { url: string }) => { success: boolean };
  openAppSetting: () => void;
  openNotificationSetting: () => void;
}

// 모든 웹뷰의 통신은 Promise 인데 이를 코드에서 보장하기 위해 아래와 같이 처리합니다.
export interface PostMessageBridge extends Promisify<PostMessageBridgeRaw> {}
