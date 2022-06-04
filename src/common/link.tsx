import React from "react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { CustomLinkProps } from "@/interfaces/components";

const CustomLink = ({ href, children, external }: CustomLinkProps) => {
  return (
    <NextLink href={href} passHref>
      <Link isExternal={external} _hover={{ textDecoration: "none" }}>
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;
