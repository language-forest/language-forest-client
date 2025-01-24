import { ReactNode, useEffect, useMemo } from "react";
import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import { Intro } from "./_component/Intro";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { Nickname } from "./_component/Nickname.tsx";
import { SelectLanguage } from "./_component/SelectLanguage.tsx";
import { QuestionAnnounce } from "./_component/QuestionAnnounce.tsx";
import { Gender } from "./_component/Gender.tsx";
import { BirthOfYear } from "@/screen/login/onboarding/_component/BirthOfYear.tsx";
import { Occupation } from "@/screen/login/onboarding/_component/Occupation.tsx";
import { Interest } from "@/screen/login/onboarding/_component/Interest.tsx";
import { Level } from "@/screen/login/onboarding/_component/Level.tsx";
import { Purpose } from "@/screen/login/onboarding/_component/Purpose.tsx";
import { AnotherLanguage } from "@/screen/login/onboarding/_component/AnotherLanguage.tsx";
import { StudyPlace } from "@/screen/login/onboarding/_component/StudyPlace.tsx";

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
    index: 2,
    key: "selectLanguage",
    Component: <SelectLanguage />,
  },
  {
    index: 3,
    key: "questionAnnounce",
    Component: <QuestionAnnounce />,
  },
  {
    index: 4,
    key: "gender",
    Component: <Gender />,
  },

  {
    index: 5,
    key: "birthOfYear",
    Component: <BirthOfYear />,
  },
  {
    index: 6,
    key: "occupation",
    Component: <Occupation />,
  },
  {
    index: 7,
    key: "interest",
    Component: <Interest />,
  },
  {
    index: 8,
    key: "level",
    Component: <Level />,
  },
  {
    index: 9,
    key: "purpose",
    Component: <Purpose />,
  },
  {
    index: 10,
    key: "anotherLanguage",
    Component: <AnotherLanguage />,
  },
  {
    index: 11,
    key: "studyPlace",
    Component: <StudyPlace />,
  },
  {
    index: 12,
    key: "",
    Component: <AnotherLanguage />,
  },
] as const;

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
