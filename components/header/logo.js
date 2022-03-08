import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconButton } from "@chakra-ui/react";
import Hover from "animations/tap";
import { svgl } from "components/svg";
import confetti from "canvas-confetti";

const Logo = () => {
  const router = useRouter();

  useEffect(() => {
    logoHeader.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      router.push("/design");
    });
  }, []);

  return (
    <Hover>
      <Link href="/" passHref>
        <IconButton
          as={svgl}
          id="logoHeader"
          cursor="pointer"
          name="logo"
          boxSize="40px"
          mr="2"
          borderRadius="full"
          bg="transparent"
        />
      </Link>
    </Hover>
  );
};

export default Logo;
