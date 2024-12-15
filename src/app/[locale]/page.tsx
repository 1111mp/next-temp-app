import { use } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { CreatePost } from '@/components/create-post';
import { api, HydrateClient } from '@/trpc/server';
import { getServerActionSession } from '@/lib/session';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('Index');
  //
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  // const session = await getServerActionSession();
  // console.log("session", session);

  return (
    <HydrateClient>
      {/* https://github.com/vercel/next.js/issues/49427 */}
      <div></div>
      <Navbar />
      <main className='flex flex-1 flex-col px-4'>
        <div className='flex-1'>
          <h1>{t('title')}</h1>
          <CrudShowcase />
        </div>
      </main>
    </HydrateClient>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest().catch((err) => {
    console.log('err===>>>', err);
  });
  console.log('latestPost', latestPost);

  return (
    <div className='showcaseContainer'>
      {latestPost ? (
        <p className='showcaseText'>Your most recent post: {latestPost.name}</p>
      ) : (
        <p className='showcaseText'>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
