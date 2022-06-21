import db from "data/svgs";
import type { NextApiRequest, NextApiResponse } from "next";
import { SvgData } from "@/interfaces/svgData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SvgData[]>
) {
  res.status(200).json(db);
}
