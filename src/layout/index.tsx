import { LayoutProps } from "@/interfaces/components";
import React from "react";
import Header from "@/layout/header";
import { Box } from "@chakra-ui/react";

const Index = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Index;
