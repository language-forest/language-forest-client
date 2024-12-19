import { TIME_MS, TIME_S } from "./time";

const accessTokenMaxAge = TIME_MS["1일"];

export const authInfo = {
  accessToken: "accessToken",
  accessTokenMaxAge,
  refreshToken: "refreshToken",
  refreshTokenMaxAge: accessTokenMaxAge * 14,
  accessTokenLastCheckExpiresAt: "lastCheckAt",
  accessTokenLastCheckExpiresAtTriggerTime: accessTokenMaxAge / 2,
} as const;
