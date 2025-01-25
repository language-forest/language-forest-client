import { LFTextButton } from "@/component/design-system/Button/LFTextButton.tsx";
import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";

export const SkipProgress = () => {
  const { onSkip } = useOnboardingStore();

  return <LFTextButton onClick={onSkip}>건너뛰기</LFTextButton>;
};
