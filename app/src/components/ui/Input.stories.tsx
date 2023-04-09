import { Input } from "./input";

const meta = {
  component: Input,
};

export default meta;

export const Default = { render: () => <Input /> };

// TODO: See password input
export const WithRightButton = { render: () => <Input /> };

export const WithLeftIcon = { render: () => <Input /> };

// Left side search icon, right side clear icon type="search"
export const Search = { render: () => <Input type="search" /> };
