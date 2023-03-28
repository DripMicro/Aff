const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    "@storybook/addon-toolbars",
    // "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true,
      },
    },
    // "@storybook/addon-mdx-gfm",
    // "storybook-addon-pseudo-states",
    "storybook-addon-designs",
    "@meza/storybook-react-i18next",
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
  refs: {
    "package-name": { disable: true },
  },
};

export default config;
