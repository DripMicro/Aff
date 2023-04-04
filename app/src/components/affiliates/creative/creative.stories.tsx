import { CreativeMaterialComponent } from "./CreativeMaterialComponent";

const meta = {
  component: CreativeMaterialComponent,
};

export default meta;

const values = [
  { title: "Creative Name", value: "Logo_1" },
  { title: "Type", value: "image" },
  {
    title: "Promotion",
    value: "0",
  },
  {
    title: "Category",
    value: "Logos",
  },
  { title: "Size (WxH)", value: `301x93` },
  { title: "Language", value: "English" },
];

export const CreativeMaterial = {
  render: () => (
    <CreativeMaterialComponent
      key={1}
      values={values}
      file={
        "https://go.best-brokers-partners.com/files/banners/1497427063z63NI.png"
      }
      alt={"CKcasino Logo"}
      url={"https://ckcasino.com/#/lobby"}
    />
  ),
};
