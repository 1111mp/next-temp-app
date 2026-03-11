import { notFound } from 'next/navigation';
import { Geist } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { TRPCReactProvider } from '@/trpc/react';
import { ThemeProvider } from '@/app/theme-provider';
import { Toaster } from '@/components/ui';
import { routing } from '@/i18n/routing';

import type { Metadata } from 'next';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>,
): Promise<Metadata> {
  const { locale } = await props.params;

  const t = await getTranslations({ locale });

  return {
    title: t('title'),
    description: t('description'),
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className='h-full' suppressHydrationWarning>
      <body className={`h-full ${geist.variable}`}>
        <TRPCReactProvider>
          <ThemeProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </TRPCReactProvider>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
