const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true,
      },
    },
    // "@storybook/addon-mdx-gfm",
    "@tomfreudenberg/next-auth-mock/storybook",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];

    // https://github.com/i18next/next-i18next/issues/935
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-i18next": "react-i18next",
    };

    return config;
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ["../public"],
  typescript: { reactDocgen: "react-docgen" },
};
