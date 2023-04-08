import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Select as CSelect,
} from "@chakra-ui/react";
import { useQueryState } from "next-usequerystate";
import { useDebounceCallback } from "@react-hook/debounce";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface Props {
  varName: string;
  label: string;
}

export const QueryText = ({ varName, label }: Props) => {
  const [value, setValue] = useQueryState(varName);
  const [localValue, setLocalValue] = useState(String(value || ""));

  const debounceCallback = useDebounceCallback(
    (v: string) => {
      console.log(`muly:debounceCallback ${v}`, { v });
      void setValue(v);
    },
    250,
    false
  );

  return (
    <FormControl>
      <FormLabel className="ml-2 text-sm font-medium text-[#525252]">
        {label}
      </FormLabel>
      <Input
        type="search"
        placeholder="search"
        value={localValue}
        onChange={(e) => {
          const v = e.target.value;
          setLocalValue(v);
          debounceCallback(v);
        }}
      />
    </FormControl>
  );
};
