import withNextIntl from "next-intl/plugin";
// @ts-ignore
// import nextBuildId from "next-build-id";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  // generateBuildId: () => nextBuildId({ dir: __dirname, describe: true }),
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl()(config);
