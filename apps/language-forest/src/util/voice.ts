import { VoiceStatus } from "@repo/shared/webview";
import Voice from "@react-native-voice/voice";

type StartVoiceParams = {
  onVoiceStatusChange: (e: VoiceStatus) => void;
  onVoiceChange: (e: string) => void;
  onVoiceListChange: (e: Array<string>) => void;
};

export const startVoice = ({
  onVoiceListChange,
  onVoiceStatusChange,
  onVoiceChange,
}: StartVoiceParams) => {
  Voice.onSpeechStart = () => {
    onVoiceStatusChange("start");
  };

  Voice.onSpeechRecognized = (e) => {
    if (!e.isFinal) {
      return;
    }

    onVoiceStatusChange("finish");
  };

  Voice.onSpeechEnd = (e) => {
    onVoiceStatusChange("finish");
  };

  Voice.onSpeechError = (e) => {
    onVoiceStatusChange("error");
  };

  Voice.onSpeechResults = (e) => {
    const voice = e.value?.[0];
    if (!voice) {
      return;
    }
    onVoiceChange(voice);
  };

  Voice.onSpeechPartialResults = (e) => {
    const voiceList = e.value;
    if (!voiceList) {
      return;
    }
    onVoiceListChange(voiceList);
  };
};

export const destroyVoice = () => {
  Voice.destroy().then(Voice.removeAllListeners);
};
