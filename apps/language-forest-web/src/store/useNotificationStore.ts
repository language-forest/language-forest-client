import {
  BaseUserNotification,
  getUserMeNotification,
  NotificationEnum,
  updateUserNotification,
  type UpdateUserNotificationBody,
} from "@repo/language-forest-api";
import { create } from "zustand";

// Zustand 상태와 동작 정의
interface UseUserStore {
  dailyStudyPushNotification?: BaseUserNotification;

  getDailyStudyPushNotification: () => Promise<void>;
  updateDailPushNotification: (
    updateUserNotification: UpdateUserNotificationBody,
  ) => Promise<void>;
}

// Zustand 스토어 생성
export const useNotificationStore = create<UseUserStore>((set) => ({
  dailyStudyPushNotification: undefined,

  getDailyStudyPushNotification: async () => {
    try {
      const response = await getUserMeNotification(
        NotificationEnum.DAILY_STUDY,
      );
      set({ dailyStudyPushNotification: response });
    } catch {
      //
    }
  },

  updateDailPushNotification: async ({ isActive, cron }) => {
    const response = await updateUserNotification(
      NotificationEnum.DAILY_STUDY,
      {
        isActive,
        cron,
      },
    );

    set({ dailyStudyPushNotification: response });
  },
}));
