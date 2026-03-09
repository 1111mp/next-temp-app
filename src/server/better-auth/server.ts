import { auth } from '.';
import { cache } from 'react';
import { headers } from 'next/headers';

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
