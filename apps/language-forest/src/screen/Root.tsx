import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BridgeState } from "../util/webview";
import { useEffect, useMemo, useRef, useState } from "react";
import WebView from "react-native-webview";
import {
  Alert,
  BackHandler,
  Button,
  Linking,
  Platform,
  StyleSheet,
} from "react-native";
import { bridge, createWebView } from "@webview-bridge/react-native";
import { safeAreaColors, VoiceStatus } from "@repo/shared/webview";
import { trigger } from "react-native-haptic-feedback";
import { throttle } from "@repo/shared/util";
import Voice from "@react-native-voice/voice";
import { startVoice, destroyVoice } from "../util/voice.ts";

const RootLayout = () => {
  const webviewRef = useRef<WebView>(null);
  const [safeAreaColor, setSafeAreaColor] = useState<safeAreaColors>("blue");

  const handleAndroidBackPress = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true; // 뒤로가기 이벤트 중단
    }
    return false; // 기본 뒤로가기 동작 실행
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    Alert.alert(
      "오류 발생",
      `웹 페이지를 불러올 수 없습니다.\n${nativeEvent.description}`,
    );
  };

  const appBridge = useMemo(
    () =>
      bridge<BridgeState>(({ get, set }) => ({
        voiceStatus: "notStarted",
        voiceTextList: [],
        voiceText: "",
        postMessageHealthCheck: async ({ input }) => {
          return `${input} success`;
        },
        changeSafeAreaColor: async ({ color }) => {
          setSafeAreaColor(color);
        },
        openNotificationSetting: async () => {
          throttle(async () => {
            if (Platform.OS === "ios") {
              // iOS 설정 화면 열기
              await Linking.openURL("app-settings:");
            } else if (Platform.OS === "android") {
              // Android의 알림 설정 화면 열기
              try {
                await Linking.openURL(
                  "android.settings.APP_NOTIFICATION_SETTINGS",
                );
              } catch (error) {
                console.error("Error opening notification settings: ", error);
              }
            }
          }, 500);
        },
        openExternalBrowser: async ({ url }) => {
          try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
              await Linking.openURL(url);
            }
            return { success: true };
          } catch (e) {
            return { success: false };
          }
        },
        openAppSetting: async () => {
          if (Platform.OS === "android") {
            Linking.openSettings();
          } else {
            Linking.openURL("app-settings:");
          }
        },
        onVoiceStart: async ({ locale }) => {
          const handleVocalStatusChange = (e: VoiceStatus) => {
            set({ voiceStatus: e });
          };

          const handleVoiceChange = (e: string) => {
            set({ voiceText: e });
          };

          const handleVoiceListChange = (e: Array<string>) => {
            set({ voiceTextList: e });
          };

          startVoice({
            onVoiceListChange: handleVoiceListChange,
            onVoiceChange: handleVoiceChange,
            onVoiceStatusChange: handleVocalStatusChange,
          });
          await Voice.start(locale, {});
          //
        },
        onVoiceCancel: async () => {
          await Voice.cancel();
        },
        onVoiceDestroy: async () => {
          destroyVoice();
          await Voice.destroy();
        },
        haptic: async ({ type }) => {
          trigger(type, {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
        },
      })),
    [],
  );

  const { WebView: CustomWebView } = useMemo(
    () =>
      createWebView({
        bridge: appBridge,
        debug: true,
        fallback: (method) => {
          console.warn(`Method '${method}' not found in native`);
        },
      }),
    [appBridge],
  );

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleAndroidBackPress,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: safeAreaColor }]}
        edges={["top", "left", "right"]}
      >
        <Button title={"test"} />
        <CustomWebView
          ref={webviewRef}
          source={{
            uri: "http://172.30.1.53:3000/",
          }}
          style={{
            height: "100%",
            flex: 1,
            width: "100%",
          }}
          javaScriptEnabled
          domStorageEnabled
          allowsBackForwardNavigationGestures
          originWhitelist={["*"]}
          scalesPageToFit
          onError={handleError}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("HTTP 에러 발생: ", nativeEvent);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // 글로벌 배경색
  },
});

export default RootLayout;
