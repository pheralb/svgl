import React from "react";
import { LayoutProps } from "@/interfaces/components";
import { Container } from "@chakra-ui/react";
import Header from "./header";
import Footer from "./footer";

const Index = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container maxW={{ base: "100%", md: "70%" }} mt={{ base: "1", md: "3" }}>{children}</Container>
      <Footer />
    </>
  );
};

export default Index;
