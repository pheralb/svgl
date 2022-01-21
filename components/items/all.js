import React from "react";
import useSWR from "swr";
import Grid from "components/grid";
import Card from "components/card";
import Loader from "animations/loader";
import { Text } from "@chakra-ui/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const All = () => {
  const { data, error } = useSWR("/api/all", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />;
  return (
    <>
      <Grid>
        {data.map((link) => (
          <>
            <div key={link.id}>
              <Card
                title={link.title}
                url={`/icon/${link.id}`}
                href={link.href}
              />
            </div>
          </>
        ))}
      </Grid>
    </>
  );
};

export default All;
