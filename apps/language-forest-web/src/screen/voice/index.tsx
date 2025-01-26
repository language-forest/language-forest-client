import {
  GlobalContainer,
  LFFillButton,
  LFHeader,
  LFHeaderGoBack,
  LFText,
  VStack,
} from "@/component/design-system";
import { useBridge } from "@webview-bridge/react";
import { bridge } from "@/util/webview.ts";
import { HapticFeedbackTypes } from "@repo/shared/webview";

const Voice = () => {
  const {
    onVoiceStart,
    onVoiceDestroy,
    onVoiceCancel,
    voiceText,
    voiceTextList,
    voiceStatus,
    haptic,
  } = useBridge(bridge.store);

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack />} />

      <VStack>
        <LFFillButton
          type={"Green"}
          onClick={() => {
            haptic({ type: HapticFeedbackTypes.clockTick });
          }}
        >
          onVoiceStart
        </LFFillButton>

        <LFFillButton
          type={"Green"}
          onClick={() => {
            onVoiceStart({ locale: "ko-KR" });
          }}
        >
          onVoiceStart
        </LFFillButton>
        <LFFillButton type={"Green"} onClick={onVoiceCancel}>
          onVoiceCancel
        </LFFillButton>

        <LFFillButton type={"Green"} onClick={onVoiceDestroy}>
          onVoiceDestroy
        </LFFillButton>

        <VStack style={{ gap: 12 }}>
          <VStack>
            text:
            <LFText>{voiceText}</LFText>
          </VStack>

          <VStack>
            textList:
            {voiceTextList.map((item) => {
              return <LFText>{item}</LFText>;
            })}
          </VStack>

          <VStack>
            voiceStatus:
            <LFText>{voiceStatus}</LFText>
          </VStack>
        </VStack>
      </VStack>
    </GlobalContainer>
  );
};

export default Voice;
