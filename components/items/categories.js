import React from "react";
import useSWR from "swr";
import Grid from "components/grid";
import Card from "components/card";
import SideItem from "components/sidebar/sideItem";
import Loader from "animations/loader";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const All = () => {
  const { data, error } = useSWR("/api/categories", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />;
  return (
    <>
      {data.map((category) => (
        <>
          <div key={category}>
            <Link href={`/category/${category}`} passHref>
              <SideItem
                cursor="pointer"
                _hover={{
                  bg: "blackAlpha.300",
                }}
              >
                {category}
              </SideItem>
            </Link>
          </div>
        </>
      ))}
    </>
  );
};

export default All;
