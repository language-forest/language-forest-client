"use client";

import { useRef, useState } from "react";

const AudioPage = () => {
  const [inputText, setInputText] = useState("");
  const recognitionRef = useRef<any | null>(null);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("이 환경에서는 Web Speech API를 지원하지 않습니다.");
    } else {
      console.log("Web Speech API를 사용할 수 있습니다.");
    }

    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR"; // 한국어 설정
    recognition.interimResults = true; // 중간 결과 표시
    recognition.continuous = true; // 연속 음성 인식

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      console.log("현재 텍스트:", transcript);
      setInputText(transcript); // 실시간으로 텍스트 업데이트
    };

    recognition.onerror = (error: any) => {
      console.error("오류 발생:", error);
    };

    recognition.onend = () => {
      if (isListening) {
        console.log("음성 인식이 종료되었으나 다시 시작합니다...");
        recognition.start(); // 자동 재시작
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
    console.log("음성 인식을 시작합니다.");
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    console.log("음성 인식을 종료합니다.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Speech App</h1>
      <textarea
        rows={5}
        cols={50}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="음성 인식 결과가 여기에 표시됩니다."
      />
      <div style={{ marginTop: "10px" }}>
        {!isListening ? (
          <button onClick={startListening} style={{ padding: "10px 20px" }}>
            음성 인식 시작
          </button>
        ) : (
          <button onClick={stopListening} style={{ padding: "10px 20px" }}>
            음성 인식 종료
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioPage;
