import { createContext } from "react";

type Action = () => void;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ModalFormActionContext = createContext<Action>(() => {});
