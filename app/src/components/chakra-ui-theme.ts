import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

export const theme = extendTheme({
  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Steps,
  },
});
