"use client";

import { useRouter } from "@/navigation";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <NextUIProvider className="h-full w-full" navigate={router.push}>
      <NextThemeProvider attribute="class">{children}</NextThemeProvider>
    </NextUIProvider>
  );
}
