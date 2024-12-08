import { type Bridge, type BridgeStore, linkBridge } from '@webview-bridge/web';
import { PostMessageBridge } from '@repo/shared/webview'

// Here Custom Type
interface BridgeState extends Bridge, PostMessageBridge {}

export type AppBridge = BridgeStore<BridgeState>;
export const bridge = linkBridge<AppBridge>();