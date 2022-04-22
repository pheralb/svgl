import React from "react";
import useSWR from "swr";
import Grid from "components/grid";
import Library from "components/card/library";
import Loader from "animations/loader";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Libraries = () => {
  const { data, error } = useSWR("/api/icons", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />;
  return (
    <>
      <Grid>
        {data.map((link) => (
          <>
            <div key={link}>
              <Library
                image={link.image}
                title={link.title}
                url={link.url}
              />
            </div>
          </>
        ))}
      </Grid>
    </>
  );
};

export default Libraries;