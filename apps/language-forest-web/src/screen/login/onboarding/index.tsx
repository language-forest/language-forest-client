import { ReactNode, useEffect } from "react";
import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import { Intro } from "./_component/Intro";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { Nickname } from "@/screen/login/onboarding/_component/Nickname.tsx";
import { SelectLanguage } from "@/screen/login/onboarding/_component/SelectLanguage.tsx";

const funnel: Array<{ index: number; key: string; Component: ReactNode }> = [
  {
    index: 0,
    key: "intro",
    Component: <Intro />,
  },
  {
    index: 1,
    key: "nickname",
    Component: <Nickname />,
  },
  {
    index: 1,
    key: "selectLanguage",
    Component: <SelectLanguage />,
  },
];

const LoginOnboarding = () => {
  const index = useOnboardingStore((state) => state.index);
  const { replace } = useLFNavigate();

  const TargetComponent = funnel[index].Component;

  useEffect(() => {
    if (index > funnel.length) {
      replace("/");
      return;
    }
  }, [index]);

  return <>{TargetComponent}</>;
};

export default LoginOnboarding;
