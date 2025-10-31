import { stackMiddlewares } from '@/proxys/stack';
import { withAuthorization, withI18n } from '@/proxys';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - _vercel
     */
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|robots.txt).*)',
  ],
};

export const proxy = stackMiddlewares([withAuthorization, withI18n]);
