import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
    '/sign-in',
    '/forgot-password',
    '/auth/callback',
    '/favicon.ico',
    '/logo',
    '/_next',
    '/api'
]

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname === '/') {
        const url = req.nextUrl.clone()
        url.pathname = '/sign-in'
        return NextResponse.redirect(url)
    }

    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!.*\\.).*)'],
}
