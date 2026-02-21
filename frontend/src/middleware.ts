// import { NextRequest, NextResponse } from "next/server";

// /**
//  * Routes that require authentication
//  */
// const PROTECTED_ROUTES = [
//   "/dashboard",
//   "/settings",
//   "/templates",
//   "/clients",
//   "/document-requests",
// ];

// /**
//  * Routes only accessible when NOT authenticated
//  */
// const AUTH_ROUTES = ["/login", "/signup"];

// /**
//  * Fully public routes (no auth needed)
//  */
// const PUBLIC_ROUTES = ["/upload-documents"];

// /**
//  * Utility: safer route matching
//  */
// const matchesRoute = (pathname: string, routes: string[]) =>
//   routes.some(
//     (route) => pathname === route || pathname.startsWith(`${route}/`),
//   );

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   /**
//    * Always allow fully public routes
//    */
//   if (matchesRoute(pathname, PUBLIC_ROUTES)) {
//     return NextResponse.next();
//   }

//   const isProtectedRoute = matchesRoute(pathname, PROTECTED_ROUTES);
//   const isAuthRoute = AUTH_ROUTES.includes(pathname);

//   /**
//    * Protected routes
//    *
//    * IMPORTANT:
//    * We check refreshToken, NOT accessToken.
//    * Access token may expire (refresh will fix it).
//    * If refresh token missing → user truly logged out.
//    */
//   if (isProtectedRoute) {
//     if (!refreshToken) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return NextResponse.next();
//   }

//   /**
//    * Block login/signup if already authenticated
//    */
//   if (isAuthRoute) {
//     if (refreshToken) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }

//     return NextResponse.next();
//   }

//   /**
//    * Everything else
//    */
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/settings/:path*",
//     "/templates/:path*",
//     "/clients/:path*",
//     "/document-requests/:path*",
//     "/upload-documents/:path*",
//     "/login",
//     "/signup",
//   ],
// };

/** commented out logic because not FE and BE not sharing the same domain - so refresh token will gets undefined and routing wort work */
// frontend hosted on vercel - https://snapdocs-app.vercel.app/login
// backend hosted on render - https://snapdocs-s621.onrender.com
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}
