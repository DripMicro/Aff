import { Badge } from "./badge";

const meta = {
  component: Badge,
};

export default meta;

export const red = { render: () => <Badge variant="red">Red</Badge> };
export const green = { render: () => <Badge variant="green">Green</Badge> };
