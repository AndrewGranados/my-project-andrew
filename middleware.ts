/*
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request : NextRequest){
  const userId = request.cookies.get("userId")?.value;

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if(isDashboard && !userId){
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
}
  */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;
  const pathname = request.nextUrl.pathname;

  // Evitar interferir con recursos internos
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard") && !userId) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
