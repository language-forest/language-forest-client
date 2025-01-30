import { type Bridge, type BridgeStore, linkBridge } from "@webview-bridge/web";
import { PostMessageBridge } from "@repo/shared/webview";

// Here Custom Type
interface BridgeState extends Bridge, PostMessageBridge {}

export type AppBridge = BridgeStore<BridgeState>;
export const bridge = linkBridge<AppBridge>({ timeout: 10000 });

// 이쪽은 웹뷰에서 강제로 넣어준거라 우선 ignore합니다.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const isApp = () => Boolean(window.__VIEW_ON_LF_APP);

export const isAndroidApp = () =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  isApp() && window.__LF_APP_PLATFORM === "android";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const isiOSApp = () => isApp() && window.__LF_APP_PLATFORM === "ios";
