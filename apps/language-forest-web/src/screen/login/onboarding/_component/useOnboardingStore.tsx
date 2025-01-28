import {
  createUser,
  UpdateUser,
  UpdateUserInfo,
  CreateUserStudyInfo,
  CreateUserNotification,
} from "@repo/language-forest-api";
import { create } from "zustand";

// Zustand 상태와 동작 정의
interface UseOnboardingStore {
  index: number;
  user: UpdateUser | null;
  userInfo: UpdateUserInfo | null;
  userStudyInfo: CreateUserStudyInfo | null;
  userNotification: CreateUserNotification | null;
  onMoveNext: () => void;
  onMovePrev: () => void;
  onSkip: () => void;
  updateUser: (user: Partial<UpdateUser>) => void;
  updateUserInfo: (userInfo: Partial<UpdateUserInfo>) => void;
  updateUserStudyInfo: (user: Partial<CreateUserStudyInfo>) => void;
  updateUserNotification: (user: Partial<CreateUserNotification>) => void;

  fetchCreateUser: () => Promise<void>;
}

// Zustand 스토어 생성
export const useOnboardingStore = create<UseOnboardingStore>((set, get) => {
  return {
    index: 0,
    user: null,
    userInfo: null,
    userStudyInfo: null,
    userNotification: null,
    onMoveNext: () => {
      const nextIndex = get().index + 1;

      set({ index: nextIndex });
    },
    onMovePrev: () => {
      const nextIndex = Math.max(get().index - 1, 0);
      set({ index: nextIndex });
    },

    onSkip: () => {
      set({ index: 13 });
    },

    updateUser: (_user) => {
      const user = _user as UpdateUser;
      set({
        user: {
          ...get().user,
          ...user,
        },
      });
    },

    updateUserInfo: (_user) => {
      const userInfo = _user as UpdateUserInfo;
      set({
        userInfo: {
          ...get().userInfo,
          ...userInfo,
        },
      });
    },
    updateUserStudyInfo: (_user) => {
      const userStudyInfo = _user as CreateUserStudyInfo;
      set({
        userStudyInfo: {
          ...get().userStudyInfo,
          ...userStudyInfo,
        },
      });
    },
    updateUserNotification: (_user) => {
      const userNotification = _user as CreateUserNotification;
      set({
        userNotification: {
          ...get().userNotification,
          ...userNotification,
        },
      });
    },

    fetchCreateUser: async () => {
      const userNotification = get().userNotification;
      const user = get().user;
      const userStudyInfo = get().userStudyInfo;
      const userInfo = get().userInfo;
      if (!(userNotification && user && userInfo && userStudyInfo)) {
        return;
      }

      await createUser({
        userNotification,
        user,
        userStudyInfo,
        userInfo,
      });
      return;
    },
  };
});
