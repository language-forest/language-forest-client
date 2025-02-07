import { useNavigate, useLocation } from "react-router-dom";

export type PathKey = keyof typeof pathInfo;

type PathParams<T extends PathKey> = T extends keyof typeof pathInfo
  ? "buildPath" extends keyof (typeof pathInfo)[T]
    ? Parameters<(typeof pathInfo)[T]["buildPath"]>[0]
    : never
  : never;

type QueryParams = Record<string, string | number>;

interface NavigateParams<T extends PathKey> {
  path: T;
  params?: PathParams<T>;
  query?: QueryParams;
}

export const useLFNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buildPath = <T extends PathKey>(
    path: T,
    pathParams?: PathParams<T>,
    query?: QueryParams,
  ) => {
    let pathValue = pathInfo[path].path as string;

    // 동적 Path 변환
    if ("buildPath" in pathInfo[path] && pathParams) {
      pathValue = (pathInfo[path] as any).buildPath(pathParams);
    }

    // QueryString 변환
    if (query) {
      const searchParams = new URLSearchParams(
        Object.entries(query).map(([key, value]) => [key, String(value)]),
      );
      pathValue += `?${searchParams.toString()}`;
    }

    return pathValue;
  };

  const getPath = <T extends PathKey>(
    path: T,
    params?: PathParams<T>,
    query?: QueryParams,
  ) => {
    return buildPath(path, params, query);
  };

  const getParamsFromPath = <T extends PathKey>(path: T) => {
    const currentPath = location.pathname.split("/").filter(Boolean);
    const definedPath = pathInfo[path].path.split("/").filter(Boolean);

    const params: Record<string, string> = {};

    if (currentPath.length !== definedPath.length) return params;

    definedPath.forEach((segment, index) => {
      if (segment.startsWith(":")) {
        const paramName = segment.slice(1);
        params[paramName] = currentPath[index];
      }
    });

    return params;
  };

  return {
    push: <T extends PathKey>(params: NavigateParams<T>) => {
      navigate(buildPath(params.path, params.params, params.query));
    },

    replace: <T extends PathKey>(params: NavigateParams<T>) => {
      navigate(buildPath(params.path, params.params, params.query), {
        replace: true,
      });
    },

    back: () => {
      navigate(-1);
    },

    reload: () => {
      window.location.reload();
    },

    getPath,
    getParamsFromPath,
  };
};

export const pathInfo = {
  home: { path: "/" },
  shop: { path: "/shop" },
  login: { path: "/login" },
  loginOnboarding: { path: "/login/onboarding" },
  notification: { path: "/notification" },
  study: {
    path: "/study/:userStudyInfoId",
    buildPath: ({ userStudyInfoId }: { userStudyInfoId: string }) =>
      `/study/${userStudyInfoId}`,
  },
  "study/summary": {
    path: "/study/summary/:studyId",
    buildPath: ({ studyId }: { studyId: string }) =>
      `/study/summary/${studyId}`,
  },
  "study/practice": {
    path: "/study/practice/:studyPracticeId",
    buildPath: ({ studyPracticeId }: { studyPracticeId: string }) =>
      `/study/practice/${studyPracticeId}`,
  },
  setting: { path: "/setting" },
  myForest: { path: "/my-forest" },
  diary: { path: "/diary" },
  account: { path: "/account" },
} as const;
