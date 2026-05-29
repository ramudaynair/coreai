import { NextRequest, NextResponse } from "next/server";
import { VALID_SECTIONS } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/") {
    const section = searchParams.get("section") ?? "";
    if (VALID_SECTIONS.has(section)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${section}`;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
