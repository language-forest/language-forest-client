import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authInfo } from "@repo/shared/constant";

// 인증이 필요 없는 경로를 정규식으로 작성
const AUTH_FREE_ROUTES = [
  /^\/$/, // 홈 경로
  /^\/login(\/.*)?$/, // 로그인 경로와 하위 경로
  /^\/api\/.*$/, // API 경로
  /^\/auth\/.*$/, // 인증 관련 경로
];

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  console.log(1);
  // AUTH_FREE_ROUTES에 포함된 경로인지 검사
  const isAuthFree = AUTH_FREE_ROUTES.some((pattern) =>
    pattern.test(currentPath),
  );
  console.log(2);

  if (isAuthFree) {
    console.log(22);
    return NextResponse.next(); // 인증 검사 없이 통과
  }

  // 인증 토큰 확인
  console.log(3);
  const token = request.cookies.get(authInfo.refreshToken)?.value;

  console.log(4);
  if (!token) {
    console.log(5);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log(6);

  return NextResponse.next();
}
