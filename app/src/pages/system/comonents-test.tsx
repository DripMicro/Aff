// http://localhost:3001/system/comonents-test

import {
  Flex,
  Box,
  Button,
  SimpleGrid,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { DateRangeSelect } from "../../components/common/DateRangeSelect";
import { Select } from "@chakra-ui/react";
import { startOfMonth, startOfWeek, startOfYear, sub } from "date-fns";

import type { MyPage } from "../../components/common/types";
const ComponentTest: MyPage = () => {
  return (
    <VStack
      direction="column"
      width="100%"
      m="auto"
      maxW="xl"
      mt={12}
      alignItems="start"
      gap={8}
    >
      <Box>Component Test Page</Box>
      <DateRangeSelect />
    </VStack>
  );
};

export default ComponentTest;
ComponentTest.Layout = "NoLayout";
