import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

import type { MiddlewareFactory } from './types';

export const withI18n: MiddlewareFactory = () => {
  return createMiddleware(routing);
};
