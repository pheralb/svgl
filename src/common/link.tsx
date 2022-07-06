import React from "react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { CustomLinkProps } from "@/interfaces/components";

const CustomLink = ({ href, children, external, font, mr, ml }: CustomLinkProps) => {
  return (
    <NextLink href={href} passHref>
      <Link
        isExternal={external}
        _hover={{ textDecoration: "none" }}
        _focus={{ border: "none" }}
        fontFamily={font}
        mr={mr}
        ml={ml}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;
