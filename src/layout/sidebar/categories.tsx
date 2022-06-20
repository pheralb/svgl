import React from "react";
import useSWR from "swr";
import { getCategorySvgs } from "@/services";
import CustomLink from "@/common/link";
import { Text } from "@chakra-ui/react";

const Categories = () => {
  const { data, error } = useSWR(getCategorySvgs);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {data.map((category: string) => (
        <CustomLink key={category} href={`/category/${category}`}>
          <Text mb="2">{category}</Text>
        </CustomLink>
      ))}
    </div>
  );
};

export default Categories;
