import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { TRPCReactProvider } from "@/trpc/react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "Index" });

  return {
    title: t("title"),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
