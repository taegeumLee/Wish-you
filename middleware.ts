import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/api/login", "/api/register", "/api/check-email"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트 예외 처리
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.has("userId");

  // 인증이 필요한 경로들
  const authRequiredPaths = [
    "/home",
    "/feed",
    "/add",
    "/like",
    "/profile",
    "/chat",
  ];

  // 현재 경로가 인증이 필요한 경로인지 확인
  const isAuthRequired = authRequiredPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 인증이 필요한 경로인데 인증되지 않은 경우
  if (isAuthRequired && !isAuthenticated) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  // 이미 인증된 사용자가 로그인 페이지로 접근하는 경우
  if (isAuthenticated && pathname === "/") {
    const url = new URL("/home", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
