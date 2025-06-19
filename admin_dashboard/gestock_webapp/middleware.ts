import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// TODO : ADD THE "/" BEFORE THE PROTECTED ROUTES
const protectedRoutes = ["/","/protected","/chat"];

export default async function middleware(req: NextRequest) {
  // const session = await auth();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  

  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};