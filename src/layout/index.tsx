import React from "react";
import { LayoutProps } from "@/interfaces/components";
import { Container } from "@chakra-ui/react";
import Header from "./header";
import Footer from "./footer";

const Index = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container maxW="70%" mt="5">{children}</Container>
      <Footer />
    </>
  );
};

export default Index;
