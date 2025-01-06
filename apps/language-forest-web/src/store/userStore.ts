import { getUserInfo, UserInfoDto } from "@repo/language-forest-api";
import { create } from "zustand";

// 유저 정보를 위한 타입 정의
enum LoadingStatusEnum {
  init = "init",
  loading = "loading",
  success = "success",
  error = "error",
}

// Zustand 상태와 동작 정의
interface UserStore {
  userInfo: UserInfoDto | null;
  loadingStatus: LoadingStatusEnum; // 로딩 상태
  init: () => Promise<void>; // 유저 정보를 가져오는 함수
  reFetch: () => Promise<void>;
  clear: () => void; // 유저 정보를 초기화하는 함수
}

// Zustand 스토어 생성
export const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  loadingStatus: LoadingStatusEnum.init,

  // 유저 정보를 가져오는 함수
  init: async () => {
    try {
      // 예시: API 요청
      const userInfo = await getUserInfo();

      set({ userInfo, loadingStatus: LoadingStatusEnum.success }); // 유저 정보 업데이트 및 로딩 종료
    } catch {
      set({ loadingStatus: LoadingStatusEnum.error }); // 에러 발생 시 로딩 종료
    }
  },

  reFetch: async () => {
    set({ loadingStatus: LoadingStatusEnum.loading }); // 로딩 상태 설정
    try {
      // 예시: API 요청
      const userInfo = await getUserInfo();

      set({ userInfo, loadingStatus: LoadingStatusEnum.success }); // 유저 정보 업데이트 및 로딩 종료
    } catch (error) {
      console.error("유저 정보를 가져오는 중 에러 발생:", error);
      set({ loadingStatus: LoadingStatusEnum.error }); // 에러 발생 시 로딩 종료
    }
  },

  // 유저 정보를 초기화하는 함수
  clear: () => {
    set({ userInfo: null, loadingStatus: LoadingStatusEnum.loading });
  },
}));
