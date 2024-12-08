import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {BridgeState} from '../util/webview';
import {useEffect, useMemo, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {Alert, BackHandler, Platform, StyleSheet} from 'react-native';
import {bridge, createWebView} from '@webview-bridge/react-native';
import {safeAreaColors} from '@repo/shared/webview';

const RootLayout = () => {
  const webviewRef = useRef<WebView>(null);
  const [safeAreaColor, setSafeAreaColor] = useState<safeAreaColors>('blue');

  const handleAndroidBackPress = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true; // 뒤로가기 이벤트 중단
    }
    return false; // 기본 뒤로가기 동작 실행
  };

  const handleError = (syntheticEvent: any) => {
    const {nativeEvent} = syntheticEvent;
    Alert.alert(
      '오류 발생',
      `웹 페이지를 불러올 수 없습니다.\n${nativeEvent.description}`,
    );
  };

  const appBridge = useMemo(
    () =>
      bridge<BridgeState>({
        postMessageHealthCheck: async ({input}) => {
          return `${input} success`;
        },
        changeSafeAreaColor: async ({color}) => {
          setSafeAreaColor(color);
        },
      }),
    [],
  );

  const {WebView: CustomWebView} = useMemo(
    () =>
      createWebView({
        bridge: appBridge,
        debug: true,
        fallback: method => {
          console.warn(`Method '${method}' not found in native`);
        },
      }),
    [appBridge],
  );

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleAndroidBackPress,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safeArea, {backgroundColor: safeAreaColor}]}
        edges={['top', 'left', 'right']}>
        <CustomWebView
          ref={webviewRef}
          source={{
            // uri: 'http://localhost:3000',
            uri: 'http://172.30.1.70:3000',
          }}
          style={{
            height: '100%',
            flex: 1,
            width: '100%',
          }}
          javaScriptEnabled
          domStorageEnabled
          allowsBackForwardNavigationGestures
          originWhitelist={['*']}
          scalesPageToFit
          onError={handleError}
          onHttpError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.error('HTTP 에러 발생: ', nativeEvent);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // 글로벌 배경색
  },
});

export default RootLayout;
