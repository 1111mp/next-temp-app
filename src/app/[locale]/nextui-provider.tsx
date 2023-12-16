"use client";

import { NextUIProvider as UIProvider } from "@nextui-org/system";
import { useRouter } from "@/navigation";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return <UIProvider navigate={router.push}>{children}</UIProvider>;
}
