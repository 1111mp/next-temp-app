import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/navbar";
import { CreatePost } from "@/components/create-post";

import { api } from "@/trpc/server";
import { locales } from "@/config";
import { getServerActionSession } from "@/lib/session";

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = await getTranslations("Index");
  //
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  const session = await getServerActionSession();

  return (
    <>
      {/* https://github.com/vercel/next.js/issues/49427 */}
      <div></div>
      <Navbar user={session.user!} />
      <div className="m-auto max-w-screen-xl px-6">
        <h1>{t("title")}</h1>
        <CrudShowcase />
      </div>
    </>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest().catch((err) => {
    console.log("err===>>>", err);
  });
  console.log("latestPost", latestPost);

  return (
    <div className="showcaseContainer">
      {latestPost ? (
        <p className="showcaseText">Your most recent post: {latestPost.name}</p>
      ) : (
        <p className="showcaseText">You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
