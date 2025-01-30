import {
  LFPageWrapper,
  LFHeader,
  LFHeaderGoBack,
  LFIcon,
  LFText,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { useAsyncEffect } from "@/hook/useAsyncEffect.ts";
import { waitTimeout } from "@/util/waitTimeout.ts";
import { useRef, useState } from "react";
import {
  MainContentContainer,
  TextContainer,
} from "@/screen/login/onboarding/_component/shared/Layout.tsx";

export const QuestionAnnounce = () => {
  useDisableScroll();
  const [innerStep, setInnerStep] = useState<"first" | "second">("first");
  const isRunBefore = useRef(false);

  const textList = {
    first: ["~님", "~에 오신것을", "환영해요"],
    second: [
      "~님께 꼭 맞는",
      "학습 환경 세팅을 위해",
      "몇 가지 질문을 드릴게요jk",
    ],
  } as const;
  const { onMoveNext, onMovePrev } = useOnboardingStore();

  useAsyncEffect(async () => {
    if (isRunBefore.current) {
      return;
    }
    isRunBefore.current = true;
    await waitTimeout(3000);
    setInnerStep("second");

    await waitTimeout(3000);
    onMoveNext();
  }, []);

  return (
    <LFPageWrapper>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />

      <MainContentContainer>
        <TextContainer>
          {textList[innerStep].map((item) => {
            return (
              <LFText
                key={item}
                variant={"title3"}
                color={"LFBlack"}
                weight={"B"}
                textAlign={"center"}
              >
                {item}
              </LFText>
            );
          })}
        </TextContainer>

        <LFIcon variant={"SooPooRy"} size={140} />
      </MainContentContainer>
    </LFPageWrapper>
  );
};
