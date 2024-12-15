import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { TRPCReactProvider } from '@/trpc/react';
import { ThemeProvider } from '@/app/theme-provider';
import { Toaster } from '@/components/ui';

type Props = {
  readonly children: React.ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return (
    <html className='h-full w-full' suppressHydrationWarning>
      <body
        className={`flex h-full w-full flex-col font-sans ${GeistSans.variable}`}
      >
        <TRPCReactProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TRPCReactProvider>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
