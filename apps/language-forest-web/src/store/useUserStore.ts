import {
  authRefresh,
  BaseUser,
  BaseUserInfo,
  BaseUserStudyInfo,
  getUserMe,
} from "@repo/language-forest-api";
import { create } from "zustand";
import { AuthKey, cookieStore } from "@repo/shared/storage";

export enum LoadingStatusEnum {
  init = "init",
  loading = "loading",
  success = "success",
  error = "error",
}

export enum LoginStatusEnum {
  login = "login",
  loading = "loading",
  loginWithOnboarding = "loginWithOnboarding",
  anonymous = "anonymous",
}

// Zustand 상태와 동작 정의
interface UseUserStore {
  _user: BaseUser | null;
  _userInfo: BaseUserInfo | null;
  _userStudyInfo: BaseUserStudyInfo | null;
  loadingStatus: LoadingStatusEnum; // 로딩 상태

  getUser: () => {
    user: BaseUser | null;
    userInfo: BaseUserInfo | null;
    userStudyInfo: BaseUserStudyInfo | null;
  };

  checkLoginStatus: () => LoginStatusEnum;
  getIsLoggedIn: () => boolean;

  init: () => Promise<void>; // 유저 정보를 가져오는 함수
  reFetch: () => Promise<void>;
  clear: () => void; // 유저 정보를 초기화하는 함수
}

// Zustand 스토어 생성
export const useUserStore = create<UseUserStore>((set, get) => ({
  _user: null,
  _userInfo: null,
  _userStudyInfo: null,

  loadingStatus: LoadingStatusEnum.init,

  getUser: () => {
    const {
      _user: user,
      _userInfo: userInfo,
      _userStudyInfo: userStudyInfo,
    } = get();

    return {
      user,
      userInfo,
      userStudyInfo,
    };
  },

  checkLoginStatus: () => {
    const refreshToken = cookieStore.get<string | null>(AuthKey.refreshToken);
    const accessToken = cookieStore.get<string | null>(AuthKey.accessToken);

    if (!(accessToken && refreshToken)) {
      return LoginStatusEnum.anonymous;
    }

    const {
      _user: user,
      _userStudyInfo: userStudyInfo,
      _userInfo: userInfo,
      loadingStatus,
    } = get();

    if (loadingStatus === LoadingStatusEnum.loading) {
      return LoginStatusEnum.loading;
    }

    // 온보딩 이후에 userStudyInfo와 userInfo가 결정된다.
    if (user && userStudyInfo && userInfo) {
      return LoginStatusEnum.login;
    }

    // user만 있을 경우 온보딩이 필요한 유저라고 판단한다.
    if (user) {
      return LoginStatusEnum.loginWithOnboarding;
    }

    // 여기까지 왔는데도 아무 조건도 해당 안하면 익명 유저로 판단한다.
    return LoginStatusEnum.anonymous;
  },

  getIsLoggedIn: () => get().checkLoginStatus() === LoginStatusEnum.login,

  // 유저 정보를 가져오는 함수
  init: async () => {
    const refreshToken = cookieStore.get<string | null>(AuthKey.refreshToken);
    const accessToken = cookieStore.get<string | null>(AuthKey.accessToken);

    if (!accessToken) {
      if (!refreshToken) {
        return;
      }
      const newToken = await authRefresh({ refreshToken });
      cookieStore.set(AuthKey.accessToken, newToken.accessToken);
      cookieStore.set(AuthKey.refreshToken, newToken.refreshToken);
    }

    try {
      const { userInfo, user, userStudyInfo } = await getUserMe();

      set({
        _userInfo: userInfo,
        _user: user,
        _userStudyInfo: userStudyInfo,
        loadingStatus: LoadingStatusEnum.success,
      });
    } catch {
      set({ loadingStatus: LoadingStatusEnum.error }); // 에러 발생 시 로딩 종료
    }
  },

  reFetch: async () => {
    set({ loadingStatus: LoadingStatusEnum.loading }); // 로딩 상태 설정
    try {
      const { userInfo, user, userStudyInfo } = await getUserMe();

      set({
        _userInfo: userInfo,
        _user: user,
        _userStudyInfo: userStudyInfo,
        loadingStatus: LoadingStatusEnum.success,
      });
    } catch {
      set({ loadingStatus: LoadingStatusEnum.error }); // 에러 발생 시 로딩 종료
    }
  },

  // 유저 정보를 초기화하는 함수
  clear: () => {
    set({
      _user: null,
      _userInfo: null,
      _userStudyInfo: null,
      loadingStatus: LoadingStatusEnum.loading,
    });
  },
}));
