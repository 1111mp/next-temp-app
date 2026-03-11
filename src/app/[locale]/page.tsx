import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Navbar } from '@/components/navbar';
import { LatestPost } from '@/components/post';
import { api, HydrateClient } from '@/trpc/server';
import { getSession } from '@/server/better-auth/server';

export default function IndexPage({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale);

  const session = use(getSession());

  const t = useTranslations('IndexPage');

  if (session) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      {/* https://github.com/vercel/next.js/issues/49427 */}
      <div />
      <Navbar user={session?.user} />
      <main className='mx-auto flex max-w-md flex-1 flex-col px-4'>
        <div className='flex-1'>
          <h1>{t('title')}</h1>
          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}
