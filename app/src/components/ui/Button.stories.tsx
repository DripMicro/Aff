import { Button } from "./button";

const Buttons = ({ variant }: any) => (
  <div className="flex flex-col items-start gap-8">
    <h3>Check for focus states</h3>
    <Button variant={variant}>Button {variant}</Button>
    <Button variant={variant} disabled>
      Disabled {variant}
    </Button>

    {/*<Button variant={variant} id="button-hover">*/}
    {/*  Hover State*/}
    {/*</Button>*/}
    {/*<Button variant={variant} id="button-focus">*/}
    {/*  Focus State*/}
    {/*</Button>*/}
    {/*<Button variant={variant} id="button-active">*/}
    {/*  Active State*/}
    {/*</Button>*/}

    <h3>Should be disabled and loading animation</h3>
    <Button variant={variant} isLoading={true}>
      Button
    </Button>
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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=4-3503&t=Omiw4Kd4jROxXo3N-4",
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
