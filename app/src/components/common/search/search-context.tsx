import React, { useRef, useState } from "react";

interface SearchContextInterface {
  values: Record<string, string>;
  controlValue: Record<string, string>;
  setControlValue: (key: string, value: string) => void;
  apply: () => void;
}

export const SearchContext = React.createContext<SearchContextInterface>({
  values: {},
  controlValue: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setControlValue: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  apply: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<SearchContextInterface["values"]>({});
  const valueRef = useRef<SearchContextInterface["values"]>({});

  const setControlValue = (key: string, value: string) => {
    valueRef.current[key] = value;
  };

  const apply = () => {
    setValues({ ...valueRef.current });
  };

  return (
    <SearchContext.Provider
      value={{ values, controlValue: valueRef.current, setControlValue, apply }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
