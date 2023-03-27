import "../src/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
// import i18n from "./i18next.js";
import React from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import "../src/utils/zod-meta";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // i18n,
  // locale: "en",
  // locales: {
  //   en: "English",
  //   he: "Hebrew",
  //   zz: "Keys",
  // },
};

// .storybook/preview.js

export const decorators = [
  (Story) => (
    <TooltipProvider>
      <Story />
    </TooltipProvider>
  ),
];
