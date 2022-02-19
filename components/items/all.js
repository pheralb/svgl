import React from "react";
import useSWR from "swr";
import Grid from "components/grid";
import Card from "components/card";
import Loader from "animations/loader";

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
            <Card
              key={link.id}
              title={link.title}
              url={`/svg/${link.id}`}
              href={link.href}
            />
          </>
        ))}
      </Grid>
    </>
  );
};

export default All;
