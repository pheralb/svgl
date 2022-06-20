import type { NextPage } from "next";
import { Center, Container, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import { getAllSvgs } from "@/services";
import { SvgData } from "@/interfaces/svgData";
import SVGCard from "@/components/svgCard";
import Grid from "@/common/grid";

const Home: NextPage = () => {
  const { data, error } = useSWR(getAllSvgs);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Container maxW="85%">
      <Grid>
        {data.map((svg: SvgData) => (
          <SVGCard
            key={svg.id}
            title={svg.title}
            url={svg.href}
            svg={svg.href}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
