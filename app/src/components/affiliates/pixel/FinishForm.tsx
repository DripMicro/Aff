import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  onSubmit: () => Promise<void>;
  onPrevious: () => void;
}

export const FinishForm = ({
  count,
  setCount,
  onSubmit,
  onPrevious,
}: Props) => {
  const handlePreviousChange = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="h-96">
      <div className="mt-5 font-medium text-black md:mt-12 md:text-lg">
        Step 5: Finish Pixel
      </div>
      <Text fontSize="sm" mb={263}>
        The pixel will be idle until the Affiliate Manager will approve it.
      </Text>
      <Flex width="100%" justify="flex-start" marginTop="20">
        <Button
          minW={36}
          onClick={handlePreviousChange}
          mr={4}
          size="md"
          variant="ghost"
          width="48"
          height="10"
          bgColor="blue.100"
        >
          Prev
        </Button>
        <Button
          size="md"
          textColor="white"
          minW={36}
          variant="solid"
          width="48"
          height="10"
          bgColor="blue.600"
          onClick={() => void onSubmit()}
        >
          Finish
        </Button>
      </Flex>
    </div>
  );
};
