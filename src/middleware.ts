import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware: Studio Route Protection
 * 
 * Protects /studio routes with Basic Authentication.
 * This adds a network-level gate BEFORE Sanity's own auth.
 * 
 * For production, set environment variables:
 *   STUDIO_AUTH_USER=your_admin_username
 *   STUDIO_AUTH_PASS=your_secure_password
 * 
 * Defense in depth: This + Sanity MFA/SSO = two layers of protection.
 */
export function middleware(request: NextRequest) {
  // Only protect /studio routes
  if (!request.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // Skip auth check in development for convenience
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  const authUser = process.env.STUDIO_AUTH_USER
  const authPass = process.env.STUDIO_AUTH_PASS

  // If no auth credentials configured, allow access (with warning in logs)
  if (!authUser || !authPass) {
    console.warn('[Security] STUDIO_AUTH_USER/PASS not configured. /studio is unprotected.')
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const [user, pass] = decoded.split(':')
      
      if (user === authUser && pass === authPass) {
        return NextResponse.next()
      }
    }
  }

  // Request authentication
  return new NextResponse('Authentication required for Sanity Studio', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sanity Studio", charset="UTF-8"',
    },
  })
}

export const config = {
  matcher: '/studio/:path*',
}
