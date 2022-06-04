import React from "react";
import { LayoutProps } from "@/interfaces/components";
import { SimpleGrid } from "@chakra-ui/react";

const Grid = (props: LayoutProps) => {
  return (
    <SimpleGrid minChildWidth="200px" spacing="30px" >
      {props.children}
    </SimpleGrid>
  );
};

export default Grid;
