import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authInfo } from "@repo/shared/constant";
import { loginPath } from "@/router";
import { authRefresh } from "@repo/language-forest-api";

const AUTH_FREE_ROUTES = [
  /^\/$/,
  /^\/login(\/.*)?$/,
  /^\/api\/.*$/,
  /^\/auth\/.*$/,
];

// 인증이 필요 없는 경로인지 확인
function isAuthFreeRoute(pathname: string): boolean {
  return AUTH_FREE_ROUTES.some((pattern) => pattern.test(pathname));
}

// 세션 만료 여부 확인
function isSessionExpired(lastCheckedExpiresAt?: string): boolean {
  if (!lastCheckedExpiresAt) return true;
  // 문자열을 숫자로 변환
  const parsedLastCheckedExpiresAt = parseInt(lastCheckedExpiresAt, 10);

  // 변환 실패 시 true 반환
  if (isNaN(parsedLastCheckedExpiresAt)) return true;
  const now = Date.now();

  return now >= parsedLastCheckedExpiresAt;
}

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // 인증이 필요 없는 경로인지 확인
  if (isAuthFreeRoute(currentPath)) {
    return NextResponse.next();
  }

  // 세션 및 토큰 확인
  const refreshToken = request.cookies.get(authInfo.refreshToken)?.value;

  const lastCheckExpiresAt = request.cookies.get(
    authInfo.accessTokenLastCheckExpiresAt,
  )?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  if (isSessionExpired(lastCheckExpiresAt)) {
    try {
      // Refresh Token으로 새로운 Access Token 요청
      const response = await authRefresh({ refreshToken });

      const res = NextResponse.next();
      res.cookies.set(authInfo.accessToken, response.accessToken, {
        maxAge: authInfo.accessTokenMaxAge,
      });
      if (!response.refreshToken) {
        return res;
      }
      res.cookies.set(authInfo.refreshToken, response.refreshToken, {
        maxAge: authInfo.refreshTokenMaxAge,
      });
      res.cookies.set(
        authInfo.accessTokenLastCheckExpiresAt,
        String(Date.now() + authInfo.accessTokenLastCheckExpiresAtTriggerTime),
        { maxAge: authInfo.accessTokenMaxAge },
      );
      return res;
    } catch (error) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
  }

  // 세션 유효, 다음 요청으로 진행
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
