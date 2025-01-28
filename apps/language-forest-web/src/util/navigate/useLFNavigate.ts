import { useNavigate } from "react-router-dom";

export const useLFNavigate = () => {
  const navigate = useNavigate();
  return {
    push: (params: { path: PathKey }) => {
      const { path } = params;
      navigate(pathInfo[path].path);
    },
    replace: (params: { path: PathKey }) => {
      const { path } = params;
      navigate(pathInfo[path].path, { replace: true });
    },
    back: () => {
      navigate(-1);
    },
  };
};

const pathInfo = {
  home: { path: "/", params: {} },
  shop: { path: "/shop", params: {} },
  login: { path: "/login", params: {} },
  loginOnboarding: { path: "/login/onboarding", params: {} },
  notification: { path: "/notification", params: {} },
};

export type PathKey = keyof typeof pathInfo;
