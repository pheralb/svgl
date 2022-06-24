import React from "react";
import { LayoutProps } from "@/interfaces/components";
import { Container } from "@chakra-ui/react";
import Header from "./header";

const Index = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container maxW="70%" mt="5">{children}</Container>
    </>
  );
};

export default Index;
