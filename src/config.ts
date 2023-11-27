import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "zh_cn"] as const;

export const pathnames = {
  "/": "/",
  "/login": "/login",
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
