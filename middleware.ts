import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.has("userId");

  const authRequiredPaths = [
    "/home",
    "/feed",
    "/add",
    "/like",
    "/profile",
    "/chat",
  ];

  const isAuthRequired = authRequiredPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isAuthRequired && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
