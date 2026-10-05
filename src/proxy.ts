import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Admin Protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // For a real app, verify a JWT or session cookie here.
    // For the prototype, we check for a specific admin cookie.
    const adminToken = request.cookies.get('growthos_admin_session');
    
    // Allow local development to bypass if needed, but in standard flow require the cookie
    if (!adminToken || adminToken.value !== 'authorized') {
      // Check if it's the login page itself
      if (request.nextUrl.pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  // 2. Demo Simulator Protection
  if (request.nextUrl.pathname.startsWith('/api/demo/scenario')) {
    if (process.env.DEMO_MODE !== 'true') {
      return NextResponse.json({ error: 'Demo mode is disabled in this environment.' }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/demo/scenario'],
};

