// Not used in affiliate project

import React from "react";
import type { WizardControlProps } from "./useWizardFlow";
import Head from "next/head";
import { WizardForm } from "@/components/common/wizard/WizardForm";
// import { PageHeader } from "@/components/layout/page-header";
// import { Footer } from "@/components/layout/footer";

interface Props<T> {
  wizard: WizardControlProps;
  recordData: T;

  formData: any;

  handleSubmit: (data: T) => Promise<void> | void;

  // preprocessField;
}

export const WizardPage = ({
  wizard,
  handleSubmit,
  recordData,
  formData,
}: Props<any>) => {
  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*<PageHeader />*/}
      <main className="align- flex flex-col items-center gap-8">
        <WizardForm
          wizard={wizard}
          handleSubmit={handleSubmit}
          recordData={recordData}
          formData={formData}
        />
      </main>
      {/*<Footer />*/}
    </>
  );
};
