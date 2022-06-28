import type { NextPage } from "next";
import useSWR from "swr";
import { getAllSvgs } from "@/services";
import { SvgData } from "@/interfaces/svgData";
import SVGCard from "@/components/svgCard";
import Grid from "@/common/grid";
import Loading from "@/components/loading";
import Error from "@/components/error";

const Home: NextPage = () => {
  const { data, error } = useSWR(getAllSvgs);

  if (error)
    return (
      <Error title="Error" description="An unexpected error has occurred" />
    );
  if (!data) return <Loading text="Loading..." />;

  return (
    <Grid>
      {data.map((svg: SvgData) => (
        <SVGCard key={svg.id} id={svg.id} svg={svg.slug} title={svg.title} />
      ))}
    </Grid>
  );
};

export default Home;
