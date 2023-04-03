import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

import { Button } from "./button";

const Dialogs = () => (
  <div className="flex flex-col items-start gap-8">
    <Dialog>
      <DialogTrigger>
        <Button variant="primary">Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Dialog Header</DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Dialog Description</DialogDescription>
        <DialogFooter>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);

const meta = {
  component: Dialogs,
};

export default meta;

export const Primary = {
  render: (args: any) => {
    return (
      <div className="mt-4 flex">
        <Dialogs />
      </div>
    );
  },
};
