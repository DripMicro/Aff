import React, { Children } from "react";
import type { GridProps } from "@chakra-ui/react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;

  grid?: GridProps;
}

export const FormLayout = ({ grid, children }: Props) => {
  const childrenSplitToCells: any[][] = [[]];
  if (grid) {
    Children.toArray(children).forEach((child: any) => {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        child.props?.children?.length === 3 &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        child.props?.children[0]?.type.name === "GridColumnHeader"
      ) {
        childrenSplitToCells.push([]);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      childrenSplitToCells[childrenSplitToCells.length - 1].push(child);
    });

    return (
      <Grid columnGap={16} rowGap={8} {...grid}>
        {childrenSplitToCells.map((items, idx) => (
          <GridItem key={idx} area={String.fromCharCode(97 + idx)}>
            {items}
          </GridItem>
        ))}
      </Grid>
    );
  }

  return <Box>{children}</Box>;
};
