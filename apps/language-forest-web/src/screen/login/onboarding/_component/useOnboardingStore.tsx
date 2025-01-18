import { CreateUserRequest } from "@repo/language-forest-api";
import { create } from "zustand";

// Zustand 상태와 동작 정의
interface UseOnboardingStore {
  index: number;
  _createUserInfo: Partial<CreateUserRequest> | null;
  onMoveNext: () => void;
  onMovePrev: () => void;
  updateNickname: (nickname: string) => void;
}

// Zustand 스토어 생성
export const useOnboardingStore = create<UseOnboardingStore>((set, get) => ({
  index: 0,
  _createUserInfo: null,
  onMoveNext: () => {
    const nextIndex = get().index + 1;
    set({ index: nextIndex });
  },
  onMovePrev: () => {
    const nextIndex = Math.min(get().index - 1);
    set({ index: nextIndex });
  },

  updateNickname: (nickname: string) => {
    set({
      _createUserInfo: {
        ...get()._createUserInfo,
        user: { ...get()._createUserInfo?.user, nickname },
      },
    });
  },

  selectLanguage: (nickname: string) => {
    set({
      _createUserInfo: {
        ...get()._createUserInfo,
        user: { ...get()._createUserInfo?.user, nickname },
      },
    });
  },
}));
