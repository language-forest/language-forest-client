import {Bridge} from '@webview-bridge/react-native';
import {PostMessageBridge} from "@repo/shared/webview";

export interface BridgeState extends Bridge, PostMessageBridge {}
