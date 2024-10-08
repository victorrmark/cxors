import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // '/((?!_next/static|_next/image|favicon.ico|signup|login|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/((?!_next/static|_next/image|favicon.ico|signup|login|resetpassword|forgotpassword|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',

  ],
}