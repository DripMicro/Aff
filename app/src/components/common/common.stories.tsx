import { Loading } from "./Loading";
import { DateRangeSelect } from "./DateRangeSelect";
import { Dialog } from "@/components/common/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogForm as DialogFormComponent } from "@/components/common/forms/dialog-form";
import { schema } from "@/components/affiliates/profiles/Profiles";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useTranslation } from "next-i18next";

const meta = {
  component: Loading,
};

export default meta;

export const Component = {
  render: () => <Loading />,
  name: "Loading",
};

export const Test2 = {
  render: () => <DateRangeSelect />,
  name: "DateRangeSelect",
};

const SampleDialog = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button>
          <EditIcon className="mr-2 h-4 w-4" />
          Trigger
        </Button>
      }
      title="Dialog Title"
      description="Dialog Description"
    >
      Body
    </Dialog>
  );
};

export const Test3 = {
  render: () => <SampleDialog />,
  name: "Dialog",
};

export const Test4 = {
  render: () => <SampleDialog isOpen />,
  name: "Open Dialog",
};

export const DialogForm = () => {
  const { t } = useTranslation("affiliate");

  const formContext = usePrepareSchema(t, schema);
  return (
    <DialogFormComponent
      formContext={formContext}
      schema={schema}
      onSubmit={(newRec) => newRec}
      formProps={{
        trigger: (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add
          </Button>
        ),
        title: "Title",
        actionName: "Add",
      }}
    />
  );
};
