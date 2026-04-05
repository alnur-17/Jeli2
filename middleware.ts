import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect /app/* routes
  if (!pathname.startsWith("/app/")) {
    return NextResponse.next();
  }

  // Look for any Supabase auth-token cookie (chunked or not)
  const cookies = request.cookies.getAll();
  const hasSession = cookies.some(
    (c) =>
      (c.name.includes("-auth-token") || c.name.includes("sb-")) &&
      c.value.length > 0
  );

  if (!hasSession) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
