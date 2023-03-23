// @ts-check
import { i18nConfig } from "./next-i18next.config.mjs";
import { withSentryConfig } from "@sentry/nextjs";
import { withContentlayer } from "next-contentlayer";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: i18nConfig.i18n /*{
    locales: ["en"],
    defaultLocale: "en",
  },*/,
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  // debug: true,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.

  authToken: "d8bf21c6d4d344019e15bb6cc00d27950ba5b88c7154454d95f3c07a71e08130",
};

export default withContentlayer(
  withSentryConfig(config, sentryWebpackPluginOptions)
);
