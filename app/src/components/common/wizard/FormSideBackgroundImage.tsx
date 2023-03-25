import Image from "next/image";
import React from "react";

interface Props {
  image?: string;
}

export const FormSideBackgroundImage = ({ image }: Props) => {
  if (image) {
    return (
      <div>
        <Image width="240" height="186" src={image} alt=""></Image>
      </div>
      // <Box
      //   width="100%"
      //   m={10}
      //   position={["relative", "absolute"]}
      //   left={[0, -120]}
      //   bottom={[0, -20]}
      //   zIndex={-1}
      // >
      //   <Image width="240" height="186" src={image} alt=""></Image>
      // </Box>
    );
  }

  return null;
};
