import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProviders } from "@/app/theme-provider";
import { locales } from "@/config";
import { Toaster } from "react-hot-toast";

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
  const t = await getTranslations({ locale });

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className="h-full w-full">
      <body className="h-full w-full">
        <TRPCReactProvider headers={headers()}>
          <ThemeProviders>{children}</ThemeProviders>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
