import {
  CreateUserRequestUser,
  CreateUserRequestUserInfo,
  CreateUserRequestUserStudyInfo,
} from "@repo/language-forest-api";
import { create } from "zustand";

// Zustand 상태와 동작 정의
interface UseOnboardingStore {
  index: number;
  user: CreateUserRequestUser | null;
  userInfo: CreateUserRequestUserInfo | null;
  userStudyInfo: CreateUserRequestUserStudyInfo | null;
  onMoveNext: () => void;
  onMovePrev: () => void;
  updateUser: (user: CreateUserRequestUser) => void;
  updateUserInfo: (userInfo: CreateUserRequestUserInfo) => void;
  updateUserStudyInfo: (user: CreateUserRequestUserStudyInfo) => void;
}

// Zustand 스토어 생성
export const useOnboardingStore = create<UseOnboardingStore>((set, get) => {
  return {
    index: 7,
    user: null,
    userInfo: null,
    userStudyInfo: null,
    onMoveNext: () => {
      const nextIndex = get().index + 1;
      console.log("next index", nextIndex);

      set({ index: nextIndex });
    },
    onMovePrev: () => {
      const nextIndex = Math.max(get().index - 1, 0);
      console.log("prev index", nextIndex);
      set({ index: nextIndex });
    },

    updateUser: (_user: Partial<CreateUserRequestUser>) => {
      const user = _user as CreateUserRequestUser;
      set({
        user: {
          ...get().user,
          ...user,
        },
      });
    },

    updateUserInfo: (_user: Partial<CreateUserRequestUserInfo>) => {
      const userInfo = _user as CreateUserRequestUserInfo;
      set({
        userInfo: {
          ...get().userInfo,
          ...userInfo,
        },
      });
    },
    updateUserStudyInfo: (_user: Partial<CreateUserRequestUserInfo>) => {
      const userStudyInfo = _user as CreateUserRequestUserStudyInfo;
      set({
        userStudyInfo: {
          ...get().userStudyInfo,
          ...userStudyInfo,
        },
      });
    },
  };
});
