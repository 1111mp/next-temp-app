import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales, pathnames } from "./config";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation<typeof locales, Record<string, string>>({
    locales,
    pathnames,
  });
