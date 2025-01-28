import { TIME_MS } from "../../constant";

const accessTokenMaxAge = TIME_MS["1일"];

export const AuthKey = {
  accessToken: "accessToken",
  accessTokenMaxAge,
  refreshToken: "refreshToken",
  refreshTokenMaxAge: accessTokenMaxAge * 14,
  accessTokenLastCheckExpiresAt: "lastCheckAt",
  accessTokenLastCheckExpiresAtTriggerTime: accessTokenMaxAge / 2,
} as const;
