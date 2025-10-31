import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

import type { ProxyFactory } from './types';

export const withI18n: ProxyFactory = () => {
  return createMiddleware(routing);
};
