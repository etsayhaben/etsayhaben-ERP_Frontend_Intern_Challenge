// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest)  {
  const path = request.nextUrl.pathname;
  
  // Public paths (no auth required)
  const publicPaths = ['/login', '/_next', '/favicon.ico'];
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Check authentication from cookie or localStorage (we'll use a cookie)
  const authCookie = request.cookies.get('auth_user')?.value;
  const isAuthenticated = authCookie === 'admin' || authCookie === 'hr';

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based restrictions
  const isAdminPath = path.startsWith('/hr/admin');
  const isHrPath = path.startsWith('/hr/hr-staff');

  if (isAdminPath && authCookie !== 'admin') {
  // ❌ HR tries to go to /hr/admin → Redirected to HR page
  return NextResponse.redirect(new URL('/hr/hr-staff/employees', request.url));
}
  if (isHrPath && authCookie !== 'hr') {
    // Admin trying to access HR page → redirect to Admin page
    return NextResponse.redirect(new URL('/hr/admin', request.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};