import {
  LFHeader,
  LFHeaderGoBack,
  LFHeaderTitle,
  VStack,
} from "@/component/design-system";
import { LFHeaderETC } from "@/component/design-system/Header/LFHeaderETC.tsx";
import { useUserStore } from "@/store/useUserStore.ts";
import {
  LFMenu,
  LFMenuItem,
  LFMenuItems,
} from "@/component/design-system/Select/LFMenu.tsx";
import { LevelEnum, updateUser } from "@repo/language-forest-api";
import { levelEnumTransformer } from "@repo/shared/util";
import { useState } from "react";

export const StudyHeader = () => {
  const userStudyInfo = useUserStore((store) => store.userStudyInfo);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<LevelEnum | undefined>(
    userStudyInfo?.level,
  );

  const [selectedSentence, setSelectedSentence] = useState<string | undefined>(
    userStudyInfo ? String(userStudyInfo?.sentenceAmount) : undefined,
  );

  const handleItemChange = (e: LFMenuItem) => {
    if (e.key === "level") {
      setSelectedLevel(e.value as LevelEnum);
    } else if (e.key === "sentence") {
      setSelectedSentence(e.value as string);
    }
  };

  const settingItems: LFMenuItems = [
    {
      title: "난이도",
      items: [
        {
          label: levelEnumTransformer(LevelEnum.A),
          value: LevelEnum.A,
          key: "level",
        },
        {
          label: levelEnumTransformer(LevelEnum.B),
          value: LevelEnum.B,
          key: "level",
        },
        {
          label: levelEnumTransformer(LevelEnum.C),
          value: LevelEnum.C,
          key: "level",
        },
        {
          label: levelEnumTransformer(LevelEnum.D),
          value: LevelEnum.D,
          key: "level",
        },
        {
          label: levelEnumTransformer(LevelEnum.E),
          value: LevelEnum.E,
          key: "level",
        },
      ],
      selectedItem: selectedLevel
        ? {
            label: levelEnumTransformer(selectedLevel),
            value: selectedLevel,
            key: "level",
          }
        : undefined,
    },

    {
      title: "학습 문장 수 ",
      items: [
        { label: "1 문장", value: "1", key: "sentence" },
        { label: "3 문장", value: "3", key: "sentence" },
        { label: "5 문장", value: "5", key: "sentence" },
      ],
      selectedItem: selectedSentence
        ? {
            label: `${selectedSentence} 문장`,
            value: String(selectedSentence),
            key: "sentence",
          }
        : undefined,
    },
  ];

  const handleETCClick = () => {
    setShowSettings((prev) => !prev);
  };

  const handleClose = async () => {
    setShowSettings((prev) => !prev);
    if (!userStudyInfo) {
      return;
    }

    await updateUser({
      userStudyInfo: {
        id: userStudyInfo?.id,
        sentenceAmount: selectedSentence ? Number(selectedSentence) : undefined,
        level: selectedLevel,
      },
    });
  };

  return (
    <LFHeader
      left={<LFHeaderGoBack />}
      center={<LFHeaderTitle title={"오늘의 표현"} />}
      right={
        <VStack width={40}>
          <LFHeaderETC onClick={handleETCClick} />
          <LFMenu
            show={showSettings}
            title={"학습 설정"}
            items={settingItems}
            onChange={handleItemChange}
            onClose={handleClose}
            containerStyle={{
              top: 60,
              right: 0,
              width: "120px",
            }}
          />
        </VStack>
      }
    />
  );
};
