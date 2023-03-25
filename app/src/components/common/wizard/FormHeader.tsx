import React from "react";
import type { WizardControlProps } from "./useWizardFlow";
import { evaluateControlCallback } from "./useWizardFlow";

export const FormHeader = (wizard: WizardControlProps) => {
  const { stepRange, step, meta, onStepBack, currentStep } = wizard;
  // console.log(`muly:FormHeader ${currentStep}:${step.meta.label}`, { meta });

  const showBack =
    typeof step.meta.showBack === "boolean" && !step.meta.showBack;

  return (
    <>
      <h1 className="text-center text-5xl font-normal">
        {evaluateControlCallback(meta.label, wizard)}
      </h1>
      <div className="relative w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-4xl font-bold">
            {evaluateControlCallback(step.meta.label, wizard)}
          </h2>
          <h3 className="text-center text-4xl font-light">
            {step.meta.placeholder || null}
          </h3>
        </div>
        {!!showBack && (
          <button
            className="absolute right-0 self-end"
            onClick={() => onStepBack()}
            disabled={currentStep === stepRange.start}
          >
            Back
          </button>
        )}
      </div>
    </>
  );
};
