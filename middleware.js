import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' https://challenges.cloudflare.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://openrouter.ai; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'")

  return response
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
