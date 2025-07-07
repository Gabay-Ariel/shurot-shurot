import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIsAuth } from "./app/server/checkIsAuth";

const middleware = async (request: NextRequest) => {
  const forbiddenPaths = ["/admin/home", "/admin/storage", "/admin/setting"];
  if (!forbiddenPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    try {
      const isAuth = await checkIsAuth();
      if (isAuth) {
        return NextResponse.next();
      } else return NextResponse.redirect(new URL("/admin", request.url));
    } catch {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
};

export const config = {
  matcher: [
    "/((?!_next|\\.well-known|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

export default middleware;
