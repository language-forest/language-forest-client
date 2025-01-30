import {
  LFPageWrapper,
  LFFillButton,
  LFHeader,
  LFHeaderGoBack,
  LFText,
  VStack,
} from "@/component/design-system";
import { useVoiceRecognize } from "@/util/voiceRecognize";
import { LanguageEnum } from "@repo/language-forest-api";

const Voice = () => {
  const {
    voiceStatus,
    onVoiceStart,
    onVoiceDestroy,
    onVoiceCancel,
    voiceText,
  } = useVoiceRecognize({ locale: LanguageEnum.KO });

  return (
    <LFPageWrapper>
      <LFHeader left={<LFHeaderGoBack />} />

      <VStack>
        <LFFillButton type={"Green"} onClick={() => {}}>
          check
        </LFFillButton>

        <LFFillButton
          type={"Green"}
          onClick={() => {
            onVoiceStart();
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
            voiceStatus:
            <LFText>{voiceStatus}</LFText>
          </VStack>
        </VStack>
      </VStack>
    </LFPageWrapper>
  );
};

export default Voice;
