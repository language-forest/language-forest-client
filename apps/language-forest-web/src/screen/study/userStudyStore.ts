import {
  BaseStudySummary,
  CreateStudy,
  createStudy,
} from "@repo/language-forest-api";
import { create } from "zustand/index";
import { LFToast } from "@/component/design-system";

interface UseStudyStore {
  createStudy: CreateStudy | null;
  updateCreateStudyPartial: (createStudy: CreateStudy) => void;
  studySummary: BaseStudySummary | null;
  generateSummary: () => Promise<{ studyId: string }>;
}

// Zustand 스토어 생성
export const useStudyStore = create<UseStudyStore>((set, get) => {
  return {
    createStudy: null,
    updateCreateStudyPartial: (createStudy) => {
      const prevCreatStudy = get().createStudy;

      const newCreateStudy = { ...prevCreatStudy, ...createStudy };

      set({ createStudy: newCreateStudy });
    },
    studySummary: null,

    async generateSummary() {
      const createStudyParams = get().createStudy;

      if (!createStudyParams) {
        LFToast({ text: "학습을 시작할 수 없습니다.", position: "top" });

        return;
      }

      const { studyId } = await createStudy({ study: createStudyParams });

      if (!studyId) {
        LFToast({ text: "학습을 시작할 수 없습니다.", position: "top" });

        return;
      }

      return { studyId };
    },
  };
});
