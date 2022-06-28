import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import Show from "@/animations/show";
import { getSvgById } from "@/services";
import Loading from "@/components/loading";
import SVGInfo from "@/components/svgInfo";

export default function Icon() {
  const router = useRouter();
  const { data, error } = useSWR(
    () => router.query.id && `${getSvgById}${router.query.id}`
  );

  if (error) router.push("/404");
  if (!data) return <Loading text="Loading..." />;

  return (
    <>
      <Head>
        <title>{data.title} - svgl</title>
      </Head>
      <Show>
        <SVGInfo {...data} />
      </Show>
    </>
  );
}
