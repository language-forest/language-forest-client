/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// 1. 기본 *.svg 모듈 (문자열 URL)
declare module "*.svg" {
  const src: string;
  export default src;
}

// 2. ?component 쿼리가 붙은 *.svg 모듈 (React 컴포넌트)
declare module "*.svg?react" {
  import * as React from "react";
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}

declare global {
  interface Window {
    __VIEW_ON_LF_APP?: boolean;
    __LF_APP_PLATFORM?: "android" | "web" | "ios" | "macos" | "windows"; // 타입은 boolean으로 선언 (필요하면 변경)
  }
}

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

declare let SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

declare let webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

// Extend SpeechRecognition interfaces
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly resultIndex: number;
}

interface SpeechRecognitionResultList
  extends Iterable<SpeechRecognitionResult> {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult
  extends Iterable<SpeechRecognitionAlternative> {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI?: string;

  start(): void;
  stop(): void;
  abort(): void;

  onaudiostart?: (event: Event) => void;
  onsoundstart?: (event: Event) => void;
  onspeechstart?: (event: Event) => void;
  onspeechend?: (event: Event) => void;
  onsoundend?: (event: Event) => void;
  onaudioend?: (event: Event) => void;
  onresult?: (event: SpeechRecognitionEvent) => void;
  onnomatch?: (event: SpeechRecognitionEvent) => void;
  onerror?: (event: SpeechRecognitionEvent) => void;
  onstart?: (event: Event) => void;
  onend?: (event: Event) => void;
}
