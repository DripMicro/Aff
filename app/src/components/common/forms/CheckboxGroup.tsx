import type { CheckboxGroupProps } from "@chakra-ui/react";
import {
  Box,
  Checkbox,
  HStack,
  Stack,
  useRadio,
  CheckboxGroup as ChakraCheckboxGroup,
} from "@chakra-ui/react";
import React from "react";
import type { ChoiceType } from "@/utils/zod-meta";

interface Props extends CheckboxGroupProps {
  choices: ChoiceType[];
}

export const CheckboxGroup = ({ choices, ...props }: Props) => {
  console.log(`muly:CheckboxGroup`, { props, choices });
  return (
    <ChakraCheckboxGroup {...props}>
      <Stack spacing={1} direction="column">
        {choices.map((choice, idx) => {
          const { id, title } =
            typeof choice === "string" ? { id: choice, title: choice } : choice;

          return (
            <Checkbox key={id} value={String(id)}>
              {title}
            </Checkbox>
          );
        })}
      </Stack>
    </ChakraCheckboxGroup>
  );
};
