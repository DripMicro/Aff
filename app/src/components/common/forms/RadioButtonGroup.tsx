/* eslint-disable
      @typescript-eslint/no-unsafe-assignment
*/

import React from "react";
import type { ChoiceType } from "../../../utils/zod-meta";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

// const RadioCard = ({ children, ...props }: RCProps) => {
//   const { getInputProps, getCheckboxProps } = useRadio(props);
//
//   const input = getInputProps();
//   const checkbox = getCheckboxProps();
//
//   // console.log(`muly:RadioCard`, { input });
//
//   return (
//     <Box as="label">
//       <input {...input} />
//       <Box
//         {...checkbox}
//         cursor="pointer"
//         borderWidth="1px"
//         borderRadius="md"
//         boxShadow="md"
//         _checked={{
//           bg: "teal.600",
//           color: "white",
//           borderColor: "teal.600",
//         }}
//         _focus={{
//           boxShadow: "outline",
//         }}
//         px={5}
//         py={3}
//         minWidth={32}
//         minHeight={12}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

interface Props {
  name: string;
  value: string;
  onChange: (value: string) => void;
  choices: ChoiceType[];
}

export const RadioButtonGroup = ({ choices, value, name, onChange }: Props) => {
  return (
    <ToggleGroup.Root
      className="flex flex-row flex-wrap gap-2"
      type="single"
      value={value}
      onValueChange={onChange}
      id={name}
    >
      {choices.map((choice, idx) => {
        const { id, title, info } =
          typeof choice === "string"
            ? { id: choice, title: choice, info: undefined }
            : choice;

        const value = String(id);
        return (
          <ToggleGroup.Item
            // data-[state=open]:bg-slate-100
            className="radio-group-tbd flex min-w-max flex-1 flex-row items-center gap-2 p-1"
            // className="radio-group-off [&[data-state=on]>div]:radio-group-on"
            value={value}
            key={value}
          >
            {!!info && <img src={info} width={40} height={40} alt="" />}
            <div>{title}</div>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
};
