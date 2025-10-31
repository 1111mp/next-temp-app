import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { api, HydrateClient } from '@/trpc/server';
import { LatestPost } from '@/components/post';
// import { getServerActionSession } from '@/lib/session';

export default function IndexPage({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('IndexPage');

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      {/* https://github.com/vercel/next.js/issues/49427 */}
      <div></div>
      <Navbar />
      <main className='flex flex-1 flex-col px-4'>
        <div className='flex-1'>
          <h1>{t('title')}</h1>
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
