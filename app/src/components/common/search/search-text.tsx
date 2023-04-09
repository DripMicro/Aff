import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchContext } from "@/components/common/search/search-context";

interface Props {
  varName: string;
  label?: string;
}

export const SearchText = ({ varName, label }: Props) => {
  const { setControlValue, controlValue } = useSearchContext();
  const [value, setValue] = useState(controlValue[varName] || "");

  return (
    <Input
      id={varName}
      type="search"
      placeholder={label === undefined ? "Search..." : label}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setControlValue(varName, e.target.value);
      }}
    />
  );
};
