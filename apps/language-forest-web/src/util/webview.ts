import { type Bridge, type BridgeStore, linkBridge } from "@webview-bridge/web";
import { PostMessageBridge } from "@repo/shared/webview";

// Here Custom Type
interface BridgeState extends Bridge, PostMessageBridge {}

export type AppBridge = BridgeStore<BridgeState>;
export const bridge = linkBridge<AppBridge>();

export const isApp = () => Boolean(window.__VIEW_ON_LF_APP);
export const isAndroidApp = () =>
  isApp() && window.__LF_APP_PLATFORM === "android";
export const isiOSApp = () => isApp() && window.__LF_APP_PLATFORM === "ios";
