import React from "react";
import useSWR from "swr";
import { getCategorySvgs } from "@/services";
import CustomLink from "@/common/link";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { RaceBy } from "@uiball/loaders";
import Tap from "@/animations/tap";
import { useRouter } from "next/router";

const Categories = () => {
  const { data, error } = useSWR(getCategorySvgs);
  const color = useColorModeValue("rgb(0,0,0, .1)", "rgb(255,255,255, .1)");
  const router = useRouter();
  if (error) return <div>failed to load</div>;
  if (!data)
    return <RaceBy size={52} lineWeight={3} speed={1.4} color="#4343E5" />;
  return (
    <>
      {data.map((category: string) => (
      <Tap key={category}>
        <CustomLink 
          href={`/category/${category}`}>
          <Box
            p={4}
            borderRadius="4px"
            borderWidth="1px"
            __css={
              router.asPath === `/category/${category}`
                ? {
                    backgroundColor: '#4343e5',
                    color: '#fff'
                  }
                : {}
            }
            _hover={{
              border:`1px solid ${color}`,
              transform: "scale(0.98)",
            }}>
            {category}
          </Box>
        </CustomLink>
      </Tap>
      ))}
    </>
  );
};

export default Categories;
