import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "de"] as const;

export const pathnames = {
  "/": "/",
  "/login": "/login",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation<typeof locales, Record<string, string>>({
    locales,
    pathnames,
  });
