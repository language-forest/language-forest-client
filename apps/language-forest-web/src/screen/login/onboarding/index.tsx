import { ReactNode, useMemo, useState } from "react";
import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import { Intro } from "./_component/Intro";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import { Nickname } from "./_component/Nickname.tsx";
import { SelectLanguage } from "./_component/SelectLanguage.tsx";
import { QuestionAnnounce } from "./_component/QuestionAnnounce.tsx";
import { Gender } from "./_component/Gender.tsx";
import { BirthOfYear } from "./_component/BirthOfYear.tsx";
import { Occupation } from "./_component/Occupation.tsx";
import { Interest } from "./_component/Interest.tsx";
import { Level } from "./_component/Level.tsx";
import { Purpose } from "./_component/Purpose.tsx";
import { AnotherLanguage } from "./_component/AnotherLanguage.tsx";
import { StudyPlace } from "./_component/StudyPlace.tsx";
import { MBTI } from "./_component/MBTI.tsx";
import { SetPushTime } from "./_component/SetPushTime.tsx";
import { SetPushNotification } from "./_component/SetPushNotification.tsx";
import { useAsyncEffect } from "@/hook/useAsyncEffect.ts";
import { useUserStore } from "@/store/useUserStore.ts";

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
    key: "MBTI",
    Component: <MBTI />,
  },
  {
    index: 13,
    key: "setPushTime",
    Component: <SetPushTime />,
  },
  {
    index: 14,
    key: "setPushNotification",
    Component: <SetPushNotification />,
  },
] as const;

const LoginOnboarding = () => {
  const index = useOnboardingStore((state) => state.index);
  const fetchCreateUser = useOnboardingStore((state) => state.fetchCreateUser);
  const reFetchUser = useUserStore((state) => state.reFetch);
  const { replace } = useLFNavigate();

  const [componentIndex, setComponentIndex] = useState(0);

  const TargetComponent = useMemo(
    () => funnel[componentIndex].Component,
    [componentIndex],
  );

  useAsyncEffect(async () => {
    if (index > funnel.length - 1) {
      await fetchCreateUser();

      await reFetchUser();
      replace("/");
      return;
    }

    setComponentIndex(index);
  }, [index]);

  return <>{TargetComponent}</>;
};

export default LoginOnboarding;
