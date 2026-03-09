import { stackMiddlewares } from '@/proxys/stack';
import { withAuthorization, withI18n } from '@/proxys';

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next/static|_next|_vercel|.*\\..*).*)',
};

export const proxy = stackMiddlewares([withAuthorization, withI18n]);
