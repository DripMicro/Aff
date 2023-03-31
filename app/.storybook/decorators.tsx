import "../src/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import i18n from "./i18next.js";
import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import "../src/utils/zod-meta";

// Wrap your stories in the I18nextProvider component
// export decorators for storybook to wrap your stories in

export const withI18next = (Story) => {
  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <TooltipProvider>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </TooltipProvider>
    </Suspense>
  );
};
