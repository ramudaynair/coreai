import { NextRequest, NextResponse } from "next/server";

const validSections = new Set(["about", "services", "gallery", "team", "contact"]);

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/") {
    const section = searchParams.get("section") ?? "";
    if (validSections.has(section)) {
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
