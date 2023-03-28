import "../src/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import i18n from "./i18next.js";
import { Preview } from "@storybook/react";
import { withI18next } from "./decorators";

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: "en",
  locales: {
    en: "English",
    he: "Hebrew",
    zz: "Keys",
  },
};

const decorators = [withI18next];

const preview = {
  parameters: parameters,
  decorators: decorators,
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "he", title: "Hebrew" },
          { value: "zz", title: "Keys" },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
