export const loginPath = "/login";

type RouterEtc = { query?: Record<string, string> } | undefined;

export const screenPath: Record<string, RouterEtc> = {
  [loginPath]: undefined,
};
