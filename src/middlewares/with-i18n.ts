import createMiddleware from "next-intl/middleware";
import { pathnames, locales } from "@/config";

import type { MiddlewareFactory } from "./types";

export const withI18n: MiddlewareFactory = () => {
  return createMiddleware({
    defaultLocale: "en",
    locales,
    pathnames,
    localePrefix: "as-needed",
  });
};
