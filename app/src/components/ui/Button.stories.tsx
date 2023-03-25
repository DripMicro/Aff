import { Button } from "./button";

const meta = {
  component: Button,
};

export default meta;

export const Primary = {
  args: { variant: "primary", children: "Button" },
};

export const Default = {
  args: { ...Primary.args, variant: "default" },
};

export const Loading = {
  args: { ...Primary.args, isLoading: true },
};
