import "@/styles/globals.css";

import { headers } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/app/theme-provider";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning className="h-full w-full">
      <body className="h-full w-full">
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider>{children}</ThemeProvider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
