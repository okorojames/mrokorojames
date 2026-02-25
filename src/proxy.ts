import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest, res: NextResponse) {
  const isAuth = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;
  const restrictedPages = ["/add-project", "/projects"];
  if (!isAuth && restrictedPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuth && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon1.png).*)",
  ],
};
