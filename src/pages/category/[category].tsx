import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getSvgByCategory } from "@/services";
import Loading from "@/components/loading";
import Grid from "@/common/grid";
import SVGCard from "@/components/svgCard";
import { SvgData } from "@/interfaces/svgData";
import { Center, Heading } from "@chakra-ui/react";
import Show from "@/animations/show";

export default function Category() {
  const router = useRouter();
  const { data, error } = useSWR(
    () => router.query.category && `${getSvgByCategory}${router.query.category}`
  );

  if (error) router.push("/404");
  if (!data) return <Loading text="Loading..." />;

  return (
    <>
      <Head>
        <title>{router.query.category} logos - svgl</title>
      </Head>
      <Show>
        <Center>
          <Heading mb="5">{router.query.category}</Heading>
        </Center>
      </Show>

      <Grid>
        {data.map((svg: SvgData) => (
          <SVGCard key={svg.id} id={svg.id} svg={svg.slug} title={svg.title} />
        ))}
      </Grid>
    </>
  );
}
