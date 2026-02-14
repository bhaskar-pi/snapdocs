import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
  "/templates",
  "/clients",
  "/document-requests",
];

const AUTH_ROUTES = ["/login", "/signup"];

const UN_PROTECTED_ROUTES = ["/upload-documents"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  if (UN_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!token && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/templates/:path*",
    "/clients/:path*",
    "/document-requests/:path*",
    "/upload-documents/:path*",
    "/login",
    "/signup",
  ],
};
