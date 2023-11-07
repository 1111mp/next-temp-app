import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { CreatePost } from "@/components/create-post";
import { api } from "@/trpc/server";
import { locales } from "@/navigation";

import styles from "./index.module.scss";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("Index");
  //
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className={styles.main}>
      <h1>{t("title")}</h1>
      <div className={styles.container}>
        {/* <div className={styles.showcaseContainer}>
          <p className={styles.showcaseText}>
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div> */}

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query().catch((err) => {
    console.log("err===>>>", err);
  });
  console.log("latestPost", latestPost);

  return (
    <div className={styles.showcaseContainer}>
      {latestPost ? (
        <p className={styles.showcaseText}>
          Your most recent post: {latestPost.name}
        </p>
      ) : (
        <p className={styles.showcaseText}>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
