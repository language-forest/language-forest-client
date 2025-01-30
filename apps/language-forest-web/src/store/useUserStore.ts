import {
  authRefresh,
  BaseUser,
  BaseUserInfo,
  BaseUserPoint,
  BaseUserStudyInfo,
  getUserMe,
  getUserMeSocial,
  updateUser,
  type UpdateUserRequest,
  UserSocialResponse,
} from "@repo/language-forest-api";
import { create } from "zustand";
import { AuthKey, cookieStore } from "@repo/shared/storage";
import { waitTimeout } from "@/util/waitTimeout.ts";

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
  user?: BaseUser;
  userInfo?: BaseUserInfo;
  userStudyInfo?: BaseUserStudyInfo;
  userPoint?: BaseUserPoint;
  userSocialInfo?: UserSocialResponse;
  loadingStatus: LoadingStatusEnum; // 로딩 상태

  checkLoginStatus: () => LoginStatusEnum;
  getIsLoggedIn: () => boolean;
  getUserSocialInfo: () => Promise<void>;
  updateUser: (updateUser: UpdateUserRequest) => Promise<void>;

  init: () => Promise<void>; // 유저 정보를 가져오는 함수
  reFetch: () => Promise<void>;
  logout: () => void; // 유저 정보를 초기화하는 함수
}

// Zustand 스토어 생성
export const useUserStore = create<UseUserStore>((set, get) => ({
  user: undefined,
  userInfo: undefined,
  userStudyInfo: undefined,
  userPoint: undefined,
  userSocialInfo: undefined,
  loadingStatus: LoadingStatusEnum.init,

  checkLoginStatus: () => {
    const refreshToken = cookieStore.get<string | null>(AuthKey.refreshToken);
    const accessToken = cookieStore.get<string | null>(AuthKey.accessToken);

    if (!(accessToken && refreshToken)) {
      return LoginStatusEnum.anonymous;
    }

    const {
      user: user,
      userStudyInfo: userStudyInfo,
      userInfo: userInfo,
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

  getUserSocialInfo: async () => {
    const userSocialInfo = await getUserMeSocial();
    set({ userSocialInfo });
  },

  updateUser: async (_updateUser) => {
    await updateUser(_updateUser);
    await waitTimeout(500);
    await get().reFetch();
  },

  // 유저 정보를 가져오는 함수
  init: async () => {
    const refreshToken = cookieStore.get<string | null>(AuthKey.refreshToken);
    const accessToken = cookieStore.get<string | null>(AuthKey.accessToken);

    if (!accessToken) {
      if (!refreshToken) {
        set({
          loadingStatus: LoadingStatusEnum.success,
        });
        return;
      }
      const newToken = await authRefresh({ refreshToken });
      cookieStore.set(AuthKey.accessToken, newToken.accessToken);
      cookieStore.set(AuthKey.refreshToken, newToken.refreshToken);
    }

    try {
      const { userInfo, user, userStudyInfo, userPoint } = await getUserMe();

      set({
        userInfo: userInfo,
        user: user,
        userStudyInfo: userStudyInfo,
        userPoint: userPoint,
        loadingStatus: LoadingStatusEnum.success,
      });
    } catch {
      set({ loadingStatus: LoadingStatusEnum.error }); // 에러 발생 시 로딩 종료
    }
  },

  reFetch: async () => {
    set({ loadingStatus: LoadingStatusEnum.loading }); // 로딩 상태 설정
    try {
      const { userInfo, user, userStudyInfo, userPoint } = await getUserMe();

      set({
        userInfo: userInfo,
        user: user,
        userStudyInfo: userStudyInfo,
        userPoint: userPoint,
        loadingStatus: LoadingStatusEnum.success,
      });
    } catch {
      set({ loadingStatus: LoadingStatusEnum.error }); // 에러 발생 시 로딩 종료
    }
  },

  // 유저 정보를 초기화하는 함수
  logout: () => {
    set({
      user: undefined,
      userInfo: undefined,
      userStudyInfo: undefined,
      userPoint: undefined,
      loadingStatus: LoadingStatusEnum.loading,
    });
    cookieStore.remove(AuthKey.accessToken);
    cookieStore.remove(AuthKey.refreshToken);
  },
}));
