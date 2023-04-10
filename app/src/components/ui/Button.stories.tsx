import { Button } from "./button";

const Buttons = ({ variant }: any) => (
  <div className="flex flex-col items-start gap-8">
    <h3>Check for focus states</h3>
    <Button variant={variant}>Button {variant}</Button>
    <Button variant={variant} disabled>
      Disabled {variant}
    </Button>

    <Button variant={variant} isLoading={true}>
      Button No Width Change
    </Button>
    <Button variant={variant}>Button No Width Change</Button>
  </div>
);

const meta = {
  component: Buttons,
};

export default meta;

export const Primary = {
  args: {
    variant: "primary",
    pseudo: {
      hover: ["#button-hover"],
      focus: ["#button-focus"],
      active: ["#button-active"],
    },
  },
};

export const Text = {
  args: {
    variant: "text",
    pseudo: {
      hover: ["#button-hover"],
      focus: ["#button-focus"],
      active: ["#button-active"],
    },
  },
};

export const PrimaryOutline = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: "primary-outline",
  },
};

export const Secondary = {
  ...Primary,
  args: { ...Primary.args, variant: "secondary" },
};

export const SecondaryOutline = {
  ...Primary,
  args: { ...Primary.args, variant: "secondary-outline" },
};

export const Alternate = {
  ...Primary,
  args: { ...Primary.args, variant: "alternate" },
};
