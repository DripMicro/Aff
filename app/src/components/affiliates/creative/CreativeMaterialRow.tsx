import {
  Button,
  Stack,
  Image,
  Text,
  Grid,
  HStack,
  Tr,
  Td,
  Box,
} from "@chakra-ui/react";

interface Props {
  values: { title: string; value?: string }[];
  file?: string;
  alt: string;
  url: string;
}

export const CreativeMaterialRow = ({ values, file, alt, url }: Props) => {
  return (
    <></>
    // <Tr p={4} gap={4}>
    //   {/* <Td>
    //     {!!file && (
    //       <Image
    //         objectFit="cover"
    //         maxW={{ base: "100%", sm: "173px" }}
    //         src={file}
    //         alt={alt}
    //       />
    //     )}
    //   </Td>

    //   <Td>
    //     <Grid templateColumns="max-content 1fr" gap={1} flexGrow={1}>
    //       {values
    //         .map(({ title, value }) => [
    //           <Text key={title}>{title}</Text>,
    //           <Text key={title + "_v"}>{value}</Text>,
    //         ])
    //         .flat()}
    //     </Grid>
    //   </Td>

    //   <Td>
    //     <Stack>
    //       <Text>{url}</Text>
    //       <HStack>
    //         <Button>Copy Click URL</Button>
    //         <Button>Get HTML Code</Button>
    //       </HStack>
    //     </Stack>
    //   </Td> */}
    // </Tr>
  );
};
