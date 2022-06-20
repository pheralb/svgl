import React from "react";
import { LayoutProps } from "@/interfaces/components";
import Sidebar from "@/layout/sidebar";

const Index = ({ children }: LayoutProps) => {
  return <Sidebar>{children}</Sidebar>;
};

export default Index;
