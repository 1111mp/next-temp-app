import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (
    await (locale === "en"
      ? // When using Turbopack, this will enable HMR for `en`
        import("../_locales/en.json")
      : import(`../_locales/${locale}.json`))
  ).default,
}));
