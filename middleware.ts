import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        try {
            const base64Payload = token.split('.')[1]
            const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString('utf-8'))
            
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}